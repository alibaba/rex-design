import React, { useState } from 'react';
import { AdaptivePopup, PickerPopupProps } from '../overlays';
import { PickerValue, PickerValueDetail, PickerView, PickerViewProps } from './picker-view';
import { pickerClassPrefix, PickerHeader } from './styled';
import { useControllableState, useIsomorphicLayoutEffect } from '../../hooks';
import cx from 'classnames';
import { Button } from '../button';
import { SvgClose } from '@rexd/icon/src/components/index';
import { generateColumnsDetail } from './columns-extend';

export interface PickerProps extends PickerViewProps, PickerPopupProps {
  visible?: boolean;
  loading?: boolean;
  onConfirm?: (value: PickerValue[], detail: PickerValueDetail) => void;
  onSelect?: (value: PickerValue[], detail: PickerValueDetail) => void;
  onCancel?: () => void;
  title?: React.ReactNode;
}

export function Picker(props: PickerProps) {
  const {
    value: valueProp,
    defaultValue,
    visible,
    loading,
    onCancel,
    onConfirm,
    onSelect,
    onClose,
    onOpen,
    onRequestClose,
    onRequestOpen,
    canCloseByOutSideClick = true,
    canCloseByEsc,
    canCloseByBlur,
    canOpenByFocus,
    title,
    columns,
    renderLabel = (item) => item.label,
    mouseWheel = false,
  } = props;

  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange: (nextValue) => {
      const detail = generateColumnsDetail(columns, nextValue);
      onConfirm?.(nextValue, detail);
    },
  });

  const [innerValue, setInnerValue] = useState(props.value);

  const viewOnChange: PickerViewProps['onChange'] = (value, detail) => {
    setInnerValue(value);
    if (visible) {
      onSelect?.(value, detail);
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (innerValue !== props.value) {
      setInnerValue(props.value);
    }
  }, [visible]);

  useIsomorphicLayoutEffect(() => {
    if (!visible) {
      setInnerValue(props.value);
    }
  }, [props.value]);

  const pickerInnerElement = (
    <div className={pickerClassPrefix}>
      <PickerHeader>
        <Button
          shape="text"
          onClick={() => {
            onCancel?.();
            onRequestClose?.();
          }}
        >
          <SvgClose />
        </Button>
        <div className={`${pickerClassPrefix}-header-title`}>{title}</div>
        <Button
          shape="text"
          type="primary"
          className={cx(`${pickerClassPrefix}-header-button`, loading && `${pickerClassPrefix}-header-button-disabled`)}
          onClick={() => {
            if (loading) return;
            setValue(innerValue);
            onRequestClose?.();
          }}
        >
          确定
        </Button>
      </PickerHeader>
      <div className={`${pickerClassPrefix}-body`}>
        <PickerView
          value={value}
          onChange={viewOnChange}
          columns={columns}
          mouseWheel={mouseWheel}
          renderLabel={renderLabel}
        />
      </div>
    </div>
  );

  return (
    <AdaptivePopup
      offset={[0, 4]}
      visible={visible}
      onClose={onClose}
      onOpen={onOpen}
      onRequestOpen={onRequestOpen}
      onRequestClose={onRequestClose}
      canCloseByEsc={canCloseByEsc}
      canCloseByBlur={canCloseByBlur}
      canOpenByFocus={canOpenByFocus}
      canCloseByOutSideClick={canCloseByOutSideClick}
      renderChildren={({ ref }: any) => (
        <AdaptivePopup.Panel ref={ref} width="100vw" borderRadius="m">
          {pickerInnerElement}
        </AdaptivePopup.Panel>
      )}
    />
  );
}
