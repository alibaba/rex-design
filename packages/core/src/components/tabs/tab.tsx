import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { StringOrNumber } from '../../types';
import { Box } from '../layout';
import { useTabsContext } from './context';

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
  const { title, selected, disabled, flex, ...rest } = props;

  const clazz = cx({
    'rex-tab': true,
    'rex-active': selected,
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
  selected?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  children?: any;
}

export function Tab(props: TabProps) {
  const { value, selected: selectedProp, children } = props;
  const tabs = useTabsContext();

  let selected = selectedProp;
  if (tabs && tabs.value) {
    selected = tabs.value === value;
  }

  if (!selected) {
    return null;
  }

  return <Box as="section">{children}</Box>;
}
