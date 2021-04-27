import React, { useRef } from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { useTabs, UseTabsProps } from './use-tabs';
import { TabPane } from './tab';
import { TabsProvider } from './context';

const TabsBar = styled(Box)`
  position: relative;
  overflow-x: auto;

  /* Hide Scrollbar  */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabsList = styled(Box)<any>`
  position: relative;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TabsDivider = styled(Box)`
  position: relative;
  bottom: 1px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--rex-colors-line-divider);
`;

const TabsActiveBar = styled(Box)`
  height: 2px;
  width: var(--rex-tabs-scrollbar-width);
  background-color: var(--rex-colors-brand-normal);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: var(--rex-tabs-scrollbar-offset);
`;

export interface TabsProps extends UseTabsProps {}

export function Tabs(props: TabsProps) {
  const { direction } = props;
  if (direction === 'column') {
    return <ColumnTabs {...props} />;
  }
  return <RowsTabs {...props} />;
}

// TODO: 增加滚动按钮
// TODO: 增加键盘导航支持
function RowsTabs(props: TabsProps) {
  const { children } = props;
  const tabsRef = useRef();
  const { tabPropsList, dividerProps, rootProps, context } = useTabs(props, tabsRef);

  return (
    <TabsProvider value={context}>
      <Box {...rootProps}>
        <TabsBar ref={tabsRef} className="rex-tabs-bar">
          <TabsList as="ul">
            {tabPropsList.map((tab) => (
              <TabPane key={tab.value} {...tab} />
            ))}
          </TabsList>
          <TabsActiveBar {...dividerProps} />
        </TabsBar>
        <TabsDivider />
        <Box>{children}</Box>
      </Box>
    </TabsProvider>
  );
}

const ColumnTabsBox = styled.div`
  position: relative;
  display: flex;
  overflow-y: auto;
`;

const ColumnTabsList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ColumnTabsDivider = styled(Box)`
  position: relative;
  left: -1px;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--rex-colors-line-divider);
`;

const ColumnTabsActiveBar = styled(Box)`
  width: 2px;
  height: var(--rex-tabs-scrollbar-width);
  background-color: var(--rex-colors-brand-normal);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  position: absolute;
  z-index: 1;
  right: 0;
  top: var(--rex-tabs-scrollbar-offset);
`;

function ColumnTabs(props: TabsProps) {
  const { children } = props;
  const tabsRef = useRef();
  const { tabPropsList, dividerProps, rootProps, context } = useTabs(props, tabsRef);
  return (
    <TabsProvider value={context}>
      <ColumnTabsBox {...rootProps}>
        <Box ref={tabsRef} position="relative" className="rex-tabs-bar">
          <ColumnTabsList as="ul">
            {tabPropsList.map((tab) => (
              <TabPane key={tab.value} {...tab} />
            ))}
          </ColumnTabsList>
          <ColumnTabsActiveBar {...dividerProps} />
        </Box>
        <ColumnTabsDivider />
        <Box flex="1">{children}</Box>
      </ColumnTabsBox>
    </TabsProvider>
  );
}
