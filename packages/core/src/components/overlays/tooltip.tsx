import React from 'react';
import styled from 'styled-components';
import { Overlay } from './overlay';
import { Popup, PopupProps } from './popup';

// TODO 改为白色背景
const TooltipDiv = styled.div.withConfig({ componentId: 'rex-tooltip' })`
  --rex-popup-bgcolor: #353535;
  font-size: var(--rex-fontSizes-body);
  color: white;
  border-radius: 2px;
  padding: 8px;
  transform-origin: var(--rex-popup-arrow-position);
`;

export type TooltipProps = Omit<PopupProps, 'animation' | 'animationDict'>;

const animation = {
  in: Overlay.animations.linearZoomIn,
  out: Overlay.animations.linearZoomOut,
};

export function Tooltip({
  hasArrow = true,
  triggerType = 'hover',
  placement = 'top',
  hoverDelay = 60,
  animationDuration = '100ms',
  ...others
}: TooltipProps) {
  return (
    <Popup
      {...others}
      animation={animation}
      animationDuration={animationDuration}
      hasArrow={hasArrow}
      triggerType={triggerType}
      placement={placement}
      hoverDelay={hoverDelay}
      renderChildren={({ children, ref, arrow }) => (
        <TooltipDiv ref={ref as React.RefObject<HTMLDivElement>} /* todo style? className? */>
          {arrow}
          {children}
        </TooltipDiv>
      )}
    />
  );
}
