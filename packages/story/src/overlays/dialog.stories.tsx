import { Button, Dialog, Drawer, PositionPlacement } from '@rexd/core';
import { Icon } from '@rexd/icon';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { getDialogOffsetFromPlacement, getNextPlacement } from './story-helpers';

export default { title: 'overlays / Dialog' };

const hippoIntroduction =
  '盒马是阿里巴巴集团旗下，以数据和技术驱动的新零售平台。盒马希望为消费者打造社区化的一站式新零售体验中心，用科技和人情味带给人们“鲜美生活”。';

const alibabaIntroduction =
  '阿里巴巴集团创立于1999年，是一家提供电子商务在线交易平台的中国公司，实行位于杭州与北京的双总部制度。\n' +
  '服务范围包括B2B贸易、网上零售、购物搜索引擎、第三方支付和云计算服务。';

export function Basic() {
  const [state, setState] = useState({ visible: false, width: 400 });

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Button onClick={() => setState({ visible: true, width: 300 })}>打开小号对话框(300px)</Button>
        <Button onClick={() => setState({ visible: true, width: 450 })}>打开中号对话框(450px)</Button>
        <Button onClick={() => setState({ visible: true, width: 800 })}>打开大号对话框(800px)</Button>
      </div>
      <Dialog
        title="盒马"
        visible={state.visible}
        onRequestClose={() => setState({ visible: false, width: state.width })}
        style={{ width: state.width }}
      >
        {hippoIntroduction}
      </Dialog>
    </div>
  );
}

export function NonModal() {
  const [state, setState] = useState({ visible: false });

  return (
    <div>
      <Button onClick={() => setState({ visible: true })}>打开非模态对话框</Button>
      <Dialog
        title="盒马"
        visible={state.visible}
        onRequestClose={() => setState({ visible: false })}
        canCloseByEsc
        canCloseByIcon
        canCloseByOutSideClick
      >
        {hippoIntroduction}
      </Dialog>
    </div>
  );
}

export function Nested() {
  const [visible, setVisible] = useState(false);
  const [innerVisible, setInnerVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>打开对话框</Button>
      <Dialog title="阿里巴巴" visible={visible} onRequestClose={() => setVisible(false)} canCloseByEsc>
        <p>{alibabaIntroduction}</p>
        <Button onClick={() => setInnerVisible(true)}>打开嵌套对话框</Button>

        <Dialog
          title="嵌套对话框-盒马"
          visible={innerVisible}
          onRequestClose={() => setInnerVisible(false)}
          canCloseByEsc
          style={{ width: 720 }}
        >
          <p style={{ marginBottom: 0 }}>{hippoIntroduction}</p>
        </Dialog>
      </Dialog>
    </div>
  );
}

function NestedDialog({ depth, visible, onRequestClose }: any) {
  const [showInner, setShowInner] = useState(false);

  return (
    <Dialog title={`对话框标题 depth=${depth}`} visible={visible} onRequestClose={onRequestClose} canCloseByEsc>
      <h2>我是对话框中的内容</h2>
      <p>（按下 ESC 可以关闭当前对话框）</p>

      <Button onClick={() => setShowInner(true)}>打开下级对话框</Button>

      <NestedDialog depth={depth + 1} visible={showInner} onRequestClose={() => setShowInner(false)} />
    </Dialog>
  );
}

export function MatryoshkaDoll() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>打开对话框</Button>
      <NestedDialog depth={0} visible={visible} onRequestClose={() => setVisible(false)} />
    </div>
  );
}

const standards = ['#4E7EF5', '#42ABFC', '#32CEE6', '#46CF9F', '#FFC147', '#FF7161', '#6782B5', '#FA82BA', '#977FF5'];
const colors = [0, 3, 4, 6, 5, 8, 2, 1, 7].map((index) => standards[index]);

export function DynamicSizeAndPlacements() {
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(600);
  const [lineCount, setLineCount] = useState(3);
  const [placement, setPlacement] = useState<PositionPlacement>('center');

  useEffect(() => {
    const subscription = fromEvent<KeyboardEvent>(document, 'keypress').subscribe((event) => {
      if (event.key.toLowerCase() === 'c') {
        setPlacement(getNextPlacement);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>打开对话框</Button>
      <Dialog
        title="对话框标题"
        visible={visible}
        onRequestClose={() => setVisible(false)}
        style={{ width, transition: 'inset 200ms cubic-bezier(0.51, 1, 0.68, 1)' }}
        placement={placement}
        offset={getDialogOffsetFromPlacement(placement)}
      >
        <div>
          <p style={{ marginTop: 0 }}>
            当前方位 <code>placement={placement}</code>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16, overflow: 'auto' }}>
          <Button onClick={() => setWidth(width + 50)}>增加宽度</Button>
          <Button onClick={() => setWidth(width - 50)}>减小宽度</Button>
          <Button onClick={() => setLineCount(lineCount + 1)}>增加高度</Button>
          <Button onClick={() => setLineCount(lineCount - 1)}>减小高度</Button>
          <Button onClick={() => setPlacement(getNextPlacement)}>
            改变方位(快捷键<code>C</code>)
          </Button>
        </div>
        <br />
        {_.range(lineCount).map((i) => (
          <p key={i} style={{ margin: 0, padding: 8, background: colors[i % colors.length] }}>
            line {i + 1}
          </p>
        ))}
      </Dialog>
    </div>
  );
}

export function VeryTall() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>打开对话框</Button>
      <Dialog
        title="对话框标题"
        visible={visible}
        onRequestClose={() => setVisible(false)}
        canCloseByEsc
        canCloseByIcon
        style={{ maxHeight: 'calc(100% - 32px)', overflow: 'auto', borderRadius: 0 }}
        placement="top"
        offset={[0, 16]}
      >
        {_.range(100).map((i) => (
          <p key={i} style={{ margin: 0, padding: 8, background: colors[i % colors.length] }}>
            line {i + 1}
          </p>
        ))}
      </Dialog>
    </div>
  );
}

export function Minimal() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>打开对话框</Button>
      <Dialog
        minimal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        style={{ width: 300, height: 250, padding: '1rem 2rem 1rem 1rem' }}
        canCloseByOutSideClick
        canCloseByEsc
        canCloseByIcon
      >
        {hippoIntroduction}
      </Dialog>
    </div>
  );
}

export function QuickTools() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button
        onClick={() => {
          Dialog.show({
            title: '确认删除',
            content: '你确认要删除这些内容吗？',
            canCloseByEsc: true,
            onOk() {
              console.log('继续删除');
            },
            onCancel() {
              console.log('取消');
            },
          });
        }}
      >
        打开对话框 show
      </Button>
      <Button
        onClick={() => {
          Dialog.alert({
            title: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                删除失败
                <Icon type="error" style={{ marginLeft: 'auto', color: 'var(--rex-colors-error-normal)' }} />
              </div>
            ),
            content: '关闭文件后再重新尝试删除文件',
          }).then((alertResult) => {
            console.log('alertResult:', alertResult);
          });
        }}
      >
        打开 alert 对话框
      </Button>
      <Button
        onClick={() => {
          Dialog.confirm({
            title: '确认删除',
            content: '是否要删除《小作坊的自我修养》这个文件夹么？该操作无法撤销.',
          }).then((confirmResult) => {
            console.log('confirmResult', confirmResult);
          });
        }}
      >
        打开 confirm 对话框
      </Button>
      <Button onClick={Dialog.closeAll}>关闭所有对话框</Button>
    </div>
  );
}

export function AttachedQuickTools() {
  const [dialog, contextHolder] = Dialog.useDialog();
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {contextHolder}

      <Button
        onClick={() => {
          dialog.show({
            title: `确认删除 ${count}`,
            content: '你确认要删除这些内容吗？',
            canCloseByEsc: true,
          });
          setCount(count + 1);
        }}
      >
        打开对话框 show
      </Button>
      <Button
        onClick={() => {
          dialog.closeAll();
        }}
      >
        关闭所有对话框
      </Button>
    </div>
  );
}

export function Test() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <div>
      <div style={{ margin: 20, background: '#ccc', height: 300 }} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Button onClick={() => setDialogVisible(true)}>打开对话框(300px)</Button>
      </div>
      <Dialog
        title="阿里巴巴"
        visible={dialogVisible}
        onRequestClose={() => setDialogVisible(false)}
        style={{ width: 300 }}
        disableScroll={false}
      >
        <Button onClick={() => setDrawerVisible(true)}>打开嵌套抽屉</Button>

        <p>{alibabaIntroduction}</p>
      </Dialog>

      <Drawer
        title="盒马"
        visible={drawerVisible}
        onRequestClose={() => setDrawerVisible(false)}
        disableScroll={false}
        footer={
          <Button onClick={() => setDrawerVisible(false)} type="primary" size="small">
            关闭
          </Button>
        }
      >
        {hippoIntroduction}

        <div style={{ margin: 20, background: '#ccc', height: 300 }} />
        <div style={{ margin: 20, background: '#ccc', height: 300 }} />
        <div style={{ margin: 20, background: '#ccc', height: 300 }} />
        <div style={{ margin: 20, background: '#ccc', height: 300 }} />
        <div style={{ margin: 20, background: '#ccc', height: 300 }} />
      </Drawer>

      <div style={{ margin: 20, background: '#ccc', height: 300 }} />
      <div style={{ margin: 20, background: '#ccc', height: 300 }} />
      <div style={{ margin: 20, background: '#ccc', height: 300 }} />
    </div>
  );
}
