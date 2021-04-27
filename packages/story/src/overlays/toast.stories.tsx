import { Button, PositionPlacement, Toaster } from '@rexd/core';
import React, { useReducer, useState } from 'react';

export default { title: 'overlays / Toast' };

export function Basic() {
  const [toaster, contextPlaceholder] = Toaster.useToaster({ placement: 'top-right' });

  return (
    <div>
      {contextPlaceholder}
      <Button
        onClick={() => {
          toaster.show({ content: 'hello!' });
        }}
      >
        toaster.show(...)
      </Button>
      <Button
        style={{ marginLeft: 8 }}
        onClick={() => {
          toaster.closeAll();
        }}
      >
        关闭所有消息
      </Button>
    </div>
  );
}

export function BasicDetached() {
  return (
    <div>
      <Button
        onClick={() => {
          Toaster.show({ content: 'hello!' });
        }}
      >
        Toaster.show(...)
      </Button>
      <Button
        style={{ marginLeft: 8 }}
        onClick={() => {
          Toaster.closeAll();
        }}
      >
        关闭所有消息
      </Button>
    </div>
  );
}

export function DynamicPlacement() {
  const [placement, setPlacement] = useState<PositionPlacement>('top-right');
  const [toaster, contextPlaceholder] = Toaster.useToaster({ placement });

  return (
    <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-start', gap: 16 }}>
      {contextPlaceholder}

      <Button onClick={() => toaster.show({ content: 'hello!' })} style={{ fontFamily: 'monospace' }}>
        show('hello!')
      </Button>
      <Button onClick={() => toaster.closeAll()}>关闭所有消息</Button>
      <Button
        onClick={() => {
          if (placement === 'top-right') {
            setPlacement('top');
          } else if (placement === 'top') {
            setPlacement('top-left');
          } else {
            setPlacement('top-right');
          }
        }}
      >
        切换位置({placement})
      </Button>
    </div>
  );
}

export function MultipleToaster() {
  const [toaster1, node1] = Toaster.useToaster({ placement: 'top-right' });
  const [toaster2, node2] = Toaster.useToaster({ placement: 'top' });

  return (
    <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-start', gap: 16 }}>
      {node1}
      {node2}

      <Button onClick={() => toaster1.show({ content: 'hello!' })} style={{ fontFamily: 'monospace' }}>
        toaster1.show('hello!')
      </Button>
      <Button onClick={() => toaster1.closeAll()} style={{ fontFamily: 'monospace' }}>
        toaster1.closeAll()
      </Button>

      <div
        style={{
          margin: '12px 0',
          width: '100%',
          height: 1,
          borderTop: '1px solid var(--rex-colors-emphasis-30)',
        }}
      />

      <Button
        style={{ fontFamily: 'monospace' }}
        onClick={() => {
          toaster2.show({ content: 'hello!' });
        }}
      >
        toaster2.show('world!')
      </Button>
      <Button
        style={{ fontFamily: 'monospace' }}
        onClick={() => {
          toaster2.show({
            content: <h1 style={{ height: 250 }}>BIG</h1>,
            canCloseByClick: false,
          });
        }}
      >
        toaster2.show(big)
      </Button>
      <Button
        style={{ fontFamily: 'monospace' }}
        onClick={() => {
          toaster2.closeAll();
        }}
      >
        toaster2.closeAll()
      </Button>
    </div>
  );
}

export function DetachedToasterWithDynamicPlacements() {
  const [_, forceUpdate] = useReducer((t) => t + 1, 0);
  return (
    <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-start', gap: 16 }}>
      <Button onClick={() => Toaster.show({ content: 'hello!' })} style={{ fontFamily: 'monospace' }}>
        show('hello!')
      </Button>
      <Button onClick={() => Toaster.closeAll()}>关闭所有消息</Button>
      <Button
        onClick={() => {
          if (Toaster.getConfig().placement === 'top-right') {
            Toaster.config({ placement: 'top' });
          } else if (Toaster.getConfig().placement === 'top') {
            Toaster.config({ placement: 'top-left' });
          } else {
            Toaster.config({ placement: 'top-right' });
          }

          // 这里的 forceUpdate 只是为了在页面中显示正确的 placement
          forceUpdate();
        }}
      >
        切换位置({Toaster.getConfig().placement})
      </Button>
    </div>
  );
}
