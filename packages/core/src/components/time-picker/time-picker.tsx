import React from 'react';
import cx from 'classnames';
import dayjs, { Dayjs } from '../../dayjs';
import { Input } from '../input';
import { Box } from '../layout';
import { AdaptivePopup } from '../overlays';
import { TimePanel, TimePanelGetItemsProps } from './time-panel';
import { useControllableState } from '../../hooks';
import { getToken, noop, pickStyleAndDataAndEventProps } from '../../utils';
import { PopupProps } from '../overlays';
import { FormControlOnChangeHandler } from '../../types';

export interface TimePickerProps extends TimePanelGetItemsProps {
  placeholder?: string;
  /**
   * 选择模式
   */
  mode?: 'simple' | 'normal';
  /**
   * 时间格式
   */
  format?: string;
  value?: string;
  defaultValue?: string;
  onChange?: FormControlOnChangeHandler<string>;
  status?: string;
  popupProps?: PopupProps;
  className?: string;
  style?: React.CSSProperties;
}

function formatTimeValue(str: string, format: string) {
  if (str) {
    return dayjs(str, format);
  }
  return str;
}

export function TimePicker(props: TimePickerProps) {
  const {
    placeholder = '请选择时间',
    mode = 'normal',
    value: valueProp,
    defaultValue,
    format = mode === 'simple' ? 'HH:mm' : 'HH:mm:ss',
    onChange = noop,
    status,
    popupProps,
    className,
    ...rest
  } = props;

  const [triggerProps, restProps] = pickStyleAndDataAndEventProps(rest);

  const [value, updateValue] = useControllableState<any>({
    value: formatTimeValue(valueProp, format),
    defaultValue: formatTimeValue(defaultValue, format),
    onChange: (date: Dayjs) => {
      const display = date.format(format);
      onChange(display, { data: date });
    },
  });

  const inputValue = value ? value.format(format) : '';

  const panelWidth =
    mode === 'simple' ? getToken('TimePicker.simplePanelWidth') : getToken('TimePicker.normalPanelWidth');

  return (
    <AdaptivePopup
      offset={[0, 4]}
      {...popupProps}
      renderTarget={(pass: any) => (
        <Input
          {...pass}
          {...triggerProps}
          width={getToken('TimePicker.triggerWidth')}
          className={cx('rex-time-picker', className)}
          placeholder={placeholder}
          value={inputValue}
          readOnly
          status={status}
        />
      )}
      renderChildren={({ ref }: any) => (
        <Box ref={ref} width={panelWidth} boxShadow="lowDown" borderRadius="m">
          <TimePanel value={value} onChange={(value: Dayjs) => updateValue(value)} mode={mode} {...restProps} />
        </Box>
      )}
    />
  );
}
