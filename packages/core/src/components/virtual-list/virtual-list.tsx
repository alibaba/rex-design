import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import { Subscription } from 'rxjs';
import * as op from 'rxjs/operators';
import styled from 'styled-components';
import { mergeRefs } from '../../utils';
import { domUtils } from './dom-utils';
import { getFullRenderRange, makeRowHeightManager, OVERSCAN_SIZE, sum } from './makeRowHeightManager';

const ROW_INDEX = 'data-rex-virtual-list-row-index';

const VirtualListDiv = styled.div`
  position: relative;
`;

export interface VirtualListProps<Row> {
  rows: Row[];
  renderRow(row: Row, rowIndex: number, listRowDataset: any): React.ReactElement;
  estimatedRowHeight: number;
  virtualThreshold?: number;

  style?: React.CSSProperties;
  className?: string;
  containerRef?: React.ForwardedRef<HTMLDivElement>;
}

interface VirtualListState {
  offset: number;
  maxRenderHeight: number;
}

export enum VirtualListAlign {
  start = 'start',
  center = 'center',
  end = 'end',
}

/**
 * 虚拟滚动列表组件
 */
export class VirtualList<Row> extends React.Component<VirtualListProps<Row>, VirtualListState> {
  static defaultProps = {
    virtualThreshold: 200,
  };

  readonly manager = makeRowHeightManager(this.props.rows.length, this.props.estimatedRowHeight);
  readonly containerRef = React.createRef<HTMLDivElement>();
  readonly composedContainerRef = mergeRefs(this.props.containerRef, this.containerRef);

  get container() {
    return this.containerRef.current;
  }

  // 使得列表滚动到指定的元素下标
  public scrollToRow(rowIndex: number, align = VirtualListAlign.center) {
    // console.log(`VirtualList#scrollToRow(rowIndex=${rowIndex}, align=${align})`);

    rowIndex = _.clamp(rowIndex, 0, this.manager.cache.length - 1);
    const rowHeight = this.manager.cache[rowIndex];

    // todo 这里应该可以和 底下的 getVisiblePartStream 复用部分代码
    const scrollParent = domUtils.getScrollParent(this.container);
    const commonOffsetAncestor = domUtils.findCommonOffsetAncestor(this.container, scrollParent);
    const targetRect = domUtils.getRelativeLayoutRect(commonOffsetAncestor, this.container);
    const scrollParentRect = domUtils.getRelativeLayoutRect(commonOffsetAncestor, scrollParent);
    const currentOffset = scrollParentRect.top - targetRect.top;
    const desiredOffset = sum(this.manager.cache.slice(0, rowIndex));

    const clipTop = Math.max(targetRect.top, scrollParentRect.top);
    const clipBottom = Math.min(targetRect.bottom, scrollParentRect.bottom);
    const maxRenderHeight = clipBottom - clipTop;

    let delta = desiredOffset - currentOffset;

    if (align === VirtualListAlign.center) {
      delta -= (maxRenderHeight - rowHeight) / 2;
    } else if (align === VirtualListAlign.end) {
      delta -= maxRenderHeight - rowHeight;
    }

    domUtils.applyScrollDelta(scrollParent, delta);
  }

  private subscription: Subscription;

  state = {
    offset: 0,
    maxRenderHeight: 400,
  };

  private trySubscribeRichVisibleRects() {
    if (this.subscription != null) {
      // 已经订阅过了的话，就不再二次订阅了
      return;
    }

    const { rows, virtualThreshold } = this.props;
    const rowCount = rows.length;

    if (rowCount < virtualThreshold) {
      return;
    }

    const richVisibleRects$ = domUtils.getRichVisibleRectsStream(this.container);

    this.subscription = richVisibleRects$
      .pipe(
        op.map(({ clipRect, offsetY: offset }) => ({
          maxRenderHeight: clipRect.bottom - clipRect.top,
          offset,
        })),
        op.distinctUntilChanged((prev, next) => {
          // 因为 overscan 的存在，滚动较小的距离时不需要触发组件重渲染
          return (
            Math.abs(prev.maxRenderHeight - next.maxRenderHeight) < OVERSCAN_SIZE / 2 &&
            Math.abs(prev.offset - next.offset) < OVERSCAN_SIZE / 2
          );
        }),
      )
      .subscribe((nextPartialState) => {
        this.setState(nextPartialState);
      });
  }

  componentDidMount() {
    this.trySubscribeRichVisibleRects();
  }

  componentDidUpdate() {
    // todo 异步地读取每一行的高度并且延迟更新?

    this.trySubscribeRichVisibleRects();

    if (!this.subscription) {
      return;
    }

    const container = this.containerRef.current;
    const manager = this.manager;

    let zeroHeightRowCount = 0;
    let maxRowIndex = -1;
    let maxRowBottom = -1;

    const rows = container.querySelectorAll<HTMLDivElement>(`:scope > *[${ROW_INDEX}]`);
    for (const row of rows) {
      const rowIndex = Number(row.dataset.rexVirtualListRowIndex);
      if (isNaN(rowIndex)) {
        continue;
      }

      maxRowIndex = Math.max(maxRowIndex, rowIndex);
      const offset = row.offsetTop;
      const size = row.offsetHeight;
      if (size === 0) {
        zeroHeightRowCount += 1;
      }

      maxRowBottom = Math.max(maxRowBottom, offset + size);
      manager.updateRow(rowIndex, offset, size);
    }

    // 当 estimatedRowHeight 过大时，可能出现「渲染行数过少，无法覆盖可视范围」的情况
    // 出现这种情况时，我们判断「下一次渲染能够渲染更多行」是否满足，满足的话就直接调用 forceUpdate
    // zeroHeightRowCount === 0 用于确保当前没有 display=none 的情况
    if (maxRowIndex !== -1 && zeroHeightRowCount === 0) {
      const { offset, maxRenderHeight } = this.state;
      if (maxRowBottom < offset + maxRenderHeight) {
        const nextVerticalRenderRange = this.manager.getRenderRange(offset, maxRenderHeight, this.props.rows.length);
        if (nextVerticalRenderRange.bottomIndex - 1 > maxRowIndex) {
          this.forceUpdate();
        }
      }
    }
  }

  componentWillUnmount() {
    this.subscription?.unsubscribe();
  }

  render() {
    const { rows, renderRow, style, className, virtualThreshold } = this.props;
    const { offset, maxRenderHeight } = this.state;

    const rowCount = rows.length;

    const range =
      rowCount >= virtualThreshold
        ? this.manager.getRenderRange(offset, maxRenderHeight, rowCount)
        : getFullRenderRange(rowCount);

    const visibleRows = rows.slice(range.topIndex, range.bottomIndex);

    if (process.env.NODE_ENV !== 'production') {
      if (style?.height != null || style?.maxHeight != null || style?.overflow != null) {
        console.log(
          '[rexd] 不要为 <VirtualList /> 设置 style.height/style.maxHeight/style.overflow，请在上层元素中设置这些样式',
        );
      }
    }

    return (
      <VirtualListDiv ref={this.composedContainerRef} style={style} className={cx('rex-virtual-list', className)}>
        {range.topBlank > 0 && <div style={{ height: range.topBlank }} data-rex-virtual-top-blank="true" />}
        {visibleRows.map((row, visibleRowIndex) => {
          const rowIndex = visibleRowIndex + range.topIndex;
          const listRowDataset = { [ROW_INDEX]: String(rowIndex) };
          return renderRow(row, rowIndex, listRowDataset);
        })}
        {range.bottomBlank > 0 && <div style={{ height: range.bottomBlank }} data-rex-virtual-bottom-blank="true" />}
      </VirtualListDiv>
    );
  }
}
