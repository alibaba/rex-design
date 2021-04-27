import React from 'react';
import { composeHandlers } from '../../utils';
import { Dialog, DialogProps } from './dialog';
import { RenderContainer } from './overlay-utils/render-containers';

type QuickDialogInstance = {
  close(): void;
};

export function showDialog(
  config: DialogProps,
  containerFactory: () => RenderContainer,
  instMap: Map<string, QuickDialogInstance>,
) {
  const container = containerFactory();

  if (container.underlyingElement != null) {
    container.underlyingElement.dataset.rexDialogQuickTools = 'true';
  }

  function rerender(visible: boolean) {
    container.render(
      <Dialog
        visible={visible}
        onRequestClose={() => rerender(false)}
        {...config}
        afterClose={composeHandlers(config.afterClose, () => {
          instMap.delete(container.key);
          container.unmount();
        })}
      />,
    );
  }

  rerender(true);

  const instance = {
    close() {
      rerender(false);
    },
  };

  instMap.set(container.key, instance);

  return container.key;
}

export function makeDialogQuickTools(containerFactory: () => RenderContainer) {
  const instMap = new Map<string, QuickDialogInstance>();

  return {
    closeAll() {
      const copy = new Map(instMap);
      instMap.clear();
      for (const inst of copy.values()) {
        inst.close();
      }
    },
    show(config: DialogProps) {
      return showDialog(config, containerFactory, instMap);
    },
    close(key: string) {
      instMap.get(key)?.close();
    },
    alert(config: DialogProps) {
      return new Promise<true>((resolve) => {
        showDialog(
          {
            ...config,
            footer: [
              {
                component: 'button',
                type: 'primary',
                label: '确认',
                onClick: () => resolve(true),
                autoCloseDialog: true,
              },
            ],
          },
          containerFactory,
          instMap,
        );
      });
    },
    confirm(config: DialogProps) {
      return new Promise<boolean>((resolve) => {
        showDialog(
          {
            ...config,
            footer: [
              {
                component: 'button',
                label: '取消',
                onClick: () => resolve(false),
                autoCloseDialog: true,
              },
              {
                component: 'button',
                type: 'primary',
                label: '确认',
                onClick: () => resolve(true),
                autoCloseDialog: true,
              },
            ],
          },
          containerFactory,
          instMap,
        );
      });
    },
  };
}
