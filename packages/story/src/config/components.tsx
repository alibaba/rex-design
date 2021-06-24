import { Box, Button, ButtonProps, Group, GroupProps, Input, NumberInput, Popup, Text, Textarea } from '@rexd/core';
import { useSelectableList, UseSelectableListProps } from '@rexd/core/src/hooks';
import { ListNode, StringOrNumber } from '@rexd/core/src/types';
import { createContext } from '@rexd/core/src/utils/react-helpers';
import cx from 'classnames';
import React, { useState } from 'react';
import { BlockPicker } from 'react-color';
import styled from 'styled-components';
import { useStore } from './store-context';

export interface HeaderProps {
  title: string;
  filename?: string;
  jsonData?: string;
  onSave?: () => void;
  onReset?: () => void;
}

export function Header(props: HeaderProps) {
  const { title, onSave, onReset, filename, jsonData = '' } = props;

  const blob = new Blob([jsonData], { type: 'text/plain' });

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb="l"
      p="m"
      bg="fill.layer2"
      borderLeft="4px solid"
      borderLeftColor="brand.normal"
      color="text.body"
    >
      <Text>{title}</Text>
      <Group>
        <Button type="primary" onClick={onSave}>
          保存
        </Button>
        {/* @ts-ignore */}
        <Button as="a" target="blank" href={window.URL.createObjectURL(blob)} download={filename}>
          导出
        </Button>
        <Button onClick={onReset}>重置</Button>
      </Group>
    </Box>
  );
}

export function SectionHeader(props: { title?: string }) {
  const { title } = props;
  return (
    <Box my="l" p="m" bg="fill.layer2" borderLeft="4px solid" borderLeftColor="brand.normal" color="text.body">
      {title}
    </Box>
  );
}

interface ConfigBoxProps {
  value?: StringOrNumber;
  label?: string;
  tokenPath?: string;
  component?: 'textarea' | 'numberInput' | 'input';
  parseValue?: (value: any) => any;
  getValue?: (value: any) => any;
  renderContent?: (props: any) => any;
  renderLabel?: (props: any) => any;
  style?: React.CSSProperties;
}

const defaultGetValue = (val: any) => val;
const defaultParseValue = (val: any) => val;

export function ConfigBox(props: ConfigBoxProps) {
  const {
    tokenPath,
    value,
    parseValue = defaultParseValue,
    getValue = defaultGetValue,
    renderContent,
    renderLabel = (props: ConfigBoxProps) => (
      <Text as="code" fontSize="title1">
        {props.tokenPath}
      </Text>
    ),
    component = 'numberInput',
    ...others
  } = props;
  const [val, setVal] = useState(() => parseValue(value));
  const ctx = useStore();

  const handleChange = (val: any) => {
    setVal(val);
    if (ctx && tokenPath) {
      ctx.update(tokenPath, getValue(val));
    }
  };

  const renderProps = {
    value: val,
    tokenPath,
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      mb="m"
      color="text.body"
      borderBottom="solid"
      borderBottomColor="line.border"
      {...others}
    >
      <Box flexBasis="280px">{renderLabel(renderProps)}</Box>
      <Box px="m" py="s">
        {component === 'numberInput' && <NumberInput value={val} onChange={handleChange} />}
        {component === 'textarea' && <Textarea rows={4} value={val} onChange={handleChange} style={{ width: 260 }} />}
        {component === 'input' && <Input value={val} onChange={handleChange} />}
      </Box>
      <Box p="m">{typeof renderContent === 'function' && renderContent(renderProps)}</Box>
    </Box>
  );
}

export function ColorPicker(props: any) {
  const { value, onChange } = props;

  const handleChange = (color: any) => {
    if (typeof onChange === 'function') {
      onChange(color.hex);
    }
  };

  return (
    <Popup
      interactionKind="click"
      offset={[0, 18]}
      renderTarget={(pass) => (
        <Box {...pass} border="solid" borderColor="line.border" color="text.body">
          {value}
        </Box>
      )}
    >
      <BlockPicker color={value} onChangeComplete={handleChange} />
    </Popup>
  );
}

const MenuBox = styled(Box)`
  margin: 0;
  padding: 0;
  box-shadow: var(--rex-shadows-medianDown);
  border-radius: var(--rex-radii-m);
  list-style: none;
  background: #fff;
  min-width: 120px;
  max-height: 240px;
  overflow-y: scroll;
`;

const MenuItem = styled(Box)`
  display: flex;
  align-items: center;
  line-height: 1.5;
  padding: var(--rex-space-m);
  font-size: var(--rex-fontSizes-body);
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #ddd;
  }

  &.active {
    font-weight: bold;
    color: var(--rex-colors-brand-active);
  }
`;

export function TokenPicker(props: any) {
  const { value, dataSource = [], onChange } = props;

  const renderTarget = (pass: any) => (
    <Box {...pass} border="solid" borderColor="line.border" color="text.body">
      {value}
    </Box>
  );

  const handleSelect = (val: string, data: any) => {
    if (val !== value && typeof onChange === 'function') {
      // 注意，这里使用 label 作为 value
      onChange(data.label, data);
    }
  };

  return (
    <Popup interactionKind="click" renderTarget={renderTarget}>
      <MenuBox as="ul">
        {dataSource.map((item: any) => (
          <MenuItem
            as="li"
            key={item.value}
            onClick={() => handleSelect(item.value, item)}
            className={value === item.label ? 'active' : undefined}
          >
            <Box display="inline-block" size="20px" bg={item.color} borderRadius="m" mr="m" />
            {item.label}
          </MenuItem>
        ))}
      </MenuBox>
    </Popup>
  );
}

interface ToggleButtonGroupContext {
  value?: string | string[];
  onSelect?: (value: string, checked: boolean) => void;
}

const [ToggleButtonGroupProvider, useToggleButtonGroup] = createContext<ToggleButtonGroupContext>({
  name: 'ToggleButtonGroupContext',
  strict: false,
});

export interface ToggleButtonGroupProps extends Omit<UseSelectableListProps<string | string[]>, 'component'> {
  /**
   * 数据源
   */
  dataSource?: ListNode<string>[];
  /**
   * 透传给按钮的属性
   */
  buttonProps?: ButtonProps;
  /**
   * 按钮是否贴合在一起
   */
  isAttached?: GroupProps['isAttached'];
  className?: string;
}

export function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  const {
    dataSource = [],
    isAttached = false,
    selectMode = 'single',
    value: valueProp,
    defaultValue,
    onChange,
    buttonProps,
    className,
    ...rest
  } = props;

  const { value, onSelect } = useSelectableList({
    component: 'ToggleButtonGroup',
    selectMode,
    value: valueProp,
    defaultValue,
    onChange,
  });

  const clazz = cx('rex-toggleButton-group', className);

  const group = {
    value,
    onSelect,
  };

  return (
    <ToggleButtonGroupProvider value={group}>
      <Group isAttached={isAttached} className={clazz} {...rest}>
        {dataSource.map(({ label, value, ...others }) => (
          <ToggleButtonItem {...buttonProps} key={value} value={value} {...others}>
            {label}
          </ToggleButtonItem>
        ))}
      </Group>
    </ToggleButtonGroupProvider>
  );
}

function ToggleButtonItem(props: ButtonProps & { value?: string }) {
  const { value, isSelected: isSelectedProp, children, ...rest } = props;
  const group = useToggleButtonGroup();

  let isSelected = isSelectedProp;
  if (group?.value !== undefined && value) {
    isSelected = (group.value || []).includes(value);
  }

  let onSelect;

  if (group.onSelect && value) {
    onSelect = () => {
      group.onSelect(value, !isSelected);
    };
  }

  return (
    <Button isSelected={isSelected} onClick={onSelect} {...rest}>
      {children}
    </Button>
  );
}
