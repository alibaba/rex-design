import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import dayjs, { Dayjs } from '../../dayjs';
import { Box } from '../layout';
import { Button } from '../button';
import { DateTable } from './date-table';
import { MonthTable } from './month-table';
import { YearTable } from './year-table';
import { DateTableProvider } from './date-context';
import { DatePanelMode, DateLocale, CheckDateFn } from './date-types';
import { FormEventDetail } from '../../types';
import { TimePanel, TimePanelProps } from '../time-picker/time-panel';
import { TimePanelHeader } from './styled';
import { getToken } from '../../utils';
import { useDevice } from '../../providers';

const Card = styled.div`
  display: flex;
  flex-direction: ${getToken('DatePicker.direction')};
`;

const DateBox = styled(Box)<any>`
  flex: 1;
  width: ${getToken('DatePicker.dateCardWidth')};
`;

interface GetVisibleMonthOption {
  value?: Dayjs;
}

const defaultGetVisibleMonth = ({ value }: GetVisibleMonthOption) => {
  if (value) {
    return value.clone();
  }

  return dayjs();
};

const defaultGetDisabledDate = () => false;

const getDateLocale = (): DateLocale => {
  const localeData = dayjs.localeData();
  let weekdays = localeData.weekdaysMin() as string[]; // 注：默认第一天是星期天
  const firstDayOfWeek = localeData.firstDayOfWeek();

  if (firstDayOfWeek) {
    // 如果第一天不是星期天
    const part1 = weekdays.slice(firstDayOfWeek);
    const part2 = weekdays.slice(0, firstDayOfWeek);
    weekdays = part1.concat(part2);
  }

  return {
    weekdays,
    months: localeData.months(),
  };
};

export interface DateCardProps {
  /**
   * 日期格式
   */
  format?: string;
  /**
   * 是否有时间
   */
  hasTime?: boolean;
  /**
   * 设置默认显示的月份
   */
  getDefaultVisibleMonth?: (props: GetVisibleMonthOption) => Dayjs;
  /**
   * 开始日期
   */
  startValue?: Dayjs;
  /**
   * 结束日期
   */
  endValue?: Dayjs;
  /**
   * 时间值
   */
  timeValue?: Dayjs;
  /**
   * 传递给时间面板的属性
   */
  timeProps?: TimePanelProps;
  /**
   * 点选某个日期时的回调
   */
  onSelect?: (date: Dayjs, data?: FormEventDetail) => void;
  /**
   * 设置日期值是否禁用
   */
  getDisabledDate?: CheckDateFn;
  /**
   * 点击关闭按钮时的回调
   */
  onClose?: () => void;
  /**
   * 点击确认按钮时的回调
   */
  onOk?: () => void;
}

export function DateCard(props: DateCardProps) {
  const {
    format,
    hasTime,
    timeProps,
    startValue,
    endValue,
    timeValue,
    getDefaultVisibleMonth = defaultGetVisibleMonth,
    getDisabledDate = defaultGetDisabledDate,
    onSelect,
    onClose,
    onOk,
  } = props;
  const { device } = useDevice();
  const [mode, setMode] = useState('date'); // date, month, year
  const [visibleMonth, setVisibleMonth] = useState(() =>
    getDefaultVisibleMonth({
      value: endValue || startValue,
    }),
  );

  const today = dayjs();
  const dateLocale = useMemo(() => {
    return getDateLocale();
  }, []);

  const context = {
    format,
    today,
    timeValue,
    check: (fn: any) => {
      return fn({ format, today, startValue, endValue, visibleMonth });
    },
    onSelectTime: (date: Dayjs) => {
      onSelect(date);
    },
    onSelectDate: (date: Dayjs, payload: FormEventDetail) => {
      if (!date.isSame(visibleMonth, 'month')) {
        setVisibleMonth(date);
      }
      onSelect(date, payload);
    },
    onSelectMonth: (date: Dayjs) => {
      setVisibleMonth(date);
    },
    onSelectYear: (date: Dayjs) => {
      setVisibleMonth(visibleMonth.year(date.year()));
    },
    onChangeMode: (nextMode: DatePanelMode) => {
      if (nextMode !== mode) {
        setMode(nextMode);
      }
    },
    getDisabledDate,
  };

  let timeRows = 9;
  let hasClose = false;

  if (device.alias === 's') {
    timeRows = 3;
    hasClose = true;
  }

  // TODO: 快捷调用

  return (
    <DateTableProvider value={context}>
      <Card>
        <DateBox $hasTime={hasTime}>
          {mode === 'date' && (
            <DateTable visibleMonth={visibleMonth} locale={dateLocale} hasClose={hasClose} onClose={onClose} />
          )}
          {mode === 'month' && <MonthTable visibleMonth={visibleMonth} locale={dateLocale} />}
          {mode === 'year' && <YearTable visibleMonth={visibleMonth} />}
        </DateBox>
        {hasTime && (
          <Box width={getToken('DatePicker.timeCardWidth')} py="l">
            <TimePanel rows={timeRows} value={timeValue} mode="simple" renderHeader={() => null} {...timeProps} />
          </Box>
        )}
      </Card>
      {hasTime && <DatePanelFooter onOk={onOk} />}
    </DateTableProvider>
  );
}

interface DatePanelFooterProps {
  // leftElement?: React.ReactNode;
  onOk?: React.MouseEventHandler<HTMLButtonElement>;
}

function DatePanelFooter(props: DatePanelFooterProps) {
  const { onOk } = props;
  const { device } = useDevice();
  return (
    <Box px="m" pb="m" textAlign="right">
      <Button isFullWidth={device.alias === 's'} size="small" type="primary" onClick={onOk}>
        确认
      </Button>
    </Box>
  );
}
