import {
  _getGlobalState,
  computed,
  createAtom,
  Lambda,
  onBecomeObserved,
  onBecomeUnobserved,
  Reaction,
  runInAction,
} from 'mobx';

class StillLoading extends Error {}

export type AsyncValueStatus = 'loading' | 'ready' | 'error';

export interface AsyncValue<T> {
  readonly xformAsyncValue: true;

  /** 状态，可为以下值 'loading' | 'ready' | 'error' */
  readonly status: AsyncValueStatus;

  /** 当前值 */
  readonly current: T;

  /** 错误 */
  readonly error?: any;

  /** 销毁 AsyncValue */
  dispose(): void;

  /** 重新触发 fetcher */
  refresh(): void;
}

export function isAsyncValue(obj: object): obj is AsyncValue<any> {
  return (obj as any)?.xformAsyncValue;
}

export function createAsyncValue<T>(fetcher: () => Promise<T>, initValue?: T): AsyncValue<T> {
  const mobxGlobal: { inXFormAsyncValueFetcher: boolean } = _getGlobalState();

  const refreshAtom = createAtom('refreshAtom');
  const atom = createAtom('createAsyncValue');
  const disposers: Lambda[] = [];

  let status: AsyncValueStatus = 'loading';
  let current = initValue;
  let error: any = null;

  const computedStatus = computed(() => {
    atom.reportObserved();
    return status;
  });
  const computedCurrent = computed(() => {
    atom.reportObserved();
    return current;
  });
  const computedError = computed(() => {
    atom.reportObserved();
    return error;
  });

  let reaction: Reaction;
  let cancelLastGetter: Lambda;

  const start = () => {
    reaction = new Reaction('async', () => {
      if (status !== 'loading') {
        status = 'loading';
        atom.reportChanged();
      }

      reaction.track(() => {
        cancelLastGetter?.();

        let cancelled = false;
        cancelLastGetter = () => {
          cancelled = true;
        };

        const prevInXFormAsyncValueFetcher = mobxGlobal.inXFormAsyncValueFetcher ?? false;
        mobxGlobal.inXFormAsyncValueFetcher = true;

        refreshAtom.reportObserved();

        fetcher()
          .then((newValue) => {
            if (cancelled) {
              return;
            }
            runInAction(() => {
              status = 'ready';
              current = newValue;
              error = null;
              atom.reportChanged();
            });
          })
          .catch((err) => {
            if (err instanceof StillLoading) {
              // still loading, do nothing
              return;
            }
            runInAction(() => {
              status = 'error';
              error = err;
              atom.reportChanged();
            });
            throw err;
          });
        mobxGlobal.inXFormAsyncValueFetcher = prevInXFormAsyncValueFetcher;
      });
    });
    reaction.schedule_();
  };

  const stop = () => {
    if (reaction) {
      reaction.dispose();
      reaction = null;
    }
  };

  disposers.push(stop);
  disposers.push(onBecomeObserved(atom, start));
  disposers.push(onBecomeUnobserved(atom, stop));
  disposers.push(() => {
    status = 'ready';
    current = null;
    error = null;
  });

  return {
    xformAsyncValue: true,
    get status() {
      return computedStatus.get();
    },
    get current() {
      if (mobxGlobal.inXFormAsyncValueFetcher) {
        atom.reportObserved();
        if (status === 'loading') {
          throw new StillLoading();
        } else if (status === 'error') {
          throw error;
        } else {
          return current;
        }
      }

      return computedCurrent.get();
    },
    get error() {
      return computedError.get();
    },
    dispose() {
      for (const fn of disposers) {
        fn();
      }
    },
    refresh() {
      refreshAtom.reportChanged();
    },
  };
}
