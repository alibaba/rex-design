import { HTMLAttributes, useMemo, useState, useRef } from 'react';

export interface HoverEvent {
  type: 'hoverstart' | 'hoverend';
  pointerType: 'mouse' | 'pen' | 'touch';
  target: HTMLElement;
}

export interface UseHoverProps {
  onHoverStart?: (e: HoverEvent) => void;
  onHoverEnd?: (e: HoverEvent) => void;
  onHoverChange?: (isHover: boolean) => void;
  disabled?: boolean;
}

export function useHover(props: UseHoverProps) {
  const { onHoverStart, onHoverChange, onHoverEnd, disabled } = props;

  const [isHover, setHover] = useState(false);

  const state = useRef({
    isHover: false,
  }).current;

  const hoverProps = useMemo(() => {
    const handleHoverStart = (e: any, pointerType: any) => {
      // if (disabled || pointerType === 'touch' || state.isHover) {
      if (disabled || state.isHover) {
        return;
      }

      state.isHover = true;

      if (onHoverStart) {
        onHoverStart({
          type: 'hoverstart',
          target: e.target,
          pointerType,
        });
      }

      if (onHoverChange) {
        onHoverChange(true);
      }

      setHover(true);
    };

    const handleHoverEnd = (e: any, pointerType: any) => {
      // if (pointerType === 'touch' || !state.isHover) {
      if (!state.isHover) {
        return;
      }

      state.isHover = false;

      if (onHoverEnd) {
        onHoverEnd({
          type: 'hoverend',
          target: e.target,
          pointerType,
        });
      }

      if (onHoverChange) {
        onHoverChange(false);
      }

      setHover(false);
    };

    const hoverProps: HTMLAttributes<HTMLElement> = {};
    if (typeof PointerEvent !== 'undefined') {
      hoverProps.onPointerEnter = (e) => {
        handleHoverStart(e, e.pointerType);
      };

      hoverProps.onPointerLeave = (e) => {
        handleHoverEnd(e, e.pointerType);
      };
    } else {
      hoverProps.onMouseEnter = (e) => {
        handleHoverStart(e, 'mouse');
      };

      hoverProps.onMouseLeave = (e) => {
        handleHoverEnd(e, 'mouse');
      };
    }

    return hoverProps;
  }, [onHoverStart, onHoverEnd, onHoverChange, disabled, state]);

  return {
    isHover,
    hoverProps,
  };
}
