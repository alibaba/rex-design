import React, { memo, useRef } from 'react';
import { ReactNode } from 'react';
import { PickerColumnItem, PickerValue } from './picker-view';
import { animated, useSpring } from '@react-spring/web';
import { useDrag, useWheel } from '@use-gesture/react';
import type { EventTypes, FullGestureState } from '@use-gesture/react';
import { Box } from '../layout/index';
import isEqual from 'lodash-es/isEqual';
import { supportsPassive } from '../../utils/support-passive';
import { bound } from '../../utils/bound';
import { rubberbandIfOutOfBounds } from '../../utils/rubberband';
import { useIsomorphicLayoutEffect } from '../../hooks';
import { classPrefix, ScrollWheelItem, ScrollWheelWrapper } from './styled';

interface Props {
  index: number;
  column: PickerColumnItem[];
  value: PickerValue;
  onSelect: (value: PickerValue, index: number) => void;
  renderLabel: (item: PickerColumnItem) => ReactNode;
  mouseWheel: boolean;
}

export const ScrollWheel = memo<Props>(
  (props) => {
    const { value: valueProp, column, renderLabel } = props;

    const [{ y }, api] = useSpring(() => ({
      from: { y: 0 },
      config: {
        tension: 400,
        mass: 0.8,
      },
    }));

    const rootRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const itemHeight = useRef<number>(40);

    function onSelect(value: PickerValue) {
      props.onSelect(value, props.index);
    }

    function scrollSelect(index: number) {
      const finalPosition = index * -itemHeight.current;
      api.start({ y: finalPosition });
      const item = column[index];
      if (!item) return;
      onSelect(item.value);
    }

    // useIsomorphicLayoutEffect(() => {
    //   const root = rootRef.current;
    //   if (!root) {
    //     return
    //   }
    //   itemHeight.current = measureCssLength()
    // });

    useIsomorphicLayoutEffect(() => {
      if (isDraggingRef.current) return;
      if (valueProp === null) return;
      const targetIndex = column.findIndex((item) => item.value === valueProp);
      if (targetIndex < 0) return;
      const finalPosition = targetIndex * -itemHeight.current;
      api.start({ y: finalPosition, immediate: y.goal !== finalPosition });
    }, [valueProp, column]);

    useIsomorphicLayoutEffect(() => {
      if (column.length === 0) {
        if (valueProp !== null) {
          onSelect(null);
        }
      } else {
        if (!column.some((item) => item.value === valueProp)) {
          const firstItem = column[0];
          onSelect(firstItem.value);
        }
      }
    }, [column, valueProp]);

    const handleDragOrWheel = (
      state:
        | (Omit<FullGestureState<'wheel'>, 'event'> & {
            event: EventTypes['wheel'];
          })
        | (Omit<FullGestureState<'drag'>, 'event'> & {
            event: EventTypes['drag'];
          }),
    ) => {
      isDraggingRef.current = true;
      const min = -((column.length - 1) * itemHeight.current);
      const max = 0;

      if (state.last) {
        isDraggingRef.current = false;
        const position = state.offset[1] + state.velocity[1] * state.direction[1] * 50;
        const targetIndex = min < max ? -Math.round(bound(position, min, max) / itemHeight.current) : 0;
        scrollSelect(targetIndex);
      } else {
        const position = state.offset[1];
        api.start({
          y: rubberbandIfOutOfBounds(position, min, max, itemHeight.current * 50, 0.2),
        });
      }
    };

    useDrag(
      (state) => {
        state.event.stopPropagation();
        handleDragOrWheel(state);
      },
      {
        axis: 'y',
        from: () => [0, y.get()],
        filterTaps: true,
        pointer: { touch: true },
        target: rootRef,
      },
    );

    useWheel(
      (state) => {
        state.event.stopPropagation();
        handleDragOrWheel(state);
      },
      {
        axis: 'y',
        from: () => [0, y.get()],
        preventDefault: true,
        target: props.mouseWheel ? rootRef : undefined,
        eventOptions: supportsPassive ? { passive: false } : (false as unknown as AddEventListenerOptions),
      },
    );

    let selectedIndex: number | null = null;

    return (
      <ScrollWheelWrapper className={`${classPrefix}-column`}>
        <animated.div ref={rootRef} style={{ translateY: y }} className={`${classPrefix}-column-wheel`}>
          {column.map((item, index) => {
            const selected = valueProp === item.value;
            if (selected) {
              selectedIndex = index;
            }

            function handleClick() {
              isDraggingRef.current = false;
              scrollSelect(index);
            }

            return (
              <ScrollWheelItem
                key={item.key ?? item.value}
                data-selected={item.value === valueProp}
                className={`${classPrefix}-column-item`}
                onClick={handleClick}
              >
                <Box className={`${classPrefix}-column-item-label`}>{renderLabel(item)}</Box>
              </ScrollWheelItem>
            );
          })}
        </animated.div>
      </ScrollWheelWrapper>
    );
  },
  (prev, next) => {
    if (prev.index !== next.index) return false;
    if (prev.value !== next.value) return false;
    if (prev.onSelect !== next.onSelect) return false;
    if (!isEqual(prev.column, next.column)) {
      return false;
    }
    return true;
  },
);
