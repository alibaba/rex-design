import React, { useMemo } from 'react';
import cx from 'classnames';
import styled from 'styled-components';
import { ActionSheet } from '../action-sheet';
import { ActionItem, ActionItemProps } from './action-item';

const Divider = styled.span`
  display: inline-block;
  width: 1px;
  height: 12px;
  background-color: var(--rex-colors-line-divider);
`;

interface ActionListItemProps extends ActionItemProps {
  key?: string;
  render?: any;
  children?: ActionListItemProps[];
  props?: any;
}

export interface UseActionListProps {
  /**
   * 行动点列表
   */
  actions?: ActionListItemProps[];
  /**
   * 用户选择行动点时的回调
   */
  onSelect?: (key: string, detail?: any) => void;
  /**
   * 是否有分割线
   */
  hasSeparator?: boolean;
  className?: string;
}

export function useActionList(props: UseActionListProps) {
  const { actions = [], onSelect, hasSeparator: hasSeparatorProp = true, className, ...htmlProps } = props;
  const actionNodes = useMemo(() => {
    const lastIndex = actions.length - 1;
    return actions.map((item, index) => {
      const { key, render: Render, children, props: itemProps, ...rest } = item;
      const hasSeparator = hasSeparatorProp && index !== lastIndex;
      const handleSelect = () => {
        if (typeof onSelect === 'function') {
          onSelect(key, { item });
        }
      };

      const pass = {
        ...rest,
        ...itemProps,
      };

      let node;
      if (Render) {
        node = <Render key={key} onClick={handleSelect} />;
      } else if (children) {
        node = (
          <ActionSheet
            key={key}
            target={<ActionItem {...pass} />}
            dataSource={children as any}
            onItemClick={onSelect}
          />
        );
      } else {
        node = <ActionItem key={key} onSelect={handleSelect} {...pass} />;
      }

      return (
        <React.Fragment key={key}>
          {node}
          {hasSeparator && <Divider />}
        </React.Fragment>
      );
    });
  }, [actions, hasSeparatorProp, onSelect]);

  const getRootProps = () => {
    return {
      className: cx('rex-action-list', className),
      ...htmlProps,
    };
  };

  return {
    actionNodes,
    getRootProps,
  };
}
