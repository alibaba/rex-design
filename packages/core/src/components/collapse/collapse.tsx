import styled from 'styled-components';
import { Box } from '../layout';
import cx from 'classnames';
import React from 'react';
import { Icon } from '@rexd/icon';
import { useCollapseGroupContext } from './context';
import { noop } from '../../utils';
import { useCollapse } from './use-collapse';

export interface CollapseOptions {
  /** 标题 */
  title?: React.ReactNode;
  /** 渲染内容, 可展开和收起 */
  content?: React.ReactNode;
  /** 是否禁用(无法切换展开和收起) */
  disabled?: boolean;
  /** 用于对应 Group 的 expandedKeys */
  collapseKey?: string;
}

const RexCollapse = styled(Box)`
  > .rex-collapse-trigger {
    display: flex;
    align-items: center;
    position: relative;
    font-size: var(--rex-fontSizes-subtitle);
    padding: var(--rex-sizes-s2) 0 var(--rex-sizes-s2) var(--rex-sizes-s3);
    transition: background 0.1s linear;
    cursor: pointer;

    > .rex-collapse-trigger-icon {
      transition: transform 0.2s;
      margin-right: var(--rex-space-m);
    }

    &:hover {
      background-color: var(--rex-colors-emphasis-20);
    }

    &.rex-disabled {
      cursor: not-allowed;
      color: var(--rex-colors-text-disabled);
      background-color: var(--rex-colors-fill-disabled);
    }
  }

  &.rex-expanded {
    > .rex-collapse-trigger {
      .rex-collapse-trigger-icon {
        transform: rotate(90deg);
      }
    }
  }

  &:not(:last-child) {
    border-bottom: var(--rex-borders-solid) var(--rex-colors-line-border);
  }
`;

export interface CollapseProps extends CollapseOptions {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function Collapse({
  title,
  content,
  disabled = false,
  children,
  collapseKey,
  style,
  className,
  ...rest
}: CollapseProps) {
  const group = useCollapseGroupContext();
  const shouldExpanded = !!group?.value?.includes(collapseKey);
  const onExpand = disabled ? noop : () => group?.onSelect(collapseKey, !shouldExpanded);

  const { getToggleProps, getCollapseProps } = useCollapse({
    isExpanded: shouldExpanded,
  });

  return (
    <RexCollapse
      className={cx(
        'rex-collapse',
        {
          'rex-expanded': shouldExpanded,
        },
        className,
      )}
      {...rest}
    >
      <Box
        {...getToggleProps({
          className: cx('rex-collapse-trigger', {
            'rex-disabled': disabled,
          }),
          onClick: () => onExpand(),
        })}
      >
        <Icon className="rex-collapse-trigger-icon" type="arrow-right" />
        <Box>{title}</Box>
      </Box>
      <Box
        {...getCollapseProps({
          className: 'rex-collapse-body',
        })}
      >
        <Box px="sizes.s4" py="sizes.s3">
          {children}
        </Box>
      </Box>
    </RexCollapse>
  );
}
