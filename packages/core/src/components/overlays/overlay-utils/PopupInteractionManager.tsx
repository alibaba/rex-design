import React from 'react';
import { defer, merge, NEVER, Observable, race, Subject, timer } from 'rxjs';
import * as op from 'rxjs/operators';
import { PopupInteractionKind } from '../popup';

type ReactDivMouseEvent = React.MouseEvent<HTMLDivElement>;
type ReactDivFocusEvent = React.FocusEvent<HTMLDivElement>;

const timeout = (ms: number) => timer(ms).pipe(op.mapTo({ type: 'timeout' }));

function hoverTimeout(hoverDelay: number, start$: Observable<HoverInput>, stop$: Observable<HoverInput>) {
  return start$.pipe(
    op.switchMapTo(race(timeout(hoverDelay), stop$)),
    op.filter((result) => result.type === 'timeout'),
    op.mapTo(null as void),
  );
}

type HoverInput =
  | { type: 'click-target'; event: ReactDivMouseEvent }
  | { type: 'enter-target'; event: ReactDivMouseEvent }
  | { type: 'leave-target'; event: ReactDivMouseEvent }
  | { type: 'enter-content'; event: ReactDivMouseEvent }
  | { type: 'leave-content'; event: ReactDivMouseEvent }
  | { type: 'focus-target'; event: ReactDivFocusEvent }
  | { type: 'blur-target'; event: ReactDivFocusEvent };

// 当 targetType=hover 时，鼠标悬停会触发弹层的显示，鼠标移出会触发弹层的隐藏
// 显示/隐藏时存在一定的延迟，涉及大量异步操作，故使用 rxjs 进行处理
export class PopupInteractionManager extends Subject<HoverInput> {
  constructor(
    readonly opts: {
      interactionKind: PopupInteractionKind;
      hoverDelay: number;
      canOpenByFocus: boolean;
      canCloseByBlur: boolean;
    },
    readonly isVisible: () => boolean,
  ) {
    super();
    this.opts = opts;
    this.isVisible = isVisible;
  }

  onTargetFocus = (event: ReactDivFocusEvent) => {
    this.next({ type: 'focus-target', event });
  };

  onTargetBlur = (event: ReactDivFocusEvent) => {
    this.next({ type: 'blur-target', event });
  };

  onTargetClick = (event: ReactDivMouseEvent) => {
    this.next({ type: 'click-target', event });
  };

  onTargetMouseEnter = (event: ReactDivMouseEvent) => {
    this.next({ type: 'enter-target', event });
  };

  onTargetMouseLeave = (event: ReactDivMouseEvent) => {
    this.next({ type: 'leave-target', event });
  };

  onContentMouseEnter = (event: ReactDivMouseEvent) => {
    this.next({ type: 'enter-content', event });
  };

  onContentMouseLeave = (event: ReactDivMouseEvent) => {
    this.next({ type: 'leave-content', event });
  };

  focusTarget$ = this.pipe(op.filter((intent) => intent.type === 'focus-target'));
  blurTarget$ = this.pipe(op.filter((intent) => intent.type === 'blur-target'));
  clickTarget$ = this.pipe(op.filter((intent) => intent.type === 'click-target'));
  enterTarget$ = this.pipe(op.filter((intent) => intent.type === 'enter-target'));
  leaveTarget$ = this.pipe(op.filter((intent) => intent.type === 'leave-target'));
  enter$ = this.pipe(op.filter((intent) => intent.type === 'enter-target' || intent.type === 'enter-content'));
  leave$ = this.pipe(op.filter((intent) => intent.type === 'leave-target' || intent.type === 'leave-content'));

  action$ = defer(() => {
    const { hoverDelay, interactionKind } = this.opts;

    let open$: Observable<any>;
    let close$: Observable<any>;
    if (interactionKind === 'hover') {
      // 每次 enterTarget$ 之后，如果在接下来的 一段时间内 以内鼠标没有移出，则需要触发 popup 的显示
      open$ = hoverTimeout(hoverDelay, this.enter$, this.leave$);
      // 每次 leave$ 触发后，如果在接下来的 150ms 以内鼠标没有移入，则需要触发 popup 的隐藏
      close$ = hoverTimeout(hoverDelay, this.leave$, this.enter$);
    } else if (interactionKind === 'hover-target') {
      open$ = hoverTimeout(hoverDelay, this.enterTarget$, this.leaveTarget$);
      close$ = hoverTimeout(hoverDelay, this.leaveTarget$, this.enterTarget$);
    } else {
      // interactionKind === 'click'
      open$ = this.clickTarget$;
      close$ = this.clickTarget$;
    }

    const openByFocus$ = this.opts.canOpenByFocus
      ? this.focusTarget$.pipe(
          op.filter(() => !this.isVisible()),
          op.map((event) => ({ type: 'open', reason: 'focus' })),
        )
      : NEVER;

    const closeByFocus$ = this.opts.canCloseByBlur
      ? this.blurTarget$.pipe(
          op.filter(() => this.isVisible()),
          op.map((event) => ({ type: 'close', reason: 'blur' })),
        )
      : NEVER;

    return merge(
      openByFocus$,
      closeByFocus$,
      open$.pipe(
        op.filter(() => !this.isVisible()),
        op.map((reason) => ({ type: 'open', reason })),
      ),
      close$.pipe(
        op.filter(() => this.isVisible()),
        op.map((reason) => ({ type: 'close', reason })),
      ),
    );
  });
}
