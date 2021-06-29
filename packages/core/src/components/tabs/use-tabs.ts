import cx from 'classnames';
import { omit } from 'lodash-es';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useControllableState } from '../../hooks';
import { isNull } from '../../utils';
import { TabProps } from './tab';

type Direction = 'column' | 'row';

const getFirstValidValue = (list: any[] = []) => {
  let value;

  for (const item of list) {
    if (item && 'value' in item && !item.disabled) {
      value = item.value;
      break;
    }
  }

  return value;
};

const scrollToTab = (listNode: HTMLUListElement, activeTabNode: HTMLLIElement, direction: Direction) => {
  if (!listNode || !activeTabNode || typeof listNode.scrollTo !== 'function') {
    return;
  }

  const nodeWidthProp = direction === 'row' ? 'clientWidth' : 'clientHeight';
  const nodeOffsetProp = direction === 'row' ? 'offsetLeft' : 'offsetTop';
  const nodeScrollProp = direction === 'row' ? 'scrollLeft' : 'scrollTop';

  const listWidth = listNode[nodeWidthProp];
  const listScrollLeft = listNode[nodeScrollProp];
  const currentOffsetLeft = activeTabNode[nodeOffsetProp];
  const currentWidth = activeTabNode[nodeWidthProp];

  const isLeftInView = currentOffsetLeft > listScrollLeft;
  const isRightInView = currentWidth + currentOffsetLeft < listWidth + listScrollLeft;
  const isInView = isLeftInView && isRightInView;

  if (!isInView) {
    const distance = !isLeftInView ? listScrollLeft - currentWidth : listScrollLeft + currentWidth;
    listNode.scrollTo({
      top: 0,
      left: distance,
      behavior: 'smooth',
    });
  }
};

export interface UseTabsProps {
  /**
   * 默认选中的 tab
   */
  defaultValue?: string;
  /**
   * 受控选中的 tab
   */
  value?: string;
  /**
   * 选项卡切换时的回调
   */
  onChange?: (nextValue: string) => void;
  /**
   * 对于较小视图，实现满屏等宽效果（仅作用于水平模式）
   */
  fill?: boolean;
  /**
   * 选项卡方向
   */
  direction?: Direction;
  className?: string;
  children?: any;
}

export function useTabs(props: UseTabsProps, tabsRef: React.RefObject<HTMLUListElement>) {
  const { value: valueProp, defaultValue, onChange, children, fill, direction = 'row', className } = props;
  const [scrollbarStyle, setScollbarStyle] = useState<any>();
  const activeRef = useRef<HTMLLIElement>();

  const tabs = useMemo(() => {
    const list: TabProps[] = [];
    React.Children.forEach(children, (child) => {
      if (child) {
        list.push(omit(child.props, ['children']));
      }
    });
    return list;
  }, [children]);

  const [value, updateValue] = useControllableState<any>({
    value: valueProp,
    defaultValue: () => {
      if (isNull(defaultValue)) {
        return getFirstValidValue(tabs) as string;
      }
      return defaultValue;
    },
    onChange,
  });

  useEffect(() => {
    if (activeRef.current) {
      const widthProp = direction === 'row' ? 'offsetWidth' : 'offsetHeight';
      const offsetProp = direction === 'row' ? 'offsetLeft' : 'offsetTop';

      setScollbarStyle({
        '--rex-tabs-scrollbar-width': `${activeRef.current[widthProp]}px`,
        '--rex-tabs-scrollbar-offset': `${activeRef.current[offsetProp]}px`,
      });
      scrollToTab(tabsRef.current, activeRef.current, direction);
    }
  }, [value, tabsRef, direction]);

  // reset tab props
  const tabPropsList = useMemo(() => {
    return tabs.map((item) => {
      const selected = item.selected || value === item.value;
      return {
        ...item,
        ref: selected ? activeRef : undefined,
        selected,
        flex: fill ? '1 0 auto' : '0 0 auto',
        onClick: () => {
          if (item.value !== value) {
            updateValue(item.value);
          }
        },
      };
    });
  }, [tabs, fill, value, updateValue]);

  const rootProps = {
    className: cx(
      {
        'rex-tabs': true,
        [`rex-${direction}`]: direction,
      },
      className,
    ),
  };

  const dividerProps = {
    style: scrollbarStyle,
  };

  const context = {
    value,
  };

  return {
    tabPropsList,
    dividerProps,
    rootProps,
    context,
  };
}
