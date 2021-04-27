import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@rexd/icon';
import { FieldSet, FormLayout } from '.';
import { Box, Flex, FlexItem, Group } from '../layout';
import { Button } from '../button';
import { useConfig, useDevice } from '../../providers';

const CollapseButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  border: 0;
  padding: 0 var(--rex-space-l);
  border-radius: var(--rex-radii-s);
  background-color: var(--rex-colors-primary-10);
  color: var(--rex-colors-primary-50);
  font-size: 10px;
`;

const FieldsMain = styled(FieldSet)`
  padding: 0;

  .rex-input,
  .rex-date-picker,
  .rex-date-range-picker,
  .rex-time-picker {
    width: 100%;
  }
`;

export interface SearchFormLayoutProps {
  /**
   * 显示的列数
   */
  columns?: number;
  /**
   * 默认展示的表单项个数
   */
  displayCount?: number;
  /**
   * 是否可折叠
   */
  isCollapsible?: boolean;
  /**
   * 点击折叠按钮时的回调
   */
  onCollapse?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * 自定义底部操作栏
   */
  renderFooterMain?: (props: SearchFormLayoutProps) => React.ReactNode;
  onReset?: () => void;
  onSubmit?: () => void;
  renderCollapsed?: () => React.ReactNode;
  children?: React.ReactNode;
}

const defaultRenderFooterMain = ({ onSubmit, onReset }: SearchFormLayoutProps) => {
  return (
    <Group>
      <Button onClick={onReset}>重置</Button>
      <Button type="primary" onClick={onSubmit}>
        查询
      </Button>
    </Group>
  );
};

export function SearchFormLayout(props: SearchFormLayoutProps) {
  const {
    columns,
    displayCount,
    isCollapsible,
    renderFooterMain = defaultRenderFooterMain,
    onReset,
    onSubmit,
    renderCollapsed,
    children,
    ...rest
  } = useConfig<SearchFormLayoutProps>('SearchForm', props);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box borderRadius="s" bg="emphasis.0" position="relative" pb="m" {...rest}>
      {collapsed ? (
        <SearchFormCollapsed renderCollapsed={renderCollapsed} />
      ) : (
        <SearchFormMain
          columns={columns}
          displayCount={displayCount}
          renderFooterMain={renderFooterMain}
          onReset={onReset}
          onSubmit={onSubmit}
          children={children}
        />
      )}
      {isCollapsible && (
        <CollapseButton onClick={() => setCollapsed(!collapsed)}>
          <Icon type={collapsed ? 'arrow-down-filling' : 'arrow-up-filling'} />
        </CollapseButton>
      )}
    </Box>
  );
}

function SearchFormMain(props: SearchFormLayoutProps) {
  const { displayCount, columns, children, renderFooterMain = defaultRenderFooterMain } = props;
  const { device } = useDevice();
  const shouldExpandRef = useRef(false);
  const [visible, setVisible] = useState(false);
  let displayChildren = children;
  if (displayCount && !visible) {
    const total = React.Children.count(children);
    if (total > displayCount) {
      displayChildren = React.Children.toArray(children).slice(0, displayCount);
      shouldExpandRef.current = true;
    }
  }

  const isSmallScreen = device.alias === 's';
  const expandButton = shouldExpandRef.current ? (
    <Button
      shape="link"
      type="primary"
      leftElement={<Icon type={visible ? 'arrow-up-bold' : 'arrow-down-bold'} />}
      onClick={() => setVisible(!visible)}
    >
      {visible ? '收起查询条件' : '展开更多条件'}
    </Button>
  ) : null;

  return (
    <FormLayout columns={columns}>
      <FieldsMain>{displayChildren}</FieldsMain>
      {isSmallScreen && <Box textAlign="center">{expandButton}</Box>}
      <Flex justify="center">
        <FlexItem flex="1"></FlexItem>
        {renderFooterMain(props)}
        <FlexItem flex="1" textAlign="right">
          {!isSmallScreen && expandButton}
        </FlexItem>
      </Flex>
    </FormLayout>
  );
}

const defaultRenderCollapsed = () => null as React.ReactElement;

function SearchFormCollapsed(props: SearchFormLayoutProps) {
  const { renderCollapsed = defaultRenderCollapsed } = props;
  return <Box p="m">{renderCollapsed()}</Box>;
}
