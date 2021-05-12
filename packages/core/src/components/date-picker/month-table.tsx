import React from 'react';
import cx from 'classnames';
import dayjs, { Dayjs } from '../../dayjs';
import { Box, Flex } from '../layout';
import { Button } from '../button';
import { useDateTableContext } from './date-context';
import { DateList } from './styled';
import { DateLocale } from './date-types';
import { getToken } from '../../utils';

interface MonthTableProps {
  visibleMonth: Dayjs;
  locale?: DateLocale;
}

export function MonthTable(props: MonthTableProps) {
  const { visibleMonth, locale } = props;
  const ctx = useDateTableContext();

  const changeMode = () => {
    ctx.onChangeMode('year');
  };

  const selectCurrent = () => {
    const current = dayjs();
    ctx.onSelectMonth(current);
    ctx.onChangeMode('date');
  };

  return (
    <Box px="l" width={getToken('DatePicker.monthCardWidth')}>
      <Flex justify="space-between" mb="m">
        <Button shape="text" size="small" onClick={changeMode}>
          {visibleMonth.year()}年
        </Button>
        <Button shape="text" type="primary" size="small" onClick={selectCurrent}>
          本月
        </Button>
      </Flex>
      <DateList>
        {locale.months.map((item: string, index: number) => {
          const date = visibleMonth.month(index);
          const display = date.format('YYYY-MM');
          return (
            <MonthCell key={display} title={display} date={date}>
              {item}
            </MonthCell>
          );
        })}
      </DateList>
    </Box>
  );
}

interface MonthCellProps extends React.ComponentProps<'li'> {
  date?: Dayjs;
}

function MonthCell(props: MonthCellProps) {
  const { date, className, children, ...rest } = props;
  const ctx = useDateTableContext();
  const clazz = cx(
    {
      'rex-active': ctx.check(({ startValue, endValue }) => {
        // 是否为选中的月
        if (startValue && startValue.isSame(date, 'month')) {
          return true;
        }
        if (endValue && endValue.isSame(date, 'month')) {
          return true;
        }
        return false;
      }),
      'rex-current': ctx.check(({ today }) => {
        // 是否为当前月
        return date.isSame(today, 'month');
      }),
    },
    className,
  );

  const handleClick = (e: any) => {
    ctx.onSelectMonth(date, { event: e });
    ctx.onChangeMode('date');
  };

  return (
    <li className={clazz} onClick={handleClick} {...rest}>
      {children}
    </li>
  );
}
