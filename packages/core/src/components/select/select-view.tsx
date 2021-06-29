import cx from 'classnames';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { pick } from '../../utils';
import { Input } from '../input';
import { AdaptivePopup, PopupChildrenRenderArg, PopupTargetRenderArgs } from '../overlays';
import { VirtualList, VirtualListAlign } from '../virtual-list';
import { TickIcon } from './icons';
import { SelectTrigger } from './select-trigger';
import { DefaultNotFoundContent, filterDataSourceBySearchValue } from './utils/select-utils';
import {
  ISelectAppearanceProps,
  ISelectPopupProps,
  ISelectSearchProps,
  selectAppearancePropKeys,
  SelectItem,
} from './types';

export const SelectPanelDiv = styled(AdaptivePopup.Panel)`
  max-height: 350px;
  overflow: hidden;
  display: flex;
  flex-flow: column;

  *[data-popper-placement^='top'] > & {
    box-shadow: var(--rex-shadows-lowUp);
  }

  .rex-select-search {
    margin: 8px;
    flex: 0 0 auto;
    width: auto;
  }

  .rex-select-item-list-wrapper {
    margin: 8px 4px;
    flex: auto;
    overflow: auto;

    &.rex-empty {
      margin: 0;
    }
  }

  .rex-select-search + .rex-select-item-list-wrapper {
    margin-top: 0;
  }

  ${({ theme, $showSearch: showSearch }: any) => {
    if (theme.device?.name === 'phone') {
      return { width: '90vw', height: showSearch ? 350 : undefined };
    }
  }}
`;

const SelectItemDiv = styled.div`
  font-size: var(--rex-fontSizes-body);
  height: var(--rex-components-Select-rowHeight);
  padding: 0 8px;
  border-radius: var(--rex-radii-s);
  display: flex;
  align-items: center;
  transition: background-color 200ms;

  &.disabled {
    color: var(--rex-colors-text-disabled);
  }

  &:not(.disabled) {
    cursor: pointer;
    &:hover {
      background: var(--rex-colors-emphasis-10);
    }
  }

  &.selected {
    font-weight: 500;
  }

  .rex-select-item-tick {
    margin-left: auto;
  }
`;

// todo 支持键盘导航， focus tabIndex 也需要仔细设计一下

function toggleValue(value: string[], targetValue: string) {
  return value.includes(targetValue) ? value.filter((v) => v !== targetValue) : [...value, targetValue];
}

export interface SelectViewProps extends ISelectAppearanceProps, ISelectSearchProps, ISelectPopupProps {
  value: string[];
  onChange(
    nextValue: string[],
    detail: {
      event: React.MouseEvent;
      reason?: any; // TODO 规范 reason
    },
  ): void;
  disabled?: boolean;
  dataSource: SelectItem[];
  selectMode: 'single' | 'multiple';
}

// 选择器视图组件，完全受控组件
export const SelectView = React.forwardRef<HTMLDivElement, SelectViewProps>((props, ref) => {
  const {
    dataSource,
    value,
    onChange,
    selectMode,
    showSearch,
    autoWidth = true,
    autoHeight = true,
    searchValue,
    onSearch,
    notFoundContent = <DefaultNotFoundContent />,
    onRequestOpen,
    onRequestClose,
    visible,
    popupProps,
    disabled,
    autoScrollToFirstItemWhenOpen = true,
    autoCloseAfterSelect = selectMode === 'single',
  } = props;

  const virtualListRef = useRef<VirtualList<SelectItem>>();
  const searchInputWrapperRef = useRef<HTMLDivElement>(null);

  const valueSet = new Set(value);
  const trimmedSearchValue = searchValue.trim();
  const searchActive = showSearch && trimmedSearchValue;
  const filteredDataSource = searchActive ? filterDataSourceBySearchValue(trimmedSearchValue, dataSource) : dataSource;

  const isNotFound = dataSource.length > 0 && filteredDataSource.length === 0;
  const appearance: ISelectAppearanceProps = pick(props, selectAppearancePropKeys);

  const valueMap = new Map(dataSource.map((item) => [item.value, item]));
  const getLabelByValue = (v: string) => valueMap.get(v)?.label ?? v;

  return (
    <AdaptivePopup
      visible={visible}
      onRequestOpen={onRequestOpen}
      onRequestClose={onRequestClose}
      autoWidth={autoWidth}
      autoHeight={autoHeight}
      offset={[0, 4]}
      interactionKind="click"
      onOpen={() => {
        if (autoScrollToFirstItemWhenOpen) {
          const list = virtualListRef.current;
          const index = list.props.rows.findIndex((row) => valueSet.has(row.value));
          if (index !== -1) {
            list.scrollToRow(index, VirtualListAlign.center);
          }
          const input = searchInputWrapperRef.current?.querySelector('input');
          input?.focus();
        }
      }}
      renderTarget={(arg: unknown) => (
        <SelectTrigger
          ref={ref}
          visible={visible}
          value={value}
          dataSource={dataSource}
          onChange={onChange}
          popupTargetRenderArg={arg as PopupTargetRenderArgs[0]}
          selectMode={selectMode}
          getLabelByValue={getLabelByValue}
          disabled={disabled}
          {...appearance}
        />
      )}
      renderChildren={renderSelectPanel}
      {...popupProps}
    />
  );

  function renderSelectPanel(arg: PopupChildrenRenderArg) {
    return (
      <SelectPanelDiv
        className="rex-select-panel"
        ref={arg.ref as React.RefObject<HTMLDivElement>}
        // @ts-ignore
        $showSearch={showSearch}
      >
        {showSearch && (
          <Input
            className="rex-select-search"
            ref={searchInputWrapperRef}
            placeholder="搜索"
            hasClear
            value={searchValue}
            onChange={(nextSearchValue) => {
              if (showSearch) {
                onSearch(nextSearchValue, { event: null });
              }
              if (!visible) {
                onRequestOpen('search');
              }
            }}
          />
        )}
        {isNotFound && notFoundContent}

        <div className={cx('rex-select-item-list-wrapper', { 'rex-empty': isNotFound })}>
          <VirtualList
            estimatedRowHeight={28}
            ref={virtualListRef}
            rows={filteredDataSource}
            renderRow={(row, rowIndex, listRowDataset) => {
              const selected = valueSet.has(row.value);

              return (
                <SelectItemDiv
                  key={row.value}
                  className={cx('rex-select-item', {
                    selected: selected,
                    disabled: row.disabled,
                  })}
                  {...listRowDataset}
                  onClick={(event) => {
                    if (row.disabled) {
                      return;
                    }
                    onChange(toggleValue(value, row.value), { event });
                    if (autoCloseAfterSelect) {
                      onRequestClose();
                    }
                  }}
                >
                  <span className="rex-select-item-label">{row.label}</span>
                  {selected && <TickIcon className="rex-select-item-tick" />}
                </SelectItemDiv>
              );
            }}
          />
        </div>
      </SelectPanelDiv>
    );
  }
});
