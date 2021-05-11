import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Box } from '../layout';
import { FormControlOnChangeHandler } from '../../types';
import { getToken, noop } from '../../utils';

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  text-align: center;
  user-select: none;
  color: var(--rex-colors-text-body);
`;

const List = styled.ul<any>`
  height: ${(props) => 'calc(' + getToken('TimePicker.panelMenuItemHeight') + '*' + props.$rows + ')'};
  flex: 1;
  position: relative;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: var(--rex-fontSizes-body);
`;

const ListItem = styled.li`
  height: ${getToken('TimePicker.panelMenuItemHeight')};
  line-height: ${getToken('TimePicker.panelMenuItemHeight')};

  &:hover {
    font-weight: bold;
  }

  &.rex-selected {
    background-color: var(--rex-colors-emphasis-10);
  }
`;

const ListEndMask = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${getToken('TimePicker.panelMenuItemHeight')};
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.65) 35%,
    rgba(255, 255, 255, 0.95) 100%
  );
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

interface TimeMenuProps {
  /**
   * 列表展示的行数
   */
  rows?: number;
  items?: any[];
  selectedKey: any;
  getItemKey?: (item: any) => any;
  onSelect?: FormControlOnChangeHandler<any>;
  renderHeader?: () => React.ReactNode;
  itemStyle?: React.CSSProperties;
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
    onSelect = noop,
    renderHeader,
    itemStyle,
  } = props;

  const menu = useRef<HTMLUListElement>();
  const selected = useRef<HTMLLIElement>();
  const [isScrollToEnd, setIsScrollToEnd] = useState(false);

  useEffect(() => {
    scrollTo(menu.current, selected.current?.offsetTop, 100);
  }, [selectedKey]);

  const handleListScroll = (e: React.MouseEvent<HTMLUListElement>) => {
    const element = e.target as HTMLUListElement;
    const diff = element.scrollHeight - element.offsetHeight;
    let is = false;
    if (diff - element.scrollTop <= 2) {
      is = true;
    }

    if (is !== isScrollToEnd) {
      setIsScrollToEnd(is);
    }
  };

  const handleMaskClick = () => {
    scrollTo(menu.current, menu.current.scrollTop + 56, 100);
  };

  return (
    <Wrapper>
      {typeof renderHeader === 'function' && (
        <Box py="s" fontSize="body" color="text.note" fontWeight="bold">
          {renderHeader()}
        </Box>
      )}
      <List ref={menu} $rows={rows} onScroll={handleListScroll}>
        {items.map((item) => {
          const key = getItemKey(item);
          const isSelected = key === selectedKey;
          return (
            <ListItem
              ref={isSelected ? selected : undefined}
              key={key}
              className={cx({
                ['rex-selected']: isSelected,
              })}
              onClick={(e: any) => onSelect(key, { event: e, data: item })}
              style={itemStyle}
            >
              {item.label}
            </ListItem>
          );
        })}
      </List>
      {!isScrollToEnd && <ListEndMask onClick={handleMaskClick} />}
    </Wrapper>
  );
}
