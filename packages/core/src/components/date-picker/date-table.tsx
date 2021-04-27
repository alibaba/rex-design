import cx from 'classnames';
import React, { useMemo } from 'react';
import { useGesture } from 'react-use-gesture';
import styled from 'styled-components';
import { Icon } from '@rexd/icon';
import { Dayjs } from '../../dayjs';
import { getToken } from '../../utils';
import { Box, Flex, FlexItem } from '../layout';
import { useDateTableContext } from './date-context';
import { DateLocale } from './date-types';
import { DateLinkButton } from './styled';

/**
 * 获得日期的二维数组列表
 * @param visibleMonth 当前日期
 * @returns
 */
const getDateList = (visibleMonth: Dayjs) => {
  const startDayOfMonth = visibleMonth.startOf('month'); // 该月第一天
  const endDayOfMonth = visibleMonth.endOf('month'); // 该月的最后一天

  const startDayOfList = startDayOfMonth.weekday(0); // 列表的第一天
  const endDayOfList = endDayOfMonth.weekday(6); // 列表的最后一天

  const list = [];

  let current = startDayOfMonth;
  while (current.isSameOrBefore(endDayOfMonth)) {
    list.push(current.clone());
    current = current.add(1, 'day');
  }

  current = startDayOfMonth;
  while (current.isAfter(startDayOfList)) {
    current = current.add(-1, 'day');
    list.unshift(current.clone());
  }

  current = endDayOfMonth.add(1, 'day');
  while (current.isSameOrBefore(endDayOfList)) {
    list.push(current.clone());
    current = current.add(1, 'day');
  }

  // 确保始终占满 42 个格子
  while (list.length < 42) {
    current = current.add(1, 'day');
    list.push(current.clone());
  }

  const list2d = []; // 转为二维数组
  const chunk = 7; // 7 个一组
  const total = list.length;
  for (let i = 0; i < total; i += chunk) {
    list2d.push(list.slice(i, i + chunk));
  }

  return list2d;
};

const StyledTable = styled.table`
  user-select: none;
  border-collapse: collapse;
  width: 100%;
  font-size: var(--rex-fontSizes-body);
  color: var(--rex-colors-text-body);

  thead {
    background-color: var(--rex-colors-fill-layer1);
  }

  th {
    padding: 4px 0;
  }

  td {
    padding: 0;
  }
`;

export interface DateTableProps {
  /**
   * 是否显示关闭按钮
   */
  hasClose?: boolean;
  /**
   * 点击关闭按钮的回调
   */
  onClose?: () => void;
  /**
   * 当前显示的月份
   */
  visibleMonth?: Dayjs;
  /**
   * 文案
   */
  locale?: DateLocale;
}

export function DateTable(props: DateTableProps) {
  const { hasClose, onClose, visibleMonth, locale } = props;
  const ctx = useDateTableContext();

  const bind = useGesture({
    onDrag: ({ vxvy: [vx, vy], last }) => {
      if (last && vy > 0) {
        ctx.onSelectMonth(visibleMonth.add(-1, 'month'));
      } else if (last && vy < 0) {
        ctx.onSelectMonth(visibleMonth.add(1, 'month'));
      }
    },
  });

  const dateList = useMemo(() => {
    return getDateList(visibleMonth);
  }, [visibleMonth]);

  return (
    <Box>
      <Flex justify="space-between">
        {hasClose && (
          <DateLinkButton onClick={onClose}>
            <Icon type="close" />
          </DateLinkButton>
        )}
        <FlexItem flex="unset">
          <DateLinkButton
            onClick={() => {
              ctx.onChangeMode('year');
            }}
          >
            {visibleMonth.year()}
          </DateLinkButton>
          <DateLinkButton onClick={() => ctx.onSelectMonth(visibleMonth.add(-1, 'month'))}>
            <Icon type="arrow-left-bold" />
          </DateLinkButton>
          <DateLinkButton onClick={() => ctx.onChangeMode('month')}>
            {locale.months[visibleMonth.month()]}
          </DateLinkButton>
          <DateLinkButton onClick={() => ctx.onSelectMonth(visibleMonth.add(1, 'month'))}>
            <Icon type="arrow-right-bold" />
          </DateLinkButton>
        </FlexItem>
        <FlexItem flex="unset">
          <DateLinkButton
            onClick={() => {
              ctx.onSelectMonth(ctx.today.clone());
              ctx.onSelectDate(ctx.today.clone());
            }}
          >
            今日
          </DateLinkButton>
        </FlexItem>
      </Flex>
      <StyledTable {...bind()}>
        <thead>
          <tr>
            {locale.weekdays.map((item: string) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dateList.map((dateRow) => (
            <DateRow key={dateRow[0].week()} items={dateRow} />
          ))}
        </tbody>
      </StyledTable>
    </Box>
  );
}

interface DateRowProps extends React.ComponentProps<'tr'> {
  items?: Dayjs[];
}

function DateRow(props: DateRowProps) {
  const { items = [], ...rest } = props;
  const ctx = useDateTableContext();

  return (
    <tr {...rest}>
      {items.map((item: Dayjs) => {
        const date = item.format(ctx.format);
        return <DateCell key={date} title={date} date={item} />;
      })}
    </tr>
  );
}

interface DateCellProps extends React.ComponentProps<'td'> {
  date: Dayjs;
}

const CellContent = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${getToken('DatePicker.dateCellHeight')};

  &:hover {
    background-color: var(--rex-colors-primary-10);
  }

  &.rex-today {
    color: var(--rex-colors-brand-normal);

    &::after {
      content: ' ';
      position: absolute;
      transform: translateY(10px);
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: var(--rex-colors-brand-normal);
    }
  }

  &.rex-otherMonth {
    color: var(--rex-colors-text-note);
  }

  &.rex-active {
    color: var(--rex-colors-emphasis-0);
    background-color: var(--rex-colors-brand-normal);
  }

  &.rex-active.rex-today::after {
    background-color: #fff;
  }

  &.rex-inRange {
    background-color: var(--rex-colors-primary-10);
  }

  &.rex-disabled {
    color: var(--rex-colors-text-disabled);
    pointer-events: none;
  }
`;

function DateCell(props: DateCellProps) {
  const { date, ...rest } = props;
  const ctx = useDateTableContext();
  const disabled = ctx.getDisabledDate(date);

  const clazz = cx({
    'rex-active': ctx.check(({ startValue, endValue }) => {
      if (startValue && startValue.isSame(date, 'date')) {
        return true;
      }
      if (endValue && endValue.isSame(date, 'date')) {
        return true;
      }
      return false;
    }),
    'rex-inRange': ctx.check(({ startValue, endValue }) => {
      if (startValue && endValue && startValue.isBefore(date, 'date') && endValue.isAfter(date, 'date')) {
        return true;
      }
      return false;
    }),
    'rex-today': ctx.check(({ today }) => {
      // 是否为今日
      return today.isSame(date, 'date');
    }),
    'rex-otherMonth': ctx.check(({ visibleMonth }) => {
      // 非当前月的日期
      return !visibleMonth.isSame(date, 'month');
    }),
    'rex-disabled': disabled,
  });

  const handleClick = (e: any) => {
    let nextDate = date.clone();
    if (ctx.timeValue) {
      nextDate = date.hour(ctx.timeValue.hour()).minute(ctx.timeValue.minute()).second(ctx.timeValue.second());
    }

    ctx.onSelectDate(nextDate, { event: e });
  };

  return (
    <td onClick={disabled ? undefined : handleClick} {...rest}>
      <CellContent className={clazz}>{date.date()}</CellContent>
    </td>
  );
}
