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

export interface TooltipProps
  extends Pick<
      PopupProps,
      'interactionKind' | 'flip' | 'placement' | 'renderTarget' | 'visible' | 'onRequestOpen' | 'onRequestClose'
    >,
    IOverlayLifecycles {
  /** 提示内容 */
  title?: React.ReactNode;

  /** 正文内容 */
  children?: React.ReactNode;
}

export function Tooltip({
  children,
  title,
  flip,
  interactionKind = 'hover',
  placement = 'top',
  ...others
}: TooltipProps) {
  return (
    <Popup
      animation={animation}
      animationDuration="100ms"
      hasArrow
      flip={flip}
      interactionKind={interactionKind}
      placement={placement}
      hoverDelay={60}
      target={children}
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
