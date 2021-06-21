import React, { useMemo, useState } from 'react';
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
import { getToken } from '../../utils';
import { useDevice } from '../../providers';

const defaultGetVisibleMonth = ({ startValue, endValue }: DateCardProps) => {
  const value = endValue || startValue;
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
   * 默认显示的月份
   */
  getDefaultVisibleMonth?: (props: DateCardProps) => Dayjs;
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
    onOk,
  } = props;
  const device = useDevice();
  const [mode, setMode] = useState<'date' | 'month' | 'year'>('date');
  const [visibleMonth, setVisibleMonth] = useState(() =>
    getDefaultVisibleMonth({
      startValue,
      endValue,
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

  const handleTimeChange = (date: Dayjs) => {
    const existValue = timeValue || dayjs();
    const fixedDate = existValue.hour(date.hour()).minute(date.minute()).second(date.second());
    onSelect(fixedDate);
  };

  let panelDirection = 'row';
  let timeRows = 9;
  let timeBoxProps = {};

  if (device.alias === 's') {
    panelDirection = 'column';
    timeRows = 3;
    timeBoxProps = {
      borderTop: 'solid',
      borderTopColor: 'emphasis.30',
    };
  }

  // TODO: 快捷调用

  const timePanelMode = timeProps?.mode || 'simple';
  const timePanelWidth =
    timePanelMode === 'simple'
      ? getToken('DatePicker.simpleTimeCardWidth')
      : getToken('DatePicker.normalTimeCardWidth');

  return (
    <DateTableProvider value={context}>
      <Box display="flex" flexDirection={panelDirection as any} py="l">
        <Box>
          {mode === 'date' && <DateTable visibleMonth={visibleMonth} locale={dateLocale} />}
          {mode === 'month' && <MonthTable visibleMonth={visibleMonth} locale={dateLocale} />}
          {mode === 'year' && <YearTable visibleMonth={visibleMonth} locale={dateLocale} />}
        </Box>
        {hasTime && mode === 'date' && (
          <Box width={timePanelWidth} {...timeBoxProps}>
            <TimePanel rows={timeRows} value={timeValue} mode="simple" onChange={handleTimeChange} {...timeProps} />
          </Box>
        )}
      </Box>
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
  const device = useDevice();

  return (
    <Box px="m" pb="m" textAlign="right">
      <Button
        isFullWidth={device.alias === 's'}
        size={device.alias === 's' ? 'medium' : 'small'}
        type="primary"
        onClick={onOk}
      >
        确认
      </Button>
    </Box>
  );
}
