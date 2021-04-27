import React from 'react';
import { Observable } from 'rxjs';
import { Keyframes } from 'styled-components';

export interface Disposable {
  dispose(): void;
}

// animate.css CSS 类名前缀
// 详见 https://animate.style/
export const ANIMATE_PREFIX = 'animate__';
export const ANIMATE_ANIMATED = `${ANIMATE_PREFIX}animated`;

function startSimpleAnimate(element: Element, onEnd: (event: AnimationEvent) => void) {
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
  animation: null | string | Keyframes,
  onEnd: (event: AnimationEvent) => void,
): Disposable {
  if (animation == null) {
    // 用户禁用了动画，为了保持 onEnd 的调用时机一致
    // 这里将调用 startSimpleAnimate，该函数内部会等待一个动画帧来表示「动画的过程」
    return startSimpleAnimate(element, onEnd);
  }

  if (typeof animation === 'object') {
    animation = animation.getName();
  }
  element.classList.add(ANIMATE_ANIMATED, `${ANIMATE_PREFIX}${animation}`);
  element.addEventListener('animationend', handleAnimationEnd);

  function dispose() {
    element.classList.remove(ANIMATE_ANIMATED, `${ANIMATE_PREFIX}${animation}`);
    element.removeEventListener('animationend', handleAnimationEnd);
  }

  function handleAnimationEnd(_e: Event) {
    const event = _e as AnimationEvent;
    if (event.target === element && event.animationName === animation) {
      dispose();
      onEnd(event);
    }
  }

  return { dispose };
}

export const animationFrame$ = new Observable<number>((subscriber) => {
  let handle: number;

  const callback = (arg: number) => {
    subscriber.next(arg);
    handle = requestAnimationFrame(callback);
  };

  callback(performance.now());

  return () => {
    cancelAnimationFrame(handle);
  };
});
