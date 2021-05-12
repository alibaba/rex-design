import { Dayjs } from '../../dayjs';
import { TimePanelProps } from '../time-picker/time-panel';

export type DatePanelMode = 'date' | 'month' | 'year';

export type CheckDateFn = (date: Dayjs) => boolean;

export interface DateLocale {
  weekdays: string[];
  months: string[];
}

export interface DatePickerSharedProps {
  /**
   * 是否有时间
   */
  hasTime?: boolean;
  /**
   * 传递给时间面板的属性集
   */
  timeProps?: TimePanelProps;
  /**
   * 日期格式
   */
  format?: string;
  /**
   * 传递给弹层的属性集
   */
  popupProps?: any;
  /**
   * 设置禁用日期
   */
  getDisabledDate?: CheckDateFn;
  /**
   * 设置默认显示的月份
   */
  getDefaultVisibleMonth?: any;
  className?: string;
  style?: React.CSSProperties;
}
