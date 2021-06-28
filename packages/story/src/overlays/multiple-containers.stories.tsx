import {
  Button,
  Dialog,
  Drawer,
  OverlayBehaviorProvider,
  Popup,
  PositionPlacement,
  Toaster,
  Tooltip,
  VirtualList,
} from '@rexd/core';
import _ from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import styled from 'styled-components';
import { getDialogOffsetFromPlacement, getNextPlacement } from './story-helpers';

export default { title: 'overlays / Multiple Containers' };

const standards = ['#4E7EF5', '#42ABFC', '#32CEE6', '#46CF9F', '#FFC147', '#FF7161', '#6782B5', '#FA82BA', '#977FF5'];
const colors = [0, 3, 4, 6, 5, 8, 2, 1, 7].map((index) => standards[index]);

function HoldTallTall({ estimatedRowHeight }: { estimatedRowHeight: number }) {
  return (
    <VirtualList
      virtualThreshold={0}
      estimatedRowHeight={estimatedRowHeight}
      renderRow={(i, _, listRowDataset) => (
        <p key={i} style={{ margin: 0, padding: 8, background: colors[i % colors.length] }} {...listRowDataset}>
          line {i + 1}
        </p>
      )}
      rows={_.range(100)}
    />
  );
}

function MiniApp({ name, container }: { name: string; container: HTMLElement }) {
  const [visible, setVisible] = useState(false);
  const [tallVisible, setTallVisible] = useState(false);
  const [innerDrawerVisible, setInnerDrawerVisible] = useState(false);
  const [dialogVisible1, setDialogVisible1] = useState(false);
  const [placement, setPlacement] = useState<PositionPlacement>('center');
  const [toaster, contextHolder] = Toaster.useToaster();

  useEffect(() => {
    const subscription = fromEvent<KeyboardEvent>(container, 'keypress').subscribe((event) => {
      if (event.key.toLowerCase() === 'c') {
        setPlacement(getNextPlacement);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [container]);

  return (
    <OverlayBehaviorProvider portalContainer={container}>
      {contextHolder}

      <div className="scroll-container">
        <h1>{name}</h1>
        <Button onClick={() => setVisible(true)}>打开drawer</Button>

        <Button
          onClick={() => {
            toaster.show({ content: 'hello~' });
          }}
        >
          toast~~
        </Button>

        <Drawer
          style={{ width: 250 }}
          title={`${name} title`}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          <p>我是 {name} 抽屉中的内容</p>
          <Button onClick={() => setInnerDrawerVisible(true)}>打开 嵌套抽屉</Button>
        </Drawer>

        <Button onClick={() => setDialogVisible1(true)}>打开dialog</Button>
        <Dialog
          style={{ width: 250, transition: 'inset 200ms cubic-bezier(0.51, 1, 0.68, 1)' }}
          title={`${name} title`}
          visible={dialogVisible1}
          onRequestClose={() => setDialogVisible1(false)}
          canCloseByEsc
          placement={placement}
          offset={getDialogOffsetFromPlacement(placement)}
        >
          <p>我是 {name} 对话框中的内容</p>
          <Button onClick={() => setInnerDrawerVisible(true)}>打开 嵌套抽屉</Button>
          <br />

          <Button onClick={() => setPlacement(getNextPlacement)}>
            改变方位(快捷键<code>C</code>)
          </Button>
        </Dialog>

        <Drawer style={{ width: 200 }} visible={innerDrawerVisible} onRequestClose={() => setInnerDrawerVisible(false)}>
          我是 {name} 的嵌套抽屉
        </Drawer>

        <Tooltip title="点击进行举高高">
          <Button onClick={() => setTallVisible(true)}>举高高</Button>
        </Tooltip>
        <Dialog
          title="举高高对话框"
          visible={tallVisible}
          canCloseByEsc
          onRequestClose={() => setTallVisible(false)}
          style={{ maxHeight: '90%', overflow: 'auto', borderRadius: 0 }}
        >
          <p>虚拟滚动...</p>
          <HoldTallTall estimatedRowHeight={34} />
        </Dialog>
      </div>
    </OverlayBehaviorProvider>
  );
}

function MiniAppShape2({ name, container }: { name: string; container: HTMLElement }) {
  const [visible, setVisible] = useState(false);
  const [toaster, contextHolder] = Toaster.useToaster();

  return (
    <OverlayBehaviorProvider portalContainer={container}>
      {contextHolder}

      <div className="scroll-container">
        <h1>{name}</h1>
        <Button onClick={() => setVisible(true)}>打开drawer</Button>
        <Popup interactionKind="click" target={<Button>click me</Button>}>
          <div style={{ padding: 8, background: '#f8dadd' }}>
            <Button onClick={() => setVisible(true)}>打开drawer</Button>
          </div>
        </Popup>

        <Drawer
          title={`${name} title`}
          visible={visible}
          style={{ height: 350 }}
          placement="bottom"
          onRequestClose={() => setVisible(false)}
        >
          <p>我是 {name} 抽屉中的内容</p>
          <Button onClick={() => setVisible(false)}>关闭</Button>
          <Button onClick={() => toaster.show({ content: 'world~~' })}>hello~</Button>
        </Drawer>

        <div>
          <h3>{name} 下的其他内容（虚拟滚动）</h3>
          <HoldTallTall estimatedRowHeight={40} />
        </div>
      </div>
    </OverlayBehaviorProvider>
  );
}

const AppContainerDiv = styled.div`
  height: 400px;
  position: relative;
  overflow: hidden;
  border: 2px solid #aaa;

  .scroll-container {
    height: 100%;
    padding: 8px;
    overflow: auto;
  }
`;

export function 多容器() {
  const [app1Container, setApp1Container] = useState<HTMLDivElement>();
  const [app2Container, setApp2Container] = useState<HTMLDivElement>();
  const [app3Container, setApp3Container] = useState<HTMLDivElement>();
  const [app4Container, setApp4Container] = useState<HTMLDivElement>();

  return (
    <div>
      <div style={{ display: 'grid', gap: 16, grid: 'auto-flow / repeat(auto-fill, minmax(500px, 1fr))' }}>
        <AppContainerDiv ref={setApp1Container} tabIndex={0}>
          {app1Container ? <MiniApp name="APP-111" container={app1Container} /> : 'loading...'}
        </AppContainerDiv>

        <AppContainerDiv ref={setApp2Container} tabIndex={0}>
          {app2Container ? <MiniAppShape2 name="APP-222" container={app2Container} /> : 'loading...'}
        </AppContainerDiv>

        <AppContainerDiv ref={setApp3Container} tabIndex={0}>
          {app3Container ? <MiniAppShape2 name="APP-333" container={app3Container} /> : 'loading...'}
        </AppContainerDiv>

        <AppContainerDiv tabIndex={0} ref={setApp4Container}>
          {app4Container ? <MiniApp name="APP-444" container={app4Container} /> : 'loading...'}
        </AppContainerDiv>
      </div>
    </div>
  );
}
