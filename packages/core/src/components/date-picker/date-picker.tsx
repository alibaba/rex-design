import React from 'react';
import cx from 'classnames';
import { Icon } from '@rexd/icon';
import dayjs, { Dayjs } from '../../dayjs';
import { AdaptivePopup } from '../overlays';
import { Input } from '../input';
import { DatePanel } from './date-panel';
import { useControllableState, useVisible } from '../../hooks';
import { DatePickerSharedProps } from './date-types';
import { getToken, noop, pickStyleAndDataAndEventProps } from '../../utils';
import { FormControlOnChangeHandler } from '../../types';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';

function formatDateValue(str: string, format: string) {
  if (str) {
    return dayjs(str, format);
  }
  if (str === '') {
    return null;
  }

  return;
}

export interface DatePickerProps extends DatePickerSharedProps {
  /**
   * 输入框提示文本
   */
  placeholder?: string;
  /**
   * 受控的日期值
   */
  value?: string;
  /**
   * 默认选中的日期值
   */
  defaultValue?: string;
  /**
   * 选中日期值改变时的回调
   */
  onChange?: FormControlOnChangeHandler<string>;
  status?: string;
}

export function DatePicker(props: DatePickerProps) {
  const {
    placeholder = '选择日期',
    hasTime = false,
    format = hasTime ? [DATE_FORMAT, TIME_FORMAT].join(' ') : DATE_FORMAT,
    value: valueProp,
    defaultValue,
    onChange = noop,
    status,
    popupProps,
    className,
    ...rest
  } = props;

  const [triggerProps, restProps] = pickStyleAndDataAndEventProps(rest);

  const { visible, onClose, onOpen } = useVisible({});
  const [value, updateValue] = useControllableState<Dayjs>({
    value: formatDateValue(valueProp, format),
    defaultValue: formatDateValue(defaultValue, format),
    onChange: (date: Dayjs) => {
      const display = date ? date.format(format) : '';
      onChange(display, { data: date });
    },
  });

  const dateCompareUnit = hasTime ? 'second' : 'date'; // 选择日期时比较的粒度
  const display = value ? value.format(format) : '';

  return (
    <AdaptivePopup
      {...popupProps}
      offset={[0, 2]}
      visible={visible}
      onRequestClose={onClose}
      onRequestOpen={onOpen}
      interactionKind="click"
      renderTarget={(pass: any) => (
        <Input
          {...pass}
          {...triggerProps}
          width={getToken('DatePicker.triggerWidth')}
          className={cx('rex-date-picker', className)}
          placeholder={placeholder}
          value={display}
          onClear={() => updateValue(null)}
          status={status}
          readOnly
          hasClear
          rightElement={<Icon type="calendar" />}
        />
      )}
      renderChildren={({ ref }: any) => (
        <DatePanel
          forwardedRef={ref}
          format={format}
          hasTime={hasTime}
          startValue={value}
          timeValue={value}
          onSelect={(val: any) => {
            if (!val.isSame(value, dateCompareUnit)) {
              updateValue(val);
            }
          }}
          onOk={onClose}
          {...restProps}
        />
      )}
    />
  );
}
