import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Box } from '../layout';
import { useTabsContext } from './context';
import { StringOrNumber } from '../../types';

const TabPaneBox = styled<any>(Box)`
  flex: ${(props) => props.$flex};
  position: relative;
  user-select: none;
  cursor: pointer;
  text-align: center;
  padding: var(--rex-space-l) var(--rex-space-xl);
  font-size: var(--rex-fontSizes-body);
  color: var(--rex-colors-text-body);

  &:hover {
    background-color: var(--rex-colors-emphasis-10);
  }

  &.rex-active {
    color: var(--rex-colors-brand-normal);
    font-weight: bold;
  }

  &.rex-disabled {
    color: var(--rex-colors-text-disabled);
    pointer-events: none;
  }
`;

export interface TabPaneProps extends TabProps {
  flex?: StringOrNumber;
}

export const TabPane = React.forwardRef<HTMLLIElement, TabPaneProps>((props, ref) => {
  const { title, isSelected, disabled, flex, ...rest } = props;

  const clazz = cx({
    'rex-tab': true,
    'rex-active': isSelected,
    'rex-disabled': disabled,
  });

  return (
    <TabPaneBox as="li" ref={ref} className={clazz} $flex={flex} {...rest}>
      {title}
    </TabPaneBox>
  );
});

export interface TabProps {
  /**
   * 唯一标识符
   */
  value?: string;
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 是否选中
   */
  isSelected?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  children?: any;
}

export function Tab(props: TabProps) {
  const { value, isSelected: isSelectedProp, children } = props;
  const tabs = useTabsContext();

  let isSelected = isSelectedProp;
  if (tabs && tabs.value) {
    isSelected = tabs.value === value;
  }

  if (!isSelected) {
    return null;
  }

  return <Box as="section">{children}</Box>;
}
