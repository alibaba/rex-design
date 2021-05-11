import React, { useMemo } from 'react';
import cx from 'classnames';
import dayjs, { Dayjs } from '../../dayjs';
import { Box, Flex } from '../layout';
import { Button } from '../button';
import { DateList } from './styled';
import { useDateTableContext } from './date-context';
import { getToken } from '../../utils';

const getYearList = (visibleMonth: Dayjs) => {
  const startYearOfList = visibleMonth.startOf('year').add(-7, 'year');
  const endYearOfList = visibleMonth.startOf('year').add(4, 'year');

  const list = [];
  let current = startYearOfList;
  while (current.isSameOrBefore(endYearOfList, 'year')) {
    list.push(current);
    current = current.add(1, 'year');
  }

  return list;
};

interface YearTableProps {
  visibleMonth: Dayjs;
}

export function YearTable(props: YearTableProps) {
  const { visibleMonth } = props;
  const ctx = useDateTableContext();

  const yearList = useMemo(() => {
    return getYearList(visibleMonth);
  }, [visibleMonth]);

  const selectCurrent = () => {
    const current = dayjs();
    ctx.onSelectMonth(current);
    ctx.onChangeMode('month');
  };

  return (
    <Box px="l" width={getToken('DatePicker.monthCardWidth')}>
      <Flex justify="flex-end" mb="m">
        <Button shape="text" type="primary" size="small" onClick={selectCurrent}>
          今年
        </Button>
      </Flex>
      <DateList>
        {yearList.map((item: Dayjs) => {
          const display = item.format('YYYY');
          return (
            <YearCell key={display} title={display} date={item}>
              {display}
            </YearCell>
          );
        })}
      </DateList>
    </Box>
  );
}

interface YearCellProps extends React.ComponentProps<'li'> {
  date?: Dayjs;
}

function YearCell(props: YearCellProps) {
  const { date, className, children, ...rest } = props;
  const ctx = useDateTableContext();
  const clazz = cx(
    {
      'rex-active': ctx.check(({ startValue, endValue }) => {
        if (startValue && startValue.isSame(date, 'year')) {
          return true;
        }
        if (endValue && endValue.isSame(date, 'year')) {
          return true;
        }
        return false;
      }),
      'rex-current': ctx.check(({ today }) => {
        return date.isSame(today, 'year');
      }),
    },
    className,
  );

  const handleClick = (e: any) => {
    ctx.onSelectYear(date, { event: e });
    ctx.onChangeMode('date');
  };

  return (
    <li className={clazz} onClick={handleClick} {...rest}>
      {children}
    </li>
  );
}
