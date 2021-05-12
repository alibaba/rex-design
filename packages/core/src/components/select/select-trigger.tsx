import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { composeHandlers, useMemoizedMergeRefs } from '../../utils';
import { PopupTargetRenderArgs } from '../overlays';
import { CaretDownIcon, ClearIcon } from './icons';
import { toggleValue } from './select-utils';
import { ISelectAppearanceProps, SelectItem } from './types';
import { getToken } from '../../utils';

const ValueTagDiv = styled.div.withConfig({ componentId: 'rex-select-value-tag' })`
  display: inline-flex;
  align-items: center;
  padding: 0 var(--rex-space-m);
  border-radius: 2px;
  color: var(--rex-colors-text-body);
  height: var(--rex-sizes-s6);
  font-size: var(--rex-fontSizes-note);
  background-color: var(--rex-colors-emphasis-10);

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

interface ValueTagProps {
  v: string;
  label: React.ReactNode;
  onDelete(v: string, event: any): void;
}

const ValueTag = React.memo(({ v, label, onDelete }: ValueTagProps) => (
  <ValueTagDiv>
    {label}
    <span
      className="delete-icon"
      onClick={(event) => {
        event.stopPropagation();
        onDelete(v, event);
      }}
    >
      <Icon type="close-bold" />
    </span>
  </ValueTagDiv>
));

const SelectTriggerDiv = styled.div`
  cursor: pointer;
  height: var(--rex-sizes-formHeights-m);
  display: flex;
  align-items: center;
  transition: all 200ms;
  font-size: var(--rex-fontSizes-body);
  padding: 2px 2px 2px 12px;
  border-radius: var(--rex-radii-s);
  position: relative;
  overflow: hidden;
  color: ${getToken('Input.textColor')};

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

  // &.rex-disabled {
  //   pointer-events: none;
  //   color: ${getToken('Input.textColorDisabled')};
  //   border-color: ${getToken('Input.borderColorDisabled')};
  //   background-color: ${getToken('Input.bgDisabled')};
  //   /* safari */
  //   -webkit-text-fill-color: ${getToken('Input.textColorDisabled')};
  // }

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
    padding: 4px 4px 4px 12px;
    background: linear-gradient(to right, transparent, var(--rex-colors-emphasis-0) 8px);
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

export interface SelectTriggerProps extends ISelectAppearanceProps {
  visible: boolean;

  value: string[];
  dataSource: SelectItem[];
  onChange(
    nextValue: string[],
    detail: {
      event: React.MouseEvent;
      reason?: any; // TODO 规范一下 reason
    },
  ): void;

  selectMode: 'single' | 'multiple';

  popupTargetRenderArg: PopupTargetRenderArgs[0];
  getLabelByValue(value: string): React.ReactNode;
}

export const SelectTrigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>((props, ref) => {
  const {
    popupTargetRenderArg,
    visible,
    value,
    dataSource,
    onChange,
    containerProps,
    shape = 'solid',
    className,
    style,
    hasClear,
    selectMode,
    placeholder = '请选择',
    hasArrow = true,
    status = 'normal',
    size, // todo
    getLabelByValue,
  } = props;

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
        },
        className,
      )}
      style={style}
      onClick={composeHandlers(popupTargetRenderArg.onClick, containerProps?.onClick)}
      tabIndex={0}
    >
      {value.length === 0 ? (
        <span className="rex-select-placeholder">{placeholder}</span>
      ) : selectMode === 'single' ? (
        <span className="rex-select-value-preview">{getLabelByValue(value[0])}</span>
      ) : (
        <span className="rex-select-value-group">
          {value.map((v) => (
            <ValueTag
              key={v}
              v={v}
              label={getLabelByValue(v)}
              onDelete={(v, event) => {
                onChange(toggleValue(value, v), { event, reason: 'tag close' });
              }}
            />
          ))}
        </span>
      )}

      {renderTriggerControls()}
    </SelectTriggerDiv>
  );

  function renderTriggerControls() {
    const controls: React.ReactNode[] = [];
    if (selectMode === 'multiple' && value.length > 0) {
      controls.push(
        <span key="count" style={{ marginRight: 4 }}>
          共 {value.length} 项
        </span>,
      );
    }
    if (hasClear && value.length > 0) {
      controls.push(<ClearIcon key="select-clear" className="rex-select-clear" onClick={onClear} />);
    }
    if (hasArrow) {
      controls.push(<CaretDownIcon key="select-arrow" className={cx('rex-select-arrow', { expanded: visible })} />);
    }

    return <div className="rex-select-trigger-controls">{controls}</div>;
  }
});
