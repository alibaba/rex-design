import React from 'react';
import styled from 'styled-components';
import { IOverlayLifecycles, Overlay } from './overlay';
import { Popup, PopupProps } from './popup';

const TooltipDiv = styled.div.withConfig({ componentId: 'rex-tooltip' })`
  font-size: var(--rex-fontSizes-body);
  border-radius: 2px;
  padding: 8px;
  transform-origin: var(--rex-popup-arrow-position);
  box-shadow: var(--rex-shadows-lowDown);
`;

const animation = {
  in: Overlay.animations.linearZoomIn,
  out: Overlay.animations.linearZoomOut,
};

interface TooltipProps
  extends Pick<
      PopupProps,
      'triggerType' | 'flip' | 'placement' | 'renderTrigger' | 'visible' | 'onRequestOpen' | 'onRequestClose'
    >,
    IOverlayLifecycles {
  /** 提示内容 */
  title?: React.ReactNode;

  /** 正文内容 */
  children?: React.ReactNode;
}

export function Tooltip({ children, title, flip, triggerType = 'hover', placement = 'top', ...others }: TooltipProps) {
  return (
    <Popup
      animation={animation}
      animationDuration="100ms"
      hasArrow
      flip={flip}
      triggerType={triggerType}
      placement={placement}
      hoverDelay={60}
      trigger={children}
      {...others}
      renderChildren={({ ref, arrow }) => (
        <TooltipDiv ref={ref as React.RefObject<HTMLDivElement>}>
          {arrow}
          {title}
        </TooltipDiv>
      )}
    />
  );
}
