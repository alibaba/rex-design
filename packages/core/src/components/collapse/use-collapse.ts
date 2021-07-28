import { CSSProperties, useCallback, useRef, useState } from 'react';
import { useEffectAfterMount } from '../../hooks/use-effect-after-mount';
import {
  GetCollapsePropsInput,
  GetCollapsePropsOutput,
  GetTogglePropsInput,
  GetTogglePropsOutput,
  UseCollapseInput,
  UseCollapseOutput,
} from './types';
import { callAll, getElementHeight, mergeRefs, noop, raf } from '../../utils';
import { useControllableState } from '../../hooks';

const easeInOut = 'cubic-bezier(0.4, 0, 0.2, 1)';

// https://github.com/mui-org/material-ui/blob/da362266f7c137bf671d7e8c44c84ad5cfc0e9e2/packages/material-ui/src/styles/transitions.js#L89-L98
function getAutoHeightDuration(height: number | string): number {
  if (!height || typeof height === 'string') {
    return 0;
  }

  const constant = height / 36;

  // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export function useCollapse({
  duration,
  easing = easeInOut,
  collapseStyles = {},
  expandStyles = {},
  onExpandStart = noop,
  onExpandEnd = noop,
  onCollapseStart = noop,
  onCollapseEnd = noop,
  isExpanded: isExpandedProp,
  defaultExpanded = false,
  ...initialConfig
}: UseCollapseInput = {}): UseCollapseOutput {
  const [isExpanded, setExpanded] = useControllableState({
    value: isExpandedProp,
    defaultValue: defaultExpanded,
  });
  const el = useRef<HTMLElement>(null);

  const collapsedHeight = `${initialConfig.collapsedHeight || 0}px`;
  const collapsedStyles = {
    display: collapsedHeight === '0px' ? 'none' : 'block',
    height: collapsedHeight,
    overflow: 'hidden',
  };

  const [styles, setStyles] = useState<CSSProperties>(isExpanded ? {} : collapsedStyles);

  const mergeStyles = useCallback((newStyles: {}): void => {
    setStyles((oldStyles) => ({ ...oldStyles, ...newStyles }));
  }, []);

  function getTransitionStyles(height: number | string): { transition: string } {
    const _duration = duration || getAutoHeightDuration(height);
    return {
      transition: `height ${_duration}ms ${easing}`,
    };
  }

  useEffectAfterMount(() => {
    if (isExpanded) {
      raf(() => {
        onExpandStart();
        mergeStyles({
          ...expandStyles,
          willChange: 'height',
          display: 'block',
          overflow: 'hidden',
        });
        raf(() => {
          const height = getElementHeight(el);
          console.log('height', height);
          mergeStyles({
            ...getTransitionStyles(height),
            height,
          });
        });
      });
    } else {
      raf(() => {
        onCollapseStart();
        const height = getElementHeight(el);
        mergeStyles({
          ...collapseStyles,
          ...getTransitionStyles(height),
          willChange: 'height',
          height,
        });
        raf(() => {
          mergeStyles({
            height: collapsedHeight,
            overflow: 'hidden',
          });
        });
      });
    }
  }, [isExpanded]);

  const handleTransitionEnd = (e: TransitionEvent): void => {
    // Sometimes onTransitionEnd is triggered by another transition,
    // such as a nested collapse panel transitioning. But we only
    // want to handle this if this component's element is transitioning
    if (e.target !== el.current || e.propertyName !== 'height') {
      return;
    }

    // The height comparisons below are a final check before
    // completing the transition
    // Sometimes this callback is run even though we've already begun
    // transitioning the other direction
    // The conditions give us the opportunity to bail out,
    // which will prevent the collapsed content from flashing on the screen
    if (isExpanded) {
      const height = getElementHeight(el);

      // If the height at the end of the transition
      // matches the height we're animating to,
      if (height === styles.height) {
        setStyles({});
      } else {
        // If the heights don't match, this could be due the height
        // of the content changing mid-transition
        mergeStyles({ height });
      }

      onExpandEnd();

      // If the height we should be animating to matches the collapsed height,
      // it's safe to apply the collapsed overrides
    } else if (styles.height === collapsedHeight) {
      setStyles(collapsedStyles);
      onCollapseEnd();
    }
  };

  function getToggleProps({
    disabled = false,
    onClick = noop,
    ...rest
  }: GetTogglePropsInput = {}): GetTogglePropsOutput {
    return {
      tabIndex: 0,
      disabled,
      ...rest,
      onClick: disabled ? noop : callAll(onClick, () => setExpanded((n) => !n)),
    };
  }

  function getCollapseProps({
    style = {},
    onTransitionEnd = noop,
    refKey = 'ref',
    ...rest
  }: GetCollapsePropsInput = {}): GetCollapsePropsOutput {
    const theirRef: any = rest[refKey];
    return {
      ...rest,
      [refKey]: mergeRefs(el, theirRef),
      onTransitionEnd: callAll(handleTransitionEnd, onTransitionEnd),
      style: {
        boxSizing: 'border-box',
        // additional styles passed, e.g. getCollapseProps({style: {}})
        ...style,
        // style overrides from state
        ...styles,
      },
    };
  }

  return {
    getToggleProps,
    getCollapseProps,
    isExpanded,
    setExpanded,
  };
}
