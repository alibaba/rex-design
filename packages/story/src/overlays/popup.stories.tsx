import { Placement } from '@popperjs/core';
import { Button, Group, Popup } from '@rexd/core';
import React, { useState } from 'react';
import styled from 'styled-components';

export default { title: 'overlays / Popup' };

const ShadowedDiv = styled.div`
  min-width: 300px;
  min-height: 100px;
  padding: 10px;
  box-shadow: var(--rex-shadows-lowDown);
`;

function SomeText() {
  return (
    <>
      最近工作：高级经理｜招商银行丨杭州分行｜2009-07-01 至今
      <br />
      工作职责：巴拉巴拉小魔仙
      <br />
      联系方式：67676767｜1212121@163.con
      <br />
      教育经理：北京大学｜工商管理｜2007-09-01 至 2006-06-01
      <br />
      中央财经大学｜2004-09-01 至 2007-06-01
    </>
  );
}

export function Basic() {
  return (
    <Popup target={<Button>点击查看详情</Button>}>
      <div style={{ border: '1px solid #999', padding: 8 }}>
        <SomeText />
      </div>
    </Popup>
  );
}

export function Controlled() {
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Popup
      target={<Button onClick={() => setVisible(true)}>点击查看详情</Button>}
      visible={visible}
      onRequestClose={onClose}
    >
      <div style={{ border: '1px solid #999', padding: 8 }}>
        <Button onClick={onClose}>手动关闭</Button>
        <p>
          <SomeText />
        </p>
      </div>
    </Popup>
  );
}

export function InteractionKind() {
  return (
    <Group>
      <Popup
        interactionKind="hover-target"
        target={
          <Button>
            <code>hover-target</code>
          </Button>
        }
      >
        <div style={{ border: '1px solid #999', padding: 8 }}>
          <SomeText />
        </div>
      </Popup>
      <Popup
        interactionKind="hover"
        target={
          <Button>
            <code>hover</code>
          </Button>
        }
      >
        <div style={{ border: '1px solid #999', padding: 8 }}>
          <SomeText />
        </div>
      </Popup>
      <Popup
        interactionKind="hover"
        canOpenByFocus
        canCloseByBlur
        target={
          <Button>
            <code>hover & focus & blur</code>
          </Button>
        }
      >
        <div style={{ border: '1px solid #999', padding: 8 }}>
          <SomeText />
        </div>
      </Popup>
      <Popup
        interactionKind="click"
        target={
          <Button>
            <code>click</code>
          </Button>
        }
      >
        <div style={{ border: '1px solid #999', padding: 8 }}>
          <SomeText />
        </div>
      </Popup>
      <Popup
        interactionKind="click"
        canCloseByOutSideClick={false}
        target={
          <Button>
            <code>{`canCloseByOutSideClick={false}`}</code>
          </Button>
        }
      >
        <div style={{ border: '1px solid #999', padding: 8 }}>
          <SomeText />
        </div>
      </Popup>
    </Group>
  );
}

export function SwitchTargetOnTheFly() {
  const [visible, setVisible] = useState(true);
  const [reference, setReference] = useState('A');

  return (
    <div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button onClick={() => setVisible(!visible)}>显示/隐藏</Button>
        <Button onClick={() => setReference(reference === 'A' ? 'B' : 'A')}>
          切换弹层参考元素（当前: {reference}）
        </Button>
      </div>

      <Popup
        hasArrow
        canCloseByOutSideClick={false}
        visible={visible}
        renderTarget={({ ref }) => (
          <div style={{ display: 'flex', gap: 32, marginTop: 16 }}>
            <Button ref={reference === 'A' ? ref : null}>按钮A</Button>
            <Button ref={reference === 'B' ? ref : null}>按钮B</Button>
          </div>
        )}
      >
        <ShadowedDiv>
          <SomeText />
        </ShadowedDiv>
      </Popup>
    </div>
  );
}

const StyledButton = styled(Button)`
  &[data-rex-popup-open] {
    background: rgba(255, 0, 0, 0.2) !important;
  }
`;

const ButtonGrid = styled.div`
  margin: 100px;
  display: grid;
  grid: repeat(5, 40px) / repeat(5, auto);
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export function Placements() {
  const renderButtons = (
    placements: Placement[],
    getStyle: (index: number) => { gridRow: number; gridColumn: number },
  ) => {
    return placements.map((placement, index) => (
      <Popup
        key={placement}
        flip={false}
        hasArrow
        renderTarget={(pass) => (
          <StyledButton {...pass} style={getStyle(index)}>
            {placement}
          </StyledButton>
        )}
        placement={placement}
        interactionKind="click"
      >
        <ShadowedDiv>
          <SomeText />
        </ShadowedDiv>
      </Popup>
    ));
  };

  return (
    <div>
      <ButtonGrid>
        {renderButtons(['top-end', 'top', 'top-start'], (index) => ({
          gridRow: 1,
          gridColumn: index + 2,
        }))}

        {renderButtons(['left-end', 'left', 'left-start'], (index) => ({
          gridColumn: 1,
          gridRow: index + 2,
        }))}

        {renderButtons(['right-end', 'right', 'right-start'], (index) => ({
          gridColumn: 5,
          gridRow: index + 2,
        }))}

        {renderButtons(['bottom-end', 'bottom', 'bottom-start'], (index) => ({
          gridRow: 5,
          gridColumn: index + 2,
        }))}
      </ButtonGrid>
    </div>
  );
}

export function PopupInScrollContainer() {
  return (
    <div
      style={{
        height: 300,
        width: 600,
        marginLeft: 100,
        marginTop: 100,
        border: '1px solid #ccc',
        overflow: 'scroll',
      }}
    >
      <div
        style={{
          height: 600,
          padding: '200px 0 0 180px',
          position: 'relative',
        }}
      >
        <Popup usePortal={false} target={<Button>click me</Button>}>
          <ShadowedDiv>
            <SomeText />
          </ShadowedDiv>
        </Popup>
      </div>
    </div>
  );
}

export function SimplifiedDOMStructure() {
  return (
    <Popup
      renderTarget={(args) => (
        <Button ref={args.ref} onClick={args.onClick}>
          点击触发弹层
        </Button>
      )}
      renderChildren={({ ref }) => (
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            padding: 8,
            width: 300,
            border: '1px solid var(--rex-colors-emphasis-30)',
            color: 'var(--rex-colors-text-body)',
          }}
        >
          通过 render callback 的调用形式，可以精简弹层的 DOM 层级
        </div>
      )}
    />
  );
}

export function Nested() {
  return (
    <Popup target={<Button>查看详情</Button>}>
      <ShadowedDiv>
        <p>
          最近工作：高级经理｜招商银行丨杭州分行｜2009-07-01 至今
          <br />
          工作职责：巴拉巴拉小魔仙
          <br />
          联系方式：67676767｜1212121@163.con
          <br />
        </p>
        <Popup target={<Button>查看教育经历</Button>}>
          <ShadowedDiv>
            1. 北京大学｜工商管理｜2007-09-01 至 2006-06-01
            <br />
            2. 中央财经大学｜2004-09-01 至 2007-06-01
          </ShadowedDiv>
        </Popup>
      </ShadowedDiv>
    </Popup>
  );
}

export function NestedPopupInTallPage() {
  return (
    <div>
      <div>tips: 按钮在页面下方，往下滚一段吧</div>
      <div style={{ height: '150vh' }} />

      <Popup target={<Button size="large">打开外层弹框</Button>}>
        <div style={{ padding: 8, width: 300, border: '1px solid #ccc' }}>
          <h1>外层弹框内容 </h1>

          <Popup
            target={
              <Button style={{ marginLeft: 50 }} size="large">
                打开内层弹框
              </Button>
            }
            placement="right-start"
          >
            <div style={{ padding: 8, width: 300, border: '1px solid #ccc' }}>
              <h1>内层弹框 </h1>
              <div style={{ height: 250, background: 'rgba(255, 0, 0, 0.2)' }} />
            </div>
          </Popup>
        </div>
      </Popup>

      <div style={{ height: '150vh' }} />
    </div>
  );
}

export function Arrow() {
  return (
    <Popup target={<Button>点击查看详情</Button>} hasArrow wrapperStyle={{ '--rex-popup-bgcolor': '#333' } as any}>
      <div style={{ color: 'white', padding: 12, fontSize: 14 }}>
        最近工作：高级经理｜招商银行丨杭州分行｜2009-07-01 至今
        <br />
        工作职责：巴拉巴拉小魔仙
      </div>
    </Popup>
  );
}
