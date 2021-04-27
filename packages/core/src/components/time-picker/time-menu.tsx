import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Box } from '../layout';
import { FormControlOnChangeHandler } from '../../types';
import { getToken, noop } from '../../utils';

const Wrapper = styled(Box)`
  flex: 1;
  text-align: center;
  user-select: none;
  color: var(--rex-colors-text-body);
  background-color: var(--rex-colors-emphasis-0);
`;

const List = styled(Box)<any>`
  height: ${(props) => 'calc(' + getToken('TimePicker.panelMenuItemHeight') + '*' + props.$rows + ')'};
  flex: 1;
  position: relative;
  overflow-y: auto;
  list-style: none;

  margin: 0;
  padding: 0;
  font-size: var(--rex-fontSizes-body);
`;

const ListItem = styled(Box)`
  height: ${getToken('TimePicker.panelMenuItemHeight')};
  line-height: ${getToken('TimePicker.panelMenuItemHeight')};

  &:hover {
    background-color: var(--rex-colors-emphasis-20);
  }

  &.rex-selected {
    background-color: var(--rex-colors-emphasis-30);
  }
`;

function scrollTo(element: any, to: any, duration: number) {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    function requestAnimationFrameTimeout(...params: any) {
      return setTimeout(params[0], 10);
    };

  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }

  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  requestAnimationFrame(() => {
    element.scrollTop += perTick;

    if (element.scrollTop === to) {
      return;
    }

    scrollTo(element, to, duration - 10);
  });
}

const defaultGetItemKey = (item: any) => item.value;
const defaultGetItemLabel = (item: any) => item.label;
const nullRender = (): any => null;

interface TimeMenuProps {
  /**
   * 列表展示的行数
   */
  rows?: number;
  items?: any[];
  selectedKey: any;
  getItemKey?: (item: any) => any;
  getItemLabel?: (item: any) => any;
  onSelect?: FormControlOnChangeHandler<any>;
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
}

/**
 * TODO: 是否要抽成通用的 ListBox
 */
export function TimeMenu(props: TimeMenuProps) {
  const {
    items = [],
    selectedKey,
    rows = 6,
    getItemKey = defaultGetItemKey,
    getItemLabel = defaultGetItemLabel,
    onSelect = noop,
    renderHeader = nullRender,
    renderFooter = nullRender,
  } = props;

  const menu = useRef<HTMLUListElement>();
  const selected = useRef<HTMLLIElement>();

  useEffect(() => {
    scrollTo(menu.current, selected.current?.offsetTop, 100);
  }, [selectedKey]);

  return (
    <Wrapper>
      <Box py="s" fontSize="body" bg="fill.layer1" fontWeight="bold">
        {renderHeader()}
      </Box>
      <List as="ul" ref={menu} $rows={rows}>
        {items.map((item) => {
          const key = getItemKey(item);
          const isSelected = key === selectedKey;
          return (
            <ListItem
              as="li"
              ref={isSelected ? selected : undefined}
              key={key}
              className={cx({
                ['rex-selected']: isSelected,
              })}
              onClick={(e: any) => onSelect(key, { event: e, data: item })}
            >
              {getItemLabel(item)}
            </ListItem>
          );
        })}
      </List>
      <Box fontSize="body">{renderFooter()}</Box>
    </Wrapper>
  );
}
