import React from 'react';
import { ListNode } from '../../types';
import dayjs from '../../dayjs';
import { noop } from '../../utils';
import { Box } from '../layout';
import { TimeMenu } from './time-menu';

const getTimeItems = (total: number) => () => {
  const list = [];
  for (let i = 0; i < total; i++) {
    list.push({ value: i, label: i });
  }
  return list;
};

const defaultRenderHeader = (): React.ReactNode => null;

export interface TimePanelGetItemsProps {
  /**
   * 设置小时选项列表
   */
  getHourItems?: () => ListNode<number>[];
  /**
   * 设置分钟选项列表
   */
  getMinuteItems?: () => ListNode<number>[];
  /**
   * 设置秒钟选项列表
   */
  getSecondItems?: () => ListNode<number>[];
  /**
   * 设置快捷列表
   */
  getQuickItems?: () => ListNode<string>[];
  /**
   * 显示秒钟列表
   */
  hasSeconds?: boolean;
  /**
   * 显示分钟列表
   */
  hasMinutes?: boolean;
  /**
   * 显示小时列表
   */
  hasHours?: boolean;
}

export interface TimePanelProps extends TimePanelGetItemsProps {
  /**
   * 选择面板模式
   */
  mode?: 'simple' | 'normal';
  /**
   * 列表展示的行数
   */
  rows?: number;
  format?: string;
  value?: any;
  onChange?: any;
  renderHeader?: () => React.ReactNode;
}

export function TimePanel(props: TimePanelProps) {
  const { mode, ...rest } = props;
  const Panel = mode === 'simple' ? SimpleTimePanel : FullTimePanel;
  return <Panel {...rest} />;
}

function FullTimePanel(props: TimePanelProps) {
  const {
    rows = 6,
    format = 'HH:mm:ss',
    value,
    onChange = noop,
    getHourItems = getTimeItems(24),
    getMinuteItems = getTimeItems(60),
    getSecondItems = getTimeItems(60),

    hasHours = true,
    hasMinutes = true,
    hasSeconds = true,

    renderHeader = defaultRenderHeader,
  } = props;

  const hours = getHourItems();
  const minutes = getMinuteItems();
  const seconds = getSecondItems();

  const onSelect = (val: number, unit: 'hour' | 'minute' | 'second') => {
    let nextValue;

    if (value) {
      nextValue = value[unit](val);
    } else {
      const initValue = dayjs('00:00:00', format);
      nextValue = initValue[unit](val);
    }

    onChange(nextValue);
  };

  const handleHourSelect = (val: number) => {
    onSelect(val, 'hour');
  };

  const handleMinuteSelect = (val: number) => {
    onSelect(val, 'minute');
  };

  const handleSecondSelect = (val: number) => {
    onSelect(val, 'second');
  };

  return (
    <Box>
      {renderHeader()}
      <Box display="flex">
        {hasHours && (
          <TimeMenu
            rows={rows}
            renderHeader={() => '时'}
            items={hours}
            selectedKey={value ? value.hour() : undefined}
            onSelect={handleHourSelect}
          />
        )}
        {hasMinutes && (
          <TimeMenu
            rows={rows}
            renderHeader={() => '分'}
            items={minutes}
            selectedKey={value ? value.minute() : undefined}
            onSelect={handleMinuteSelect}
          />
        )}
        {hasSeconds && (
          <TimeMenu
            rows={rows}
            renderHeader={() => '秒'}
            items={seconds}
            selectedKey={value ? value.second() : undefined}
            onSelect={handleSecondSelect}
          />
        )}
      </Box>
    </Box>
  );
}

const getQuickTimeItems = () => {
  const minutes = ['00', '30'];
  const items: ListNode<string>[] = [];

  for (let i = 0; i < 24; i++) {
    minutes.forEach((min) => {
      const hour = i < 10 ? `0${i}` : i;
      const time = `${hour}:${min}`;
      items.push({ label: time, value: time });
    });
  }

  return items;
};

const simpleItemStyle = {
  borderRadius: 'var(--rex-radii-s)',
  margin: '0 var(--rex-space-s)',
};

function SimpleTimePanel(props: TimePanelProps) {
  const { rows = 6, format = 'HH:mm', value, onChange = noop, getQuickItems = getQuickTimeItems, renderHeader } = props;
  const timeItems = getQuickItems();

  const handleSelect = (val: string) => {
    const nextValue = dayjs(val, format);
    onChange(nextValue);
  };

  return (
    <Box position="relative">
      <TimeMenu
        rows={rows}
        items={timeItems}
        selectedKey={value ? value.format('HH:mm') : undefined}
        onSelect={handleSelect}
        itemStyle={simpleItemStyle}
        shouldScrollToActiveItem={false}
        renderHeader={renderHeader}
      />
    </Box>
  );
}
