import * as React from 'react';

export interface Disposable {
  dispose(): void;
}

// animate.css CSS 类名前缀
// 详见 https://animate.style/
export const ANIMATE_PREFIX = 'animate__';
export const ANIMATE_ANIMATED = `animate__animated`;

function startNullAnimate(element: Element, onEnd: (event: AnimationEvent) => void) {
  const handle = requestAnimationFrame(() => onEnd(null));

  return {
    dispose() {
      cancelAnimationFrame(handle);
    },
  };
}

// 利用 className 为元素添加指定名称的 CSS 动画（animation），并在动画结束后自动移除动画的 className
export function startAnimate(
  element: Element,
  animation: null | string,
  onEnd: (event: AnimationEvent) => void,
): Disposable {
  if (animation == null) {
    // 用户禁用了动画，为了保持 onEnd 的调用时机一致
    // 这里将调用 startNullAnimate，该函数内部会等待一个动画帧来表示「动画的过程」
    return startNullAnimate(element, onEnd);
  }

  const animateClassName = `${ANIMATE_PREFIX}${animation}`;

  element.classList.add(ANIMATE_ANIMATED, animateClassName);
  element.addEventListener('animationend', handleAnimationEnd);

  function dispose() {
    element.classList.remove(ANIMATE_ANIMATED, animateClassName);
    element.removeEventListener('animationend', handleAnimationEnd);
  }

  function handleAnimationEnd(_e: Event) {
    const event = _e as AnimationEvent;

    if (event.target === element && Array.from(element.classList).includes(animateClassName)) {
      dispose();
      onEnd(event);
    }
  }

  return { dispose };
}
