import {
  _getGlobalState,
  computed,
  createAtom,
  Lambda,
  makeObservable,
  onBecomeObserved,
  onBecomeUnobserved,
  Reaction,
  runInAction,
} from 'mobx';

export class AsyncValue<T> {
  static SKIP = 'AsyncValue@SKIP' as never;
  static StillLoading = class StillLoading extends Error {};

  private _refreshAtom = createAtom('AsyncValue#refresh');
  private _atom = createAtom('AsyncValue');
  private _disposers: Lambda[] = [];

  private _status: AsyncValue.Status;
  private _current: T;
  private _error: any = null;

  private _reaction: Reaction;
  private _cancelLastGetter: Lambda;

  get _mobxGlobal(): { inXFormAsyncValueFetcher: boolean } {
    return _getGlobalState();
  }

  constructor(readonly fetcher: () => Promise<T>, initValue?: T) {
    this.fetcher = fetcher;
    this._status = 'loading';
    this._current = initValue;

    makeObservable(this, {
      status: computed,
      current: computed,
      error: computed,
    });

    this._disposers.push(this._stop);
    this._disposers.push(onBecomeObserved(this._atom, this._start));
    this._disposers.push(onBecomeUnobserved(this._atom, this._stop));
    this._disposers.push(() => {
      this._status = 'ready';
      this._current = null;
      this._error = null;
    });
  }

  refresh() {
    this._refreshAtom.reportChanged();
  }

  dispose() {
    for (const fn of this._disposers) {
      fn();
    }
  }

  get status() {
    this._atom.reportObserved();
    return this._status;
  }

  get current() {
    if (this._mobxGlobal.inXFormAsyncValueFetcher) {
      this._atom.reportObserved();
      if (status === 'loading') {
        throw new AsyncValue.StillLoading();
      } else if (status === 'error') {
        throw this._error; // todo?
      } else {
        return this._current;
      }
    }

    this._atom.reportObserved();
    return this._current;
  }

  get error() {
    this._atom.reportObserved();
    return this._error;
  }

  private _start = () => {
    this._reaction = new Reaction('async', () => {
      if (this._status !== 'loading') {
        this._status = 'loading';
        this._atom.reportChanged();
      }

      this._reaction.track(() => {
        this._cancelLastGetter?.();

        let cancelled = false;
        this._cancelLastGetter = () => {
          cancelled = true;
        };

        const prevInXFormAsyncValueFetcher = this._mobxGlobal.inXFormAsyncValueFetcher ?? false;
        this._mobxGlobal.inXFormAsyncValueFetcher = true;

        this._refreshAtom.reportObserved();

        this.fetcher()
          .then((newValue) => {
            if (cancelled) {
              return;
            }
            runInAction(() => {
              this._status = 'ready';
              if (newValue !== AsyncValue.SKIP) {
                this._current = newValue;
              }
              this._error = null;
              this._atom.reportChanged();
            });
          })
          .catch((err) => {
            if (err instanceof AsyncValue.StillLoading) {
              // still loading, do nothing
              return;
            }
            runInAction(() => {
              this._status = 'error';
              this._error = err;
              this._atom.reportChanged();
            });
            throw err;
          });
        this._mobxGlobal.inXFormAsyncValueFetcher = prevInXFormAsyncValueFetcher;
      });
    });
    this._reaction.schedule_();
  };

  private _stop = () => {
    if (this._reaction) {
      this._reaction.dispose();
      this._reaction = null;
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AsyncValue {
  export type Status = 'loading' | 'ready' | 'error';
}
