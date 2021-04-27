import { Button, Switch } from '@rexd/core';
import { modelUtils, useModel } from '@rexd/xform';
import * as mobx from 'mobx';
import { action, autorun, computed, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import type { ReactJsonViewProps } from 'react-json-view';

function BrowserOnly({
  children,
  fallback,
}: {
  children?: () => React.ReactElement;
  fallback?: React.ReactElement;
}): React.ReactElement {
  if (typeof document === 'undefined' || children == null) {
    return fallback ?? null;
  }

  return <>{children()}</>;
}

export const BrowserOnlyReactJson = (props: ReactJsonViewProps) => {
  return (
    <BrowserOnly>
      {() => {
        const ReactJson = require('react-json-view').default;
        return <ReactJson style={{ marginTop: 8, fontSize: 12, ...props.style }} {...props} />;
      }}
    </BrowserOnly>
  );
};

// https://github.com/mac-s-g/react-json-view/issues/121#issuecomment-670431408

export const ValuePreview = observer(
  ({ style, defaultShow }: { style?: React.CSSProperties; defaultShow?: boolean }) => {
    const model = useModel();
    const data = toJS(model.values) as object;
    const showReactJson = model.state.showReactJson ?? defaultShow;

    return (
      <div style={{ marginTop: 16, ...style }}>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Switch
            value={showReactJson}
            onChange={action((b) => {
              model.state.showReactJson = b;
            })}
          />
          <span style={{ fontSize: 12 }}>显示 JSON</span>
        </div>
        {showReactJson && <BrowserOnlyReactJson name="表单状态预览" src={data} />}
      </div>
    );
  },
);

export const ValuePrinter = observer(({ label, printAll }: { label?: string; printAll?: boolean }) => {
  const model = useModel();

  useEffect(() => {
    return autorun(() => {
      console.log(
        `[ValuePrinter] ${label ?? ''}\n`,
        printAll ? { ...model, values: toJS(model.values) } : toJS(model.values),
      );
    });
  }, [label, model, printAll]);

  return null;
});

export const Actions = observer(() => {
  const model = useModel().root;

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button onClick={() => modelUtils.validateAll(model)}>校验全部</Button>
      <Button onClick={() => modelUtils.clearError(model)}>清空错误</Button>
      <Button
        onClick={action(() => {
          model.values = {
            opCount: 0,
            sku: { code: 'test' },
          };
          modelUtils.clearError(model);
        })}
      >
        重置表单
      </Button>
    </div>
  );
});

export const InjectModelToGlobal = observer(() => {
  const model = useModel();

  useEffect(() => {
    // @ts-ignore
    window.model = model;
    // @ts-ignore
    window.toJS = toJS;
    // @ts-ignore
    window.mobx = mobx;

    return () => {
      // @ts-ignore
      delete window.model;
      // @ts-ignore
      delete window.toJS;
      // @ts-ignore
      delete window.mobx;
    };
  }, [model]);

  return <></>;
});

export type Status = 'loading' | 'ready' | 'error';

class AsyncLoadingError extends Error {}

export interface AsyncValue<T> {
  readonly status: Status;
  readonly current: T;
  dispose(): void;
  refresh(): void;
}

function getFromAsyncValue<T>(x: AsyncValue<T>): T {
  if (x.status !== 'ready') {
    throw new AsyncLoadingError();
  }
  return x.current;
}

export function makeAsyncValue<T>(getter: (get: typeof getFromAsyncValue) => Promise<T>, initValue?: T): AsyncValue<T> {
  const atom = mobx.createAtom('atom@asyncSelect');
  const disposers: mobx.Lambda[] = [];

  let status: Status = 'loading';
  let current = initValue;

  const computedStatus = computed(() => {
    atom.reportObserved();
    return status;
  });
  const computedCurrent = computed(() => {
    atom.reportObserved();
    return current;
  });

  let reaction: mobx.Reaction;
  let cancelLastGetter: mobx.Lambda;

  const start = () => {
    reaction = new mobx.Reaction('async', () => {
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

        getter(getFromAsyncValue)
          .then(
            action((newValue) => {
              if (cancelled) {
                return;
              }
              status = 'ready';
              current = newValue;
              atom.reportChanged();

              return newValue;
            }),
          )
          .catch((e) => {
            if (e instanceof AsyncLoadingError) {
              // still loading, do nothing
              return;
            }
            // TODO 处理 error 状态
            throw e;
          });
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

  disposers.push(mobx.onBecomeObserved(atom, start));
  disposers.push(mobx.onBecomeUnobserved(atom, stop));
  disposers.push(stop);

  return {
    get status() {
      return computedStatus.get();
    },
    get current() {
      return computedCurrent.get();
    },
    dispose() {
      for (const fn of disposers) {
        fn();
      }
    },
    refresh() {
      reaction?.onBecomeStale_();
    },
  };
}
