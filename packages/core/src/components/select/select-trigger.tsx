import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { composeHandlers, useMemoizedMergeRefs } from '../../utils';
import { PopupTargetRenderArgs } from '../overlays';
import { CaretDownIcon, ClearIcon } from './icons';
import { toggleValue } from './select-utils';
import { ISelectAppearanceProps, SelectItem } from './types';

const ValueTagDiv = styled.div.withConfig({ componentId: 'rex-select-value-tag' })`
  display: inline-flex;
  align-items: center;
  padding: 0 var(--rex-space-m);
  border-radius: var(--rex-radii-m);
  color: var(--rex-colors-text-body);
  height: var(--rex-sizes-s5);
  font-size: var(--rex-fontSizes-note);
  background-color: var(--rex-colors-emphasis-10);

  &:hover {
    cursor: pointer;
    background-color: var(--rex-colors-emphasis-30);
  }

  > .delete-icon {
    margin-left: var(--rex-space-m);
    display: flex;
    align-items: center;
    cursor: pointer;
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

const SelectTriggerDiv = styled.div.withConfig({ componentId: 'rex-select-trigger' })`
  cursor: pointer;
  height: var(--rex-components-Select-triggerHeight);
  display: flex;
  align-items: center;
  transition: all 200ms;
  font-size: var(--rex-fontSizes-body);
  padding: 2px 2px 2px 12px;
  border-radius: var(--rex-radii-s);
  position: relative;
  overflow: hidden;

  &.rex-select-trigger-normal {
    border: 1px solid var(--rex-colors-emphasis-40);

    &:hover {
      border: 1px solid var(--rex-colors-brand-normal);
    }

    &:focus,
    &:active,
    &.active {
      border: 1px solid var(--rex-colors-brand-active);
      box-shadow: 0 0 0 1px var(--rex-colors-brand-normal);
      outline: none;
    }
  }

  &.rex-select-trigger-error {
    border: 1px solid var(--rex-colors-error-normal);

    &:hover {
      border: 1px solid var(--rex-colors-error-hover);
    }

    &:focus,
    &:active,
    &.active {
      border: 1px solid var(--rex-colors-error-active);
      box-shadow: 0 0 0 1px var(--rex-colors-error-normal);
      outline: none;
    }
  }

  &.rex-select-trigger-minimum {
    padding-left: 0;

    &,
    &:hover,
    &:focus,
    &:active,
    &.active {
      border-color: transparent;
      box-shadow: none;
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
    padding: 4px 4px 4px 12px;
    background: linear-gradient(to right, transparent, var(--rex-colors-emphasis-0) 8px);
    position: absolute;
  }

  &.rex-select-trigger-minimum .rex-select-trigger-controls {
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
    minimum,
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
          active: visible,
          'rex-select-trigger-normal': status === 'normal',
          'rex-select-trigger-error': status === 'error',
          'rex-select-trigger-minimum': minimum,
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
