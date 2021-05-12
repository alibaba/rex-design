import cx from 'classnames';
import React, { useMemo } from 'react';
import { useGesture } from 'react-use-gesture';
import { Icon } from '@rexd/icon';
import { Dayjs } from '../../dayjs';
import { Box, Flex, FlexItem } from '../layout';
import { useDateTableContext } from './date-context';
import { DateLocale } from './date-types';
import { StyledTable, StyledRow, StyledHeadCell, StyledCell, StyledCellContent } from './styled';
import { Button } from '../button';

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

const arrowButtonStyle = {
  padding: 0,
};

const monthButtonStyle = {
  padding: '0 4px',
};

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
  const { visibleMonth, locale } = props;
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
      <Flex justify="space-between" align="center" px="m" pb="m">
        <FlexItem flex="unset">
          <Button
            shape="text"
            size="small"
            onClick={() => {
              ctx.onChangeMode('year');
            }}
          >
            {visibleMonth.year()}年
          </Button>
          <Button shape="text" size="small" isIconOnly onClick={() => ctx.onSelectMonth(visibleMonth.add(-1, 'month'))}>
            <Icon type="arrow-left-bold" />
          </Button>
          <Button shape="text" size="small" style={monthButtonStyle} onClick={() => ctx.onChangeMode('month')}>
            {locale.months[visibleMonth.month()]}
          </Button>
          <Button shape="text" size="small" isIconOnly onClick={() => ctx.onSelectMonth(visibleMonth.add(1, 'month'))}>
            <Icon type="arrow-right-bold" />
          </Button>
        </FlexItem>
        <Button
          shape="text"
          size="small"
          type="primary"
          onClick={() => {
            ctx.onSelectMonth(ctx.today.clone());
            ctx.onSelectDate(ctx.today.clone());
          }}
        >
          今日
        </Button>
      </Flex>
      <StyledTable {...bind()}>
        <Box className="rex-date-table-header" bg="emphasis.20" px="l">
          <StyledRow>
            {locale.weekdays.map((item: string) => (
              <StyledHeadCell key={item}>
                <StyledCellContent>{item}</StyledCellContent>
              </StyledHeadCell>
            ))}
          </StyledRow>
        </Box>
        <Box className="rex-date-table-body" px="l">
          {dateList.map((dateRow) => (
            <DateRow key={dateRow[0].week()} items={dateRow} />
          ))}
        </Box>
      </StyledTable>
    </Box>
  );
}

interface DateRowProps extends React.ComponentPropsWithoutRef<'div'> {
  items?: Dayjs[];
}

function DateRow(props: DateRowProps) {
  const { items = [], ...rest } = props;
  const ctx = useDateTableContext();

  return (
    <StyledRow {...rest}>
      {items.map((item: Dayjs) => {
        const date = item.format(ctx.format);
        return <DateCell key={date} title={date} date={item} />;
      })}
    </StyledRow>
  );
}

interface DateCellProps extends React.ComponentPropsWithoutRef<'div'> {
  date: Dayjs;
}

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
    'rex-startValue': ctx.check(({ startValue }) => {
      if (startValue && startValue.isSame(date, 'date')) {
        return true;
      }
      return false;
    }),
    'rex-endValue': ctx.check(({ endValue }) => {
      if (endValue && endValue.isSame(date, 'date')) {
        return true;
      }
      return false;
    }),
    'rex-inRange': ctx.check(({ startValue, endValue }) => {
      if (startValue && endValue && startValue.isSameOrBefore(date, 'date') && endValue.isSameOrAfter(date, 'date')) {
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
    <StyledCell className={clazz} onClick={disabled ? undefined : handleClick} {...rest}>
      <StyledCellContent>{date.date()}</StyledCellContent>
    </StyledCell>
  );
}
