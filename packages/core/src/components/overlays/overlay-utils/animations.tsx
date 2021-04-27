import { createGlobalStyle, css, Keyframes, keyframes } from 'styled-components';

type KeyframesDict = {
  [name: string]: Keyframes;
};

// 根据「多个 styled-components 的动画效果」 生成 <GlobalStyle />
function generateGlobalStylesFromKeyframesDict(dict: KeyframesDict) {
  const parts = Object.keys(dict).map((name) => {
    // 生成的 CSS 选择器兼容 animate.css， 详见 https://animate.style/#usage
    // 这样用户引入 animate.css 后可以采用「相同用法」来使用额外的动画效果
    const cssSelector = `.animate__animated.animate__${dict[name].getName()}`;
    return css`
      ${cssSelector} {
        animation-name: ${dict[name]};
        animation-duration: var(--animate-duration, 200ms);
        animation-delay: var(--animate-delay, 0s);
        animation-timing-function: cubic-bezier(0.4, 1, 0.75, 0.9);
      }
    `;
  });

  return createGlobalStyle(
    // 手动构造模板字符串
    new Array(parts.length + 1).fill('') as any,
    ...parts,
  );
}

const linearZoomIn = keyframes`
  from {
    animation-timing-function: ease;
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
  }

  to {
    animation-timing-function: ease;
    opacity: 1;
  }
`;

const linearZoomOut = keyframes`
  from {
    animation-timing-function: ease;
    opacity: 1;
  }

  to {
    animation-timing-function: ease;
    transform: scale3d(0.8, 0.8, 0.8);
    opacity: 0;
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
  }

  50% {
    opacity: 1;
  }
`;

const zoomOut = keyframes`
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
  }

  to {
    opacity: 0;
  }
`;

const expandInDown = keyframes`
  from {
    transform: scaleY(0.8);
    transform-origin: 0 0;
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    transform-origin: 0 0;
    opacity: 1;
  }
`;

const expandOutUp = keyframes`
 from {
   transform: scaleY(1);
   transform-origin: top;
   opacity: 1;
 }

 to {
   transform: scaleY(0.8);
   transform-origin: top;
   opacity: 0;
 }
`;

const expandInRight = keyframes`
  from {
    transform: scaleX(0.8);
    transform-origin: 0 0;
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    transform-origin: 0 0;
    opacity: 1;
  }
`;

const expandOutLeft = keyframes`
 from {
   transform: scaleY(1);
   transform-origin: top;
   opacity: 1;
 }

 to {
   transform: scaleY(0.8);
   transform-origin: top;
   opacity: 0;
 }
`;

const expandInLeft = keyframes`
  from {
    transform: scaleX(0.8);
    transform-origin: right top;
    opacity: 0;
  }

  to {
    transform: scaleX(1);
    transform-origin: right top;
    opacity: 1;
  }
`;

const expandOutRight = keyframes`
 from {
   transform: scaleX(1);
   transform-origin: right top;
   opacity: 1;
 }

 to {
   transform: scaleX(0.8);
   transform-origin: right top;
   opacity: 0;
 }
`;

const expandInUp = keyframes`
  from {
    transform: scaleY(0.8);
    transform-origin: center bottom;
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    transform-origin: center bottom;
    opacity: 1;
  }
`;

const expandOutDown = keyframes`
 from {
   transform: scaleY(1);
   transform-origin: center bottom;
   opacity: 1;
 }

 to {
   transform: scaleY(0.8);
   transform-origin: center bottom;
   opacity: 0;
 }
`;

const slideInRight = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutLeft = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(-100%, 0, 0);
  }
`;

const slideInTop = keyframes`
  from {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutTop = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, -100%, 0);
  }
`;

const slideInBottom = keyframes`
  from {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutBottom = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -20%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const fadeOutUp = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -20%, 0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-20%, 0 , 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const fadeOutRight = keyframes`
  from {
    opacity: 1;
    transform: translate3d(0, 0 , 0);
  }

  to {
    opacity: 0;
    transform: translate3d(20%, 0, 0);
  }
`;

const bounceInRight = keyframes`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(500px, 0, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }

  75% {
    transform: translate3d(10px, 0, 0);
  }

  90% {
    transform: translate3d(-5px, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const bounceOutRight = keyframes`
  20% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(500px, 0, 0);
  }
`;

const bounceInLeft = keyframes`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(-500px, 0, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }

  75% {
    transform: translate3d(-10px, 0, 0);
  }

  90% {
    transform: translate3d(5px, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }`;

const bounceOutLeft = keyframes`
  20% {
    opacity: 1;
    transform: translate3d(20px, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(-500px, 0, 0);
  }
`;

const bounceInUp = keyframes`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(0, 500px, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }

  75% {
    transform: translate3d(0, 10px, 0);
  }

  90% {
    transform: translate3d(0, -5px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const bounceOutUp = keyframes`
  20% {
    transform: translate3d(0, -10px, 0);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, 20px, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0, -500px, 0);
  }
`;

const bounceInDown = keyframes`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -500px, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }

  75% {
    transform: translate3d(0, -10px, 0);
  }

  90% {
    transform: translate3d(0, 5px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const bounceOutDown = keyframes`
  20% {
    transform: translate3d(0, 10px, 0);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0, 500px, 0);
  }
`;

const zeroHeight = keyframes`
  from {
    animation-timing-function: linear;
  }

  to {
    animation-timing-function: linear;
    height: 0;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

export const animations = {
  // zoom
  linearZoomIn,
  linearZoomOut,
  zoomIn,
  zoomOut,

  // expand
  expandInDown,
  expandOutUp,
  expandInRight,
  expandOutLeft,
  expandInLeft,
  expandOutRight,
  expandInUp,
  expandOutDown,

  // slide
  slideInRight,
  slideOutRight,
  slideInLeft,
  slideOutLeft,
  slideInTop,
  slideOutTop,
  slideInBottom,
  slideOutBottom,

  // fade
  fadeIn,
  fadeOut,
  fadeInDown,
  fadeOutUp,
  fadeInLeft,
  fadeOutRight,

  // bounce
  bounceInRight,
  bounceOutRight,
  bounceInLeft,
  bounceOutLeft,
  bounceInUp,
  bounceOutUp,
  bounceInDown,
  bounceOutDown,

  // others
  zeroHeight,
};

export const OverlayAnimationStyles = generateGlobalStylesFromKeyframesDict(animations);
