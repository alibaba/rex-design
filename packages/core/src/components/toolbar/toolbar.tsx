import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { noop } from '../../utils';
import { ActionList } from '../action-list';
import { ActionListItem } from '../action-list/use-action-list';
import { mergeConfig } from './util';

const ToolbarDiv = styled.div`
  display: flex;
  align-items: center;

  .rex-toolbar-tip-node {
    margin-left: 6px;
  }

  .rex-toolbar-search-node:not(:first-child) {
    margin-left: 40px;
  }

  .rex-toolbar-second-actions {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
`;

export interface ToolbarProps {
  /** 主操作列表（左侧） */
  leftActions?: ActionListItem[];

  // /** 主操作按钮类型 */
  // leftActionShape: T.string,
  //
  // /** 主按钮默认类型 */
  // leftActionType: T.string,

  /** 次操作列表（左侧） */
  rightActions?: ActionListItem[];

  // todo rightActionShape: T.string,
  // todo rightActionType: T.string,

  /**
   * 点击按钮时的回调
   * @param {string} key 按钮对应的 key
   */
  onActionClick?(key: string): void;

  /**
   * 右侧节点（如果 rightNode 存在，则忽略 rightActions）
   */
  rightNode?: React.ReactNode;
  /**
   * 提示节点
   */
  tipNode?: React.ReactNode;

  /**
   * 搜索节点
   */
  searchNode?: React.ReactNode;

  className?: string;
  style?: React.CSSProperties;

  // todo sticky / stickyTop;
}

export class Toolbar extends React.PureComponent<ToolbarProps> {
  static defaultProps = {
    leftActions: [] as ActionListItem[],
    // leftActionShape: 'button',
    // leftActionType: 'normal',
    rightActions: [] as ActionListItem[],
    // rightActionShape: 'link',
    // rightActionType: 'primary',
    onActionClick: noop,
    // stickyTop: 0,
  };

  normalizeActions(actions: ActionListItem[]) {
    return actions.map((item) => mergeConfig(item));
  }

  render() {
    const {
      searchNode,
      tipNode,
      leftActions,
      // leftActionShape,
      // leftActionType,
      rightActions,
      // rightActionShape,
      // rightActionType,
      onActionClick,
      rightNode: rightNodeProp,
      // sticky,
      // stickyTop,
      className,
      style,
    } = this.props;

    let leftNode = null;
    if (leftActions.length) {
      leftNode = (
        <ActionList
          className="rex-toolbar-main-actions"
          actions={this.normalizeActions(leftActions)}
          // actionShape={leftActionShape}
          // actionType={leftActionType}
          onSelect={onActionClick}
        />
      );
    }

    let rightNode = null;
    if (rightNodeProp) {
      rightNode = <div className="rex-toolbar-second-actions">{rightNodeProp}</div>;
    } else if (rightActions.length > 0) {
      rightNode = (
        <ActionList
          className="rex-toolbar-second-actions"
          actions={this.normalizeActions(rightActions)}
          // actionShape={rightActionShape}
          // actionType={rightActionType}
          onSelect={onActionClick}
        />
      );
    }

    return (
      <ToolbarDiv className={cx('rex-toolbar', className)} style={style}>
        {leftNode}
        {tipNode && <div className="rex-toolbar-tip-node">{tipNode}</div>}
        {searchNode && <div className="rex-toolbar-search-node">{searchNode}</div>}
        {rightNode}
      </ToolbarDiv>
    );
  }
}
