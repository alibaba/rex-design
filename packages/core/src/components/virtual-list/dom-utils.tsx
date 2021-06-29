import { SideObject } from '@popperjs/core';

// todo 文件重构

// todo 从 @popperjs/core/lib/dom-utils/* 引入了太多 API，可以去掉没用到的 API
import getClippingRect from '@popperjs/core/lib/dom-utils/getClippingRect';
import getCompositeRect from '@popperjs/core/lib/dom-utils/getCompositeRect';
import getComputedStyle from '@popperjs/core/lib/dom-utils/getComputedStyle';
import getDocumentElement from '@popperjs/core/lib/dom-utils/getDocumentElement';
import getDocumentRect from '@popperjs/core/lib/dom-utils/getDocumentRect';
import getHTMLElementScroll from '@popperjs/core/lib/dom-utils/getHTMLElementScroll';
import getLayoutRect from '@popperjs/core/lib/dom-utils/getLayoutRect';
import getNodeName from '@popperjs/core/lib/dom-utils/getNodeName';
import getNodeScroll from '@popperjs/core/lib/dom-utils/getNodeScroll';
import getOffsetParent from '@popperjs/core/lib/dom-utils/getOffsetParent';
import getParentNode from '@popperjs/core/lib/dom-utils/getParentNode';
import getViewportRect from '@popperjs/core/lib/dom-utils/getViewportRect';
import getWindow from '@popperjs/core/lib/dom-utils/getWindow';
import getWindowScroll from '@popperjs/core/lib/dom-utils/getWindowScroll';
import getWindowScrollBarX from '@popperjs/core/lib/dom-utils/getWindowScrollBarX';
import { isHTMLElement } from '@popperjs/core/lib/dom-utils/instanceOf';
import isScrollParent from '@popperjs/core/lib/dom-utils/isScrollParent';
import listScrollParents from '@popperjs/core/lib/dom-utils/listScrollParents';
import ResizeObserver from 'resize-observer-polyfill';
import { fromEvent, merge, Observable } from 'rxjs';
import * as op from 'rxjs/operators';

function isWindow(arg: object): arg is Window {
  return arg.toString() === '[object Window]';
}

function isBody(arg: Node): arg is HTMLBodyElement {
  return getNodeName(arg) === 'body';
}

function isHtml(arg: Node): arg is HTMLHtmlElement {
  return getNodeName(arg) === 'html';
}

function isBodyOrHtml(arg: Node) {
  return isBody(arg) || isHtml(arg);
}

// 计算从 start（子元素）到 stop（祖先元素）之间所有元素的 scrollTop 或 scrollLeft 的和
// 注意 start 和 stop 都是 INCLUSIVE 的，即两者的 scrollTop 或 scrollLeft 都会统计在内
function accumulateScrollOffset(
  start: HTMLElement,
  stop: Window | HTMLElement,
  scrollOffsetKey: 'scrollLeft' | 'scrollTop',
) {
  let result = 0;
  let elem = start;
  while (elem != null) {
    result += elem[scrollOffsetKey];
    if (elem === stop || (isWindow(stop) && isBodyOrHtml(elem))) {
      break;
    }
    elem = elem.parentElement;
  }

  if (isWindow(stop)) {
    result += getWindowScroll(elem)[scrollOffsetKey];
  }
  return result;
}

/**
 * 获取 target 相对于 base 的布局大小和相对位置。
 * 注意该方法会考虑滚动所带来的影响
 */
function getRelativeLayoutRect(base: HTMLElement | Window, target: HTMLElement | Window): Readonly<SideObject> {
  if (isWindow(target) || getNodeName(target) === 'html') {
    return {
      left: 0,
      right: window.innerWidth,
      top: 0,
      bottom: window.innerHeight,
    };
  }

  let deltaX = 0;
  let deltaY = 0;

  let elem = target;
  while (elem != null && elem != base) {
    deltaY += elem.offsetTop;
    deltaX += elem.offsetLeft;

    const offsetParent = getOffsetParent(elem) as HTMLElement | Window;
    deltaY -= accumulateScrollOffset(elem.parentElement, offsetParent, 'scrollTop');
    deltaX -= accumulateScrollOffset(elem.parentElement, offsetParent, 'scrollLeft');

    if (isWindow(offsetParent)) {
      break;
    }

    deltaY += offsetParent.clientTop;
    deltaX += offsetParent.clientLeft;

    elem = offsetParent;
  }

  return {
    top: deltaY,
    bottom: deltaY + target.offsetHeight,
    left: deltaX,
    right: deltaX + target.offsetWidth,
  };
}

function findCommonOffsetAncestor(target: HTMLElement, scrollParent: HTMLElement | Window): HTMLElement | Window {
  if (isWindow(scrollParent)) {
    return scrollParent;
  }
  const offsetParents = listOffsetParents(target);
  if (offsetParents.includes(scrollParent)) {
    return scrollParent;
  }
  return getOffsetParent(scrollParent);
}

function getBoundingClientRect(target: HTMLElement | Window) {
  if (domUtils.isWindow(target)) {
    return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  } else {
    return target.getBoundingClientRect();
  }
}

// 列出 target 元素上层的所有 offset parents
function listOffsetParents(target: Element | Window) {
  const result: Array<Element | Window> = [];

  let elem = target;
  while (true) {
    if (isWindow(elem)) {
      break;
    }
    elem = getOffsetParent(elem);
    result.push(elem);
  }

  return result;
}

function fromScrollEvent(element: HTMLElement | Window) {
  return fromEvent(element, 'scroll');
}

function fromPassiveScrollEvent(element: HTMLElement | Window) {
  return fromEvent(element, 'scroll', { passive: true });
}

function fromResizeEvent(element: HTMLElement | Window): Observable<Event | ResizeObserverEntry[]> {
  if (isWindow(element)) {
    return fromEvent<Event>(element, 'resize');
  }

  return new Observable((subscriber) => {
    const resizeObserver = new ResizeObserver((entries: any[]) => {
      subscriber.next(entries);
    });
    resizeObserver.observe(element as HTMLElement);

    return () => {
      resizeObserver.disconnect();
    };
  });
}

function getScrollParent(elem: HTMLElement): HTMLElement | Window {
  if (['html', 'body', '#document'].includes(getNodeName(elem))) {
    return getWindow(elem);
  }

  if (isHTMLElement(elem) && isScrollParent(elem)) {
    return elem;
  }

  return getScrollParent(getParentNode(elem) as HTMLElement);
}

// 获取 target 相对于「它的滚动父元素」的可见部分的大小与位置
function getRichVisibleRectsStream(target: HTMLElement) {
  // todo 需要考虑 scrollParent/commonOffsetAncestor 动态发生变化的情况

  // target 的第一个滚动父元素，我们认为这就是虚拟滚动发生的地方
  // 即虚拟滚动不考虑「更上层元素发生滚动」的情况
  const scrollParent: HTMLElement | Window = getScrollParent(target);

  // target 和 scrollParent 的共同 offset 祖先，作为布局尺寸计算时的参照元素
  const commonOffsetAncestor: HTMLElement | Window = findCommonOffsetAncestor(target, scrollParent);

  return merge(fromScrollEvent(scrollParent), fromResizeEvent(scrollParent), fromResizeEvent(target)).pipe(
    op.map(() => ({
      targetRect: getRelativeLayoutRect(commonOffsetAncestor, target),
      scrollParentRect: getRelativeLayoutRect(commonOffsetAncestor, scrollParent),
    })),
    op.map(({ scrollParentRect, targetRect }) => ({
      targetRect,
      scrollParentRect,
      offsetY: Math.max(0, scrollParentRect.top - targetRect.top),
      offsetX: Math.max(0, scrollParentRect.left - targetRect.left),
      clipRect: {
        left: Math.max(targetRect.left, scrollParentRect.left),
        top: Math.max(targetRect.top, scrollParentRect.top),
        right: Math.min(targetRect.right, scrollParentRect.right),
        bottom: Math.min(targetRect.bottom, scrollParentRect.bottom),
      },
    })),
  );
}

// 应用一个滚动偏移量.
// 示例：调用 applyScrollDelta(scrollParent, 30) ，滚动容器的 scrollTop 从 20 变为 50
function applyScrollDelta(scrollParent: HTMLElement | Window, delta: number) {
  if (delta === 0) {
    return;
  }

  if (isWindow(scrollParent)) {
    scrollParent.scrollTo(scrollParent.scrollX, scrollParent.scrollY + delta);
  } else {
    scrollParent.scrollTop += delta;
  }
}

export const domUtils = {
  getClippingRect,
  getCompositeRect,
  getComputedStyle,
  getDocumentElement,
  getDocumentRect,
  getHTMLElementScroll,
  getLayoutRect,
  getNodeName,
  getNodeScroll,
  getOffsetParent: getOffsetParent as (element: Element) => Element | Window,
  getParentNode,
  getScrollParent,
  getViewportRect,
  getWindow: getWindow as (node: Node) => Window,
  getWindowScroll,
  getWindowScrollBarX,
  isScrollParent,
  listScrollParents,

  // 上面部分是 popper.js 免费赠送的，下面几个是自己根据虚拟滚动的需求实现的
  isWindow,
  isHtml,
  isBody,
  isBodyOrHtml,
  getRelativeLayoutRect,
  findCommonOffsetAncestor,
  getRichVisibleRectsStream,
  applyScrollDelta,
  fromScrollEvent,
  fromPassiveScrollEvent,
  fromResizeEvent,
  accumulateScrollOffset,
  getBoundingClientRect,
};
