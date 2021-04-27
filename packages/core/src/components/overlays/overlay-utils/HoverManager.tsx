import React from 'react';
import { defer, race, Subject, timer } from 'rxjs';
import * as op from 'rxjs/operators';

type ReactDivMouseEvent = React.MouseEvent<HTMLDivElement>;

const timeout = (ms: number) => timer(ms).pipe(op.mapTo({ type: 'timeout' }));

type HoverInput =
  | { type: 'enter-trigger'; event: ReactDivMouseEvent }
  | { type: 'leave-trigger'; event: ReactDivMouseEvent }
  | { type: 'enter-content'; event: ReactDivMouseEvent }
  | { type: 'leave-content'; event: ReactDivMouseEvent };

// 当 triggerType=hover 时，鼠标悬停会触发弹层的显示，鼠标移出会触发弹层的隐藏
// 显示/隐藏时存在一定的延迟，涉及大量异步操作，故使用 rxjs 进行处理
export class HoverManager extends Subject<HoverInput> {
  constructor(readonly hoverDelay: number) {
    super();
    this.hoverDelay = hoverDelay;
  }

  onTriggerMouseEnter = (event: ReactDivMouseEvent) => {
    this.next({ type: 'enter-trigger', event });
  };

  onTriggerMouseLeave = (event: ReactDivMouseEvent) => {
    this.next({ type: 'leave-trigger', event });
  };

  onContentMouseEnter = (event: ReactDivMouseEvent) => {
    this.next({ type: 'enter-content', event });
  };

  onContentMouseLeave = (event: ReactDivMouseEvent) => {
    this.next({ type: 'leave-content', event });
  };

  enterTrigger$ = this.pipe(op.filter((intent) => intent.type === 'enter-trigger'));
  enter$ = this.pipe(op.filter((intent) => intent.type === 'enter-trigger' || intent.type === 'enter-content'));
  leave$ = this.pipe(op.filter((intent) => intent.type === 'leave-trigger' || intent.type === 'leave-content'));

  // 每次 enterTrigger$ 之后，如果在接下来的 150ms 以内鼠标没有移出，则需要触发 popup 的显示
  enterToShow$ = defer(() =>
    this.enterTrigger$.pipe(
      op.switchMapTo(race(timeout(this.hoverDelay), this.leave$)),
      op.filter((result) => result.type === 'timeout'),
    ),
  );

  // 每次 leave$ 触发后，如果在接下来的 150ms 以内鼠标没有移入，则需要触发 popup 的隐藏
  leaveToHide$ = defer(() =>
    this.leave$.pipe(
      op.switchMapTo(race(timeout(this.hoverDelay), this.enter$)),
      op.filter((result) => result.type === 'timeout'),
    ),
  );
}
