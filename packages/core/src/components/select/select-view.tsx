import cx from 'classnames';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDevice } from '../../providers';
import { pick } from '../../utils';
import { Input } from '../input';
import { AdaptivePopup, PopupChildrenRenderArgs, PopupTriggerRenderParams } from '../overlays';
import { VirtualList, VirtualListAlign } from '../virtual-list';
import { TickIcon } from './icons';
import { SelectTrigger } from './select-trigger';
import { DefaultNotFoundContent, filterDataSourceBySearchValue, rexLightScrollbarStyleMixin } from './select-utils';
import {
  ISelectAppearanceProps,
  ISelectPopupProps,
  ISelectSearchProps,
  selectAppearancePropKeys,
  SelectItem,
} from './types';

export const SelectPanelDiv = styled.div.withConfig({
  componentId: 'rex-select-panel',
})`
  max-height: 350px;
  overflow: auto;
  ${rexLightScrollbarStyleMixin};

  padding: 8px 4px;
  border-radius: var(--rex-radii-l);
  box-shadow: var(--rex-shadows-lowDown);

  *[data-popper-placement^='top'] > & {
    box-shadow: var(--rex-shadows-lowUp);
  }

  &.restricted {
    box-shadow: none;
    max-height: none;
    height: 100%;
  }

  .rex-select-search {
    margin-bottom: 4px;
    position: sticky;
    top: 0;
    z-index: 5;
    background: var(--rex-colors-emphasis-0);
  }
`;

const SelectItemDiv = styled.div.withConfig({ componentId: 'rex-select-item' })`
  font-size: var(--rex-fontSizes-body);
  height: var(--rex-components-Select-rowHeight);
  padding: 0 8px;
  background: var(--rex-colors-emphasis-0);
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
    font-weight: bold;
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
      reason?: any; // TODO 规范一下 reason
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
    // TODO
    disabled,
    autoScrollToFirstItemWhenOpen = true,
    autoCloseAfterSelect = selectMode === 'single',
  } = props;

  const virtualListRef = useRef<VirtualList<SelectItem>>();

  const valueSet = new Set(value);
  const trimmedSearchValue = searchValue.trim();
  const searchActive = showSearch && trimmedSearchValue;
  const filteredDataSource = searchActive ? filterDataSourceBySearchValue(trimmedSearchValue, dataSource) : dataSource;

  const isNotFound = dataSource.length > 0 && filteredDataSource.length === 0;
  const appearance: ISelectAppearanceProps = pick(props, selectAppearancePropKeys);

  const valueMap = new Map(dataSource.map((item) => [item.value, item]));
  const getLabelByValue = (v: string) => valueMap.get(v)?.label ?? v;

  // 处理不同端下的表现
  const { device } = useDevice();
  let height: number = undefined;
  let restricted = false;
  if (device.name === 'phone' && showSearch) {
    height = 350;
    restricted = true;
  }

  return (
    <AdaptivePopup
      visible={visible}
      onRequestOpen={onRequestOpen}
      onRequestClose={onRequestClose}
      autoWidth={autoWidth}
      autoHeight={autoHeight}
      offset={[0, appearance.minimum ? -2 : 2]}
      triggerType="click"
      fullscreenProps={{
        style: { width: '90vw', height },
      }}
      onOpen={() => {
        if (autoScrollToFirstItemWhenOpen) {
          const list = virtualListRef.current;
          const index = list.props.rows.findIndex((row) => valueSet.has(row.value));
          if (index !== -1) {
            list.scrollToRow(index, VirtualListAlign.center);
          }
        }
      }}
      renderTrigger={(params: unknown) => (
        <SelectTrigger
          ref={ref}
          visible={visible}
          value={value}
          dataSource={dataSource}
          onChange={onChange}
          popupTriggerRenderParams={params as PopupTriggerRenderParams}
          selectMode={selectMode}
          getLabelByValue={getLabelByValue}
          {...appearance}
        />
      )}
      renderChildren={renderSelectPanel}
      {...popupProps}
    />
  );

  function renderSelectPanel(arg: PopupChildrenRenderArgs) {
    return (
      <SelectPanelDiv ref={arg.ref as React.RefObject<HTMLDivElement>} className={cx({ restricted })}>
        {showSearch && (
          <Input
            // todo htmlType=search
            className="rex-select-search"
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

        <VirtualList
          estimatedRowHeight={32}
          ref={virtualListRef}
          rows={filteredDataSource}
          renderRow={(row, rowIndex, listRowDataset) => {
            const selected = valueSet.has(row.value);

            return (
              <SelectItemDiv
                key={row.value}
                className={cx({
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
      </SelectPanelDiv>
    );
  }
});
