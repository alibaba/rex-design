import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React, { RefAttributes } from 'react';
import styled from 'styled-components';
import { getToken, useMemoizedMergeRefs } from '../../utils';
import { PopupTargetRenderArgs } from '../overlays';
import { CaretDownIcon, ClearIcon } from './icons';
import { ISelectAppearanceProps, MultiValue, SelectItem } from './types';
import { toggleValue } from './utils/select-utils';
import { LoadingIndicator } from './components/indicators';

const ValueTagDiv = styled.div.withConfig({ componentId: 'rex-select-value-tag' })`
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 2px;
  color: var(--rex-colors-text-body);
  height: var(--rex-sizes-s6);
  font-size: var(--rex-fontSizes-note);
  background-color: var(--rex-colors-emphasis-20);

  &:hover {
    background-color: var(--rex-colors-emphasis-30);
  }

  > .delete-icon {
    color: var(--rex-colors-emphasis-50);
    margin-left: 6px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: var(--rex-colors-emphasis-60);
    }
  }
`;

interface ValueTagProps<ValueType> {
  value: ValueType;
  label: React.ReactNode;
  showDelete: boolean;

  onDelete(v: ValueType, event: any): void;
}

const ValueTag = <ValueType extends unknown>({ value, label, onDelete, showDelete }: ValueTagProps<ValueType>) => (
  <ValueTagDiv>
    {label}
    {showDelete && (
      <span
        className="delete-icon"
        onClick={(event) => {
          event.stopPropagation();
          onDelete(value, event);
        }}
      >
        <Icon type="close-bold" />
      </span>
    )}
  </ValueTagDiv>
);

const SelectTriggerDiv = styled.div`
  cursor: pointer;
  height: var(--rex-sizes-formHeights-m);
  display: inline-flex;
  width: 200px;
  align-items: center;
  font-size: var(--rex-fontSizes-body);
  padding: 2px 2px 2px 12px;
  border-radius: var(--rex-radii-s);
  position: relative;
  overflow: hidden;
  color: ${getToken('Input.textColor')};
  transition: box-shadow 300ms cubic-bezier(0.19, 1, 0.22, 1), border-color 300ms cubic-bezier(0.19, 1, 0.22, 1);

  &.rex-fill {
    width: 100%;
  }

  &.rex-solid {
    border: var(--rex-borders-solid) ${getToken('Input.borderColor')};
    border-radius: var(--rex-radii-s);

    &:focus-within {
      outline: 0;
      box-shadow: 0 0 0 3px ${getToken('Input.borderColorFocus')};
    }

    &:hover {
      border-color: ${getToken('Input.borderColorHover')};
    }

    &.rex-error {
      border-color: ${getToken('Input.borderColorError')};

      &:focus-within {
        box-shadow: 0 0 0 3px ${getToken('Input.borderColorErrorFocus')};
      }
    }

    &.rex-warning {
      border-color: ${getToken('Input.borderColorWarning')};

      &:focus-within {
        box-shadow: 0 0 0 3px ${getToken('Input.borderColorWarningFocus')};
      }
    }

    &.rex-success {
      border-color: ${getToken('Input.borderColorSuccess')};

      &:focus-within {
        box-shadow: 0 0 0 3px ${getToken('Input.borderColorSuccessFocus')};
      }
    }
  }

  &.rex-simple {
    border: 0;
    background-color: transparent;
  }

  &.rex-disabled,
  &.rex-disabled:hover,
  &.rex-disabled:focus-within {
    cursor: not-allowed;
    color: ${getToken('Input.textColorDisabled')};
    border-color: ${getToken('Input.borderColorDisabled')};
    background-color: ${getToken('Input.bgDisabled')};
    /* safari */
    -webkit-text-fill-color: ${getToken('Input.textColorDisabled')};

    .rex-select-trigger-controls {
      pointer-events: none;
      background-color: ${getToken('Input.bgDisabled')};
    }
  }

  .rex-select-placeholder {
    color: var(--rex-colors-emphasis-50);
  }

  .rex-select-value-group {
    display: inline-flex;
    flex-wrap: nowrap;
    flex: 1 1 auto;
    margin-left: -4px;

    > * {
      flex: 0 0 auto;
      margin-left: 4px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  .rex-select-trigger-controls {
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 8px;
    background: var(--rex-colors-emphasis-0);
    position: absolute;
  }

  &.rex-simple .rex-select-trigger-controls {
    margin-left: 4px;
    position: static;
  }

  .rex-select-clear {
    cursor: pointer;
    margin-right: 4px;
  }

  .rex-select-arrow {
    transition: transform var(--animate-duration, 200ms) cubic-bezier(0.4, 1, 0.75, 0.9);
    cursor: pointer;
    margin-right: 4px;

    &.expanded {
      transform: rotate(180deg);
    }
  }
`;

export interface SelectTriggerProps<ValueType, IsMulti extends boolean> extends ISelectAppearanceProps {
  visible: boolean;

  value: MultiValue<ValueType>;
  dataSource: SelectItem<ValueType>[];

  onChange(
    nextValue: MultiValue<ValueType>,
    detail: {
      event: React.MouseEvent;
      reason?: any; // TODO 规范 reason
    },
  ): void;

  disabled?: boolean;
  multiple?: IsMulti;
  popupTargetRenderArg: PopupTargetRenderArgs[0];

  // TODO 这里如果 value 类型不为 value, 怎么去搜索到 value
  getLabelByValue(value: ValueType): React.ReactNode;
}

type SelectTrigger = <ValueType, IsMulti extends boolean>(
  props: SelectTriggerProps<ValueType, IsMulti> & RefAttributes<HTMLDivElement>,
) => React.ReactElement;

export const SelectTrigger = React.forwardRef(
  <ValueType, IsMulti extends boolean>(props: SelectTriggerProps<ValueType, IsMulti>, ref: any) => {
    const {
      popupTargetRenderArg,
      visible,
      value,
      multiple,
      onChange,
      containerProps,
      shape = 'solid',
      className,
      style,
      hasClear,
      placeholder = '请选择',
      hasArrow = true,
      status = 'normal',
      disabled,
      loading,
      fill,
      getLabelByValue,
    } = props;

    console.log('value111', value);

    const mergeRefs = useMemoizedMergeRefs();

    const onClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      onChange([], { event });
    };

    return (
      <SelectTriggerDiv
        ref={mergeRefs(popupTargetRenderArg.ref, ref)}
        {...containerProps}
        className={cx(
          {
            'rex-solid': shape === 'solid',
            'rex-simple': shape === 'simple',
            'rex-error': status === 'error',
            'rex-warning': status === 'warning',
            'rex-success': status === 'success',
            'rex-disabled': disabled,
            'rex-fill': fill,
          },
          className,
        )}
        style={style}
        onClick={(event) => {
          if (!disabled) {
            popupTargetRenderArg.onClick(event);
          }
          containerProps?.onClick(event);
        }}
        tabIndex={0}
      >
        {value.length === 0 ? (
          <span className="rex-select-placeholder">{placeholder}</span>
        ) : multiple ? (
          // 多选
          <span className="rex-select-value-group">
            {
              // TODO fix type here
              value.map((v: any) => (
                <ValueTag
                  key={v}
                  value={v}
                  label={getLabelByValue(v)}
                  showDelete={!disabled}
                  onDelete={(v, event) => {
                    onChange(toggleValue(value, v), { event, reason: 'tag-close' });
                  }}
                />
              ))
            }
          </span>
        ) : (
          // 单选
          <span className="rex-select-value-preview">{getLabelByValue(value[0])}</span>
        )}

        {renderTriggerControls()}
      </SelectTriggerDiv>
    );

    function renderTriggerControls() {
      const controls: React.ReactNode[] = [];
      if (multiple && value.length > 0) {
        controls.push(
          <span key="count" style={{ marginRight: 4 }}>
            共 {value.length} 项
          </span>,
        );
      }
      if (hasClear && value.length > 0) {
        controls.push(<ClearIcon key="select-clear" className="rex-select-clear" onClick={onClear} />);
      }

      if (hasArrow && !loading) {
        controls.push(<CaretDownIcon key="select-arrow" className={cx('rex-select-arrow', { expanded: visible })} />);
      }

      if (loading) {
        controls.push(<LoadingIndicator />);
      }

      return <div className="rex-select-trigger-controls">{controls}</div>;
    }
  },
) as SelectTrigger;
