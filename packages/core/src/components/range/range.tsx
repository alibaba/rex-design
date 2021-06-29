import cx from 'classnames';
import _ from 'lodash-es';
import React, { useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import * as op from 'rxjs/operators';
import styled from 'styled-components';
import { composeHandlers, composeState } from '../../utils';
import { Tooltip } from '../overlays';
import { batchedUpdates } from '../overlays/overlay-utils/batchUpdate';
import { domUtils } from '../virtual-list/dom-utils';

export interface RangeProps {
  className?: string;
  style?: React.CSSProperties;

  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长，取值必须大于 0，并且可被 (max - min) 整除 */
  step?: number;

  /** 受控用法，当前值 */
  value?: number;
  /** 非受控用法，默认值 */
  defaultValue?: number;
  /** 受控用法，当前值改变的回调，注意只有当鼠标松开的时候该函数才会被调用 */
  onChange?: (value: number) => void;

  /** 是否禁用 */
  disabled?: boolean;

  /** 是否显示 tip */
  hasTip?: boolean;

  // todo marks
  //  marksPosition: 'above' | 'below'
  // todo onProcess
  // todo tipRender
  // todo reverse
  // tooltipVisible
  // handle?: 'single' | 'double'; // todo 添加 Range.Multi 组件
}

const RangeDiv = styled.div`
  height: 12px;
  position: relative;
  user-select: none;

  .rex-range-track {
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    background: var(--rex-colors-emphasis-10);
    height: 6px;
    // top = 50% 减去自身高度的一半 calc(50% - 3px);
    top: 3px;
    border-radius: 8px;
    overflow: hidden;
  }

  .rex-range-track-highlight {
    background: var(--rex-colors-primary-50);
    position: absolute;
    top: 0;
    bottom: 0;
    // left 和 right 会通过 style 进行设置
  }

  .rex-range-handle {
    position: absolute;
    // left=0 为默认值，组件渲染时会通过 style.left 覆盖该值
    left: 0;
    top: 50%;
  }

  .rex-range-handle-inner {
    position: absolute;
    cursor: pointer;
    background: var(--rex-colors-emphasis-0);
    border: 3px solid var(--rex-colors-primary-50);
    border-radius: 50%;

    height: 16px;
    width: 16px;
    transform: translate(-50%, -50%) scale(1);
    transition: 200ms transform;
  }

  &:not(.rex-disabled) {
    .rex-range-handle-inner:hover {
      transform: translate(-50%, -50%) scale(1.2);
    }
    .rex-range-handle-moving .rex-range-handle-inner {
      border-width: 2px;
    }
  }

  &.rex-disabled {
    .rex-range-track,
    .rex-range-handle-inner {
      cursor: not-allowed;
    }

    .rex-range-track-highlight {
      background: var(--rex-colors-emphasis-30);
    }

    .rex-range-handle-inner {
      border-color: var(--rex-colors-emphasis-40);
    }
  }
`;

export function Range({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
  value: valueProp,
  onChange: onChangeProp,
  style,
  className,
  disabled,
  hasTip = true,
}: RangeProps) {
  const [_value, _onChange] = useState(defaultValue);
  const value = composeState(valueProp, _value);
  const onChange = composeHandlers(onChangeProp, _onChange);

  const [dragState, setDragState] = useState({ moving: false, tempValue: value });
  const [visible, setVisible] = useState(false);

  const tempValueRef = useRef(dragState.tempValue);

  const trackRef = useRef<HTMLDivElement>(null);

  const startDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    const trackDiv = trackRef.current;

    const getRatio = (x: number) => {
      const rect = domUtils.getRelativeLayoutRect(window, trackDiv);
      const ration = (x - rect.left) / (rect.right - rect.left);
      return _.clamp(ration, 0, 1);
    };

    fromEvent<MouseEvent>(window, 'mousemove')
      .pipe(
        op.takeUntil(fromEvent(window, 'mouseup')),
        op.map((move) => ({ type: 'move', x: move.clientX })),
        op.startWith({ type: 'start', x: event.clientX }),
        op.endWith({ type: 'end', x: -1 }),
      )
      .subscribe((action) => {
        batchedUpdates(() => {
          if (action.type === 'move' || action.type === 'start') {
            const nextValue = getRatio(action.x) * (max - min) + min;
            const tempValue = Math.round((nextValue - min) / step) * step + min;
            setDragState((prev) => {
              if (prev.tempValue == tempValue) {
                return prev;
              }
              return { moving: true, tempValue: tempValue };
            });
            tempValueRef.current = tempValue;
          } else {
            setDragState({ moving: false, tempValue: -1 });
            onChange(tempValueRef.current);
          }
        });
      });
  };

  const movingValue = dragState.moving ? dragState.tempValue : value;
  const ratio = (movingValue - min) / (max - min);

  return (
    <RangeDiv className={cx('rex-range', { 'rex-disabled': disabled }, className)} style={style}>
      <div className="rex-range-track" ref={trackRef} onMouseDown={disabled ? null : startDrag}>
        <div className="rex-range-track-highlight" style={{ left: 0, right: `${(1 - ratio) * 100}%` }} />
      </div>

      <div
        className={cx('rex-range-handle', {
          'rex-range-handle-moving': dragState.moving,
        })}
        style={{ left: `${ratio * 100}%` }}
      >
        <Tooltip
          visible={hasTip && (dragState.moving || visible)}
          onRequestOpen={() => setVisible(true)}
          onRequestClose={() => setVisible(false)}
          title={<div style={{ minWidth: 16, textAlign: 'center' }}>{movingValue}</div>}
          usePortal={false}
          attachOverlayManager={false}
          renderTarget={(arg) => (
            <div
              className="rex-range-handle-inner"
              // todo tabIndex={0} 键盘操作
              onMouseDown={disabled ? null : startDrag}
              {...arg}
            />
          )}
        />
      </div>
    </RangeDiv>
  );
}
