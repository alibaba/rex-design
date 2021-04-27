import { createContext } from '../../utils';
import { Dayjs } from '../../dayjs';
import { FormEventDetail } from '../../types';
import { DatePanelMode, CheckDateFn } from './date-types';

interface CheckParamsFnParams {
  /**
   * 日期格式
   */
  format?: string;
  /**
   * 系统日历上的今日
   */
  today?: Dayjs;
  /**
   * 选中的开始日期
   */
  startValue?: Dayjs;
  /**
   * 选中的结束日期
   */
  endValue?: Dayjs;
  /**
   * 当前显示的月
   */
  visibleMonth?: Dayjs;
}

type CheckParamsFn = (obj: CheckParamsFnParams) => boolean;

interface DateTableContext {
  format?: string;
  today?: Dayjs;
  /**
   * 时间值
   */
  timeValue?: Dayjs;
  check?(fn: CheckParamsFn): boolean;
  onSelectDate?(date: Dayjs, data?: FormEventDetail): void;
  onSelectTime?(date: Dayjs): void;
  onSelectMonth?(date: Dayjs, data?: FormEventDetail): void;
  onSelectYear?(date: Dayjs, data?: FormEventDetail): void;
  onChangeMode?(nextMode: DatePanelMode): void;
  getDisabledDate?: CheckDateFn;
}

const [DateTableProvider, useDateTableContext] = createContext<DateTableContext>({
  name: 'DateTableContext',
  strict: false,
});

export { DateTableProvider, useDateTableContext };
