import React from 'react';
import cx from 'classnames';
import styled from 'styled-components';
import dayjs, { Dayjs } from '../../dayjs';
import { AdaptivePopup } from '../overlays';
import { Input } from '../input';
import { Box } from '../layout';
import { DatePanel } from './date-panel';
import { useControllableState, useVisible } from '../../hooks';
import { noop, getToken, isFunction } from '../../utils';
import { DatePickerSharedProps } from './date-types';
import { FormControlOnChangeHandler } from '../../types';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';

const Wrapper = styled.div`
  display: inline-flex;
  width: ${getToken('DateRangePicker.triggerWidth')};
  align-items: center;
  border: var(--rex-borders-solid) ${getToken('Input.borderColor')};
  border-radius: var(--rex-radii-s);
  height: var(--rex-sizes-formHeights-m);
  overflow: hidden;
`;

function formatDateValue(strs: string[], format: string) {
  if (Array.isArray(strs)) {
    const start = strs[0] ? dayjs(strs[0], format) : null;
    const end = strs[1] ? dayjs(strs[1], format) : null;

    return [start, end];
  }
  return strs;
}

function parseValue(value: Dayjs[]) {
  let startValue;
  let endValue;

  if (value) {
    startValue = value[0];
    endValue = value[1];
  }

  return {
    startValue,
    endValue,
  };
}

export interface DateRangePickerProps extends DatePickerSharedProps {
  /**
   * 输入框提示文本
   */
  placeholder?: string[];
  value?: string[];
  defaultValue?: string[];
  onChange?: FormControlOnChangeHandler<string[]>;
}

export function DateRangePicker(props: DateRangePickerProps) {
  const {
    placeholder = ['选择开始日期', '选择结束日期'],
    hasTime = false,
    format = hasTime ? [DATE_FORMAT, TIME_FORMAT].join(' ') : DATE_FORMAT,
    value: valueProp,
    defaultValue,
    onChange = noop,
    getDisabledDate,
    className,
    ...rest
  } = props;

  const { visible: startVisible, onClose: onStartClose, onOpen: onStartOpen } = useVisible({});
  const { visible: endVisible, onClose: onEndClose, onOpen: onEndOpen } = useVisible({});

  const [value, updateValue] = useControllableState({
    name: 'DateRangePicker',
    value: formatDateValue(valueProp, format),
    defaultValue: formatDateValue(defaultValue, format),
    onChange: (val) => {
      const display1 = val[0] ? val[0].format(format) : undefined;
      const display2 = val[1] ? val[1].format(format) : undefined;
      onChange([display1, display2], { data: val });
    },
  });

  const { startValue, endValue } = parseValue(value);
  const dateCompareUnit = hasTime ? 'second' : 'date'; // 选择日期时比较的粒度

  const clazz = cx('rex-date-range-picker', className);

  return (
    <Wrapper className={clazz} {...rest}>
      <AdaptivePopup
        visible={startVisible}
        onRequestOpen={onStartOpen}
        onRequestClose={onStartClose}
        triggerType="click"
        renderTrigger={(pass: any) => (
          <Input
            {...pass}
            placeholder={placeholder[0]}
            shape="simple"
            value={startValue ? startValue.format(format) : ''}
            readOnly
          />
        )}
      >
        <DatePanel
          format={format}
          hasTime={hasTime}
          timeValue={startValue}
          startValue={startValue}
          endValue={endValue}
          getDefaultVisibleMonth={() => (startValue ? startValue : dayjs())}
          onSelect={(val) => {
            if (!val.isSame(startValue, dateCompareUnit)) {
              updateValue([val, endValue]);
            }
          }}
          getDisabledDate={(date) => {
            if (isFunction(getDisabledDate)) {
              return getDisabledDate(date);
            }

            if (endValue && date.isAfter(endValue)) {
              return true;
            }
            return false;
          }}
          onOk={onStartClose}
          onClose={onStartClose}
        />
      </AdaptivePopup>
      <Box as="span" color="text.note">
        -
      </Box>
      <AdaptivePopup
        visible={endVisible}
        onRequestClose={onEndClose}
        onRequestOpen={onEndOpen}
        triggerType="click"
        renderTrigger={(pass: any) => (
          <Input
            {...pass}
            placeholder={placeholder[1]}
            shape="simple"
            value={endValue ? endValue.format(format) : ''}
            readOnly
          />
        )}
      >
        <DatePanel
          format={format}
          hasTime={hasTime}
          timeValue={endValue}
          startValue={startValue}
          endValue={endValue}
          onSelect={(val) => {
            if (!val.isSame(endValue, dateCompareUnit)) {
              updateValue([startValue, val]);
            }
          }}
          getDisabledDate={(date) => {
            if (isFunction(getDisabledDate)) {
              return getDisabledDate(date);
            }

            if (startValue && date.isBefore(startValue)) {
              return true;
            }
            return false;
          }}
          onOk={onEndClose}
          onClose={onEndClose}
        />
      </AdaptivePopup>
    </Wrapper>
  );
}
