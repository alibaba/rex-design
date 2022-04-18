import * as d3 from 'd3-color';
import { createGlobalStyle, css } from 'styled-components';
import { ColorMode } from '../../../providers';
import { OverlayManager } from './OverlayManager';

const ARROW_SIZE = 10;

function alpha(input: string, alphaValue: number) {
  const c = d3.color(input);
  c.opacity *= alphaValue;
  return c.toString();
}

/** 根据 背景色（不带透明度）和前景色（可以带透明度） 计算出 最终渲染的颜色（不带透明度） */
function getRenderColor(backgroundColor: string, foregroundColor: string) {
  const back = d3.rgb(backgroundColor);
  const fore = d3.rgb(foregroundColor);

  return d3
    .rgb(
      back.r + (fore.r - back.r) * fore.opacity,
      back.g + (fore.g - back.g) * fore.opacity,
      back.b + (fore.b - back.b) * fore.opacity,
    )
    .formatHex();
}

function whiten(c: string, rate: number) {
  return getRenderColor(c, alpha('white', rate));
}

const lightModeOverlayBackground = css`
  --rex-overlay-depth-0: white;
  --rex-overlay-depth-1: white;
  --rex-overlay-depth-2: white;
  --rex-overlay-depth-3: white;
  --rex-overlay-depth-4: white;
  --rex-overlay-depth-6: white;
  --rex-overlay-depth-8: white;
  --rex-overlay-depth-12: white;
  --rex-overlay-depth-16: white;
  --rex-overlay-depth-24: white;

  --rex-overlay-depth-s: white;
  --rex-overlay-depth-m: white;
  --rex-overlay-depth-l: white;
  --rex-overlay-depth-xl: white;
`;

const darkModeOverlayBackground = css`
  --rex-overlay-depth-0: ${whiten('#141414', 0)};
  --rex-overlay-depth-1: ${whiten('#141414', 0.05)};
  --rex-overlay-depth-2: ${whiten('#141414', 0.07)};
  --rex-overlay-depth-3: ${whiten('#141414', 0.08)};
  --rex-overlay-depth-4: ${whiten('#141414', 0.09)};
  --rex-overlay-depth-6: ${whiten('#141414', 0.11)};
  --rex-overlay-depth-8: ${whiten('#141414', 0.12)};
  --rex-overlay-depth-12: ${whiten('#141414', 0.14)};
  --rex-overlay-depth-16: ${whiten('#141414', 0.15)};
  --rex-overlay-depth-24: ${whiten('#141414', 0.16)};

  // 背景层 0
  // --rex-overlay-depth-0
  // 框架层 4
  --rex-overlay-depth-s: var(--rex-overlay-depth-4);
  // 悬浮层 8
  --rex-overlay-depth-m: var(--rex-overlay-depth-8);
  // 抽屉层 16
  --rex-overlay-depth-l: var(--rex-overlay-depth-16);
  // 对话框 24
  --rex-overlay-depth-xl: var(--rex-overlay-depth-24);
`;

const drawerPlacementsMixin = css`
  &[data-placement='right'] {
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;
    width: 400px;
    max-width: 80%;
    box-shadow: var(--rex-shadows-lowLeft);
  }

  &[data-placement='left'] {
    width: 400px;
    max-width: 80%;
    top: 0;
    right: auto;
    bottom: 0;
    left: 0;
    box-shadow: var(--rex-shadows-lowRight);
  }

  &[data-placement='top'] {
    height: 400px;
    max-height: 80%;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    box-shadow: var(--rex-shadows-lowDown);
  }

  &[data-placement='bottom'] {
    height: 400px;
    max-height: 80%;
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: var(--rex-shadows-lowUp);
  }
`;

const drawerStyles = css`
  .rex-drawer {
    position: fixed;
    background: var(--rex-overlay-depth-l);
    overflow: hidden;
    display: flex;
    flex-direction: column;

    ${drawerPlacementsMixin};
  }

  .rex-drawer-close.rex-drawer-close {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .rex-drawer-close-icon {
    display: block;
    color: var(--rex-colors-emphasis-60);
    cursor: pointer;

    &:hover {
      color: var(--rex-colors-emphasis-80);
    }
  }

  .rex-drawer-header {
    flex: 0 0 auto;
    font-size: var(--rex-fontSizes-title);
    font-weight: bold;
    padding: 12px 16px;
    border-bottom: 1px solid var(--rex-colors-emphasis-30);
    color: var(--rex-colors-text-title);
  }

  .rex-drawer-body {
    flex: auto;
    font-size: var(--rex-fontSizes-body);
    padding: 16px;
    overflow: auto;
    color: var(--rex-colors-text-body);
  }

  .rex-drawer-footer {
    flex: 0 0 auto;
    border-top: 1px solid var(--rex-colors-emphasis-30);
    display: flex;
    justify-content: center;
    padding: 12px;
  }
`;

const dialogStyles = css`
  .rex-dialog {
    // 400px 为默认宽度，实际宽度可以被 style.width 覆盖
    width: 400px;
    max-width: 70%;
  }

  .rex-dialog-header {
    font-size: var(--rex-fontSizes-title);
    margin: 12px 16px;
    color: var(--rex-colors-text-title);
  }

  .rex-dialog-body {
    font-size: var(--rex-fontSizes-body);
    margin: 12px 16px;
    color: var(--rex-colors-text-body);
  }

  .rex-dialog-footer {
    display: flex;
    margin: 12px 16px;
    justify-content: flex-end;

    > * {
      margin-left: 8px;
    }
  }

  .rex-dialog-close.rex-dialog-close {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--rex-colors-emphasis-50);
    cursor: pointer;

    &:hover {
      color: #333;
    }
  }
`;

const popupStyles = css`
  span.rex-popup-target {
    display: inline-block;
  }

  .rex-popup-arrow {
    user-select: none;

    &::before {
      content: '';
      position: absolute;
      width: ${ARROW_SIZE}px;
      height: ${ARROW_SIZE}px;
      transform-origin: center center;
      transform: translate(-50%, -50%) rotate(45deg);
      background: var(--rex-popup-arrow-color, var(--rex-overlay-depth-m));
    }

    &[data-popper-placement^='top']::before {
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.06);
    }
    &[data-popper-placement^='right']::before {
      box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.06);
    }
    &[data-popper-placement^='bottom']::before {
      box-shadow: -2px -2px 3px 0 rgba(0, 0, 0, 0.06);
    }
    &[data-popper-placement^='left']::before {
      box-shadow: 2px -2px 3px 0 rgba(0, 0, 0, 0.06);
    }
  }
`;

export const OverlayGlobalStyles = createGlobalStyle<{ colorMode: ColorMode }>`
  .${OverlayManager.REX_OVERFLOW_HIDDEN_CLS} {
    overflow: hidden;
  }

  .${OverlayManager.REX_OVERFLOW_FORCE_HIDDEN_CLS} {
    overflow: hidden !important;
  }

  // 禁用正在移除的浮层上的鼠标交互
  .rex-overlay-wrapper.exiting {
    pointer-events: none;
  }

  .rex-overlay-inner {
    z-index: 1000;
  }

  // TODO 这个样式需要重新验证一下
  .rex-popup-content {
    position: absolute;
    z-index: 1000;
  }

  .rex-overlay-backdrop {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
    user-select: none;
    box-shadow: var(--rex-shadows-lowDown);
  }

  .rex-fullscreen-popup-panel {
    min-width: 70%;
    max-width: 90%;
  }

  ${dialogStyles};

  ${drawerStyles};

  ${popupStyles};

  :root {
    ${(props) => (props.colorMode === 'dark' ? darkModeOverlayBackground : lightModeOverlayBackground)};
  }
`;
