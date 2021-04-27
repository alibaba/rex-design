import { createGlobalStyle, css } from 'styled-components';
import { OverlayManager } from './OverlayManager';
// TODO 将 d3 移除
import * as d3 from 'd3';

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

const overlayBackground = (props: any) => {
  return props.theme.colorMode === 'dark' ? darkModeOverlayBackground : lightModeOverlayBackground;
};

export const OverlayGlobalStyles = createGlobalStyle`
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

  :root {
    ${overlayBackground};

    --rex-overlay-radius: 8px;
  }
`;
