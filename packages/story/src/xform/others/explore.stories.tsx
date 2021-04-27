import { Button, Tooltip } from '@rexd/core';
import { arrayCard, Form, FormItem, modelUtils, RootModel, useModel } from '@rexd/xform';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Actions, InjectModelToGlobal, ValuePrinter } from '../helpers';

export default { title: 'XForm / Explore' };

const model = new RootModel<any>();

const SUBSIDIARIES = '北京，上海，浙江，广州'.split('，');

const SHOPS = [
  '杭州东新东路店',
  '盒马杭州解百店',
  '杭州临平中都店',
  '杭州亲橙里店',
  '杭州庆春店',
  '杭州下沙银泰店',
  '杭州星光大道店',
  '杭州西溪龙湖店',
  '杭州闸弄口店',
];

const Tools = observer(() => {
  const model = useModel().root as RootModel<any>;

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {/*{model.state.preview && <ValuePreview showAll />}*/}
      {/*{model.state.printer && <ValuePrinter printAll />}*/}
      {model.state.inject !== false && <InjectModelToGlobal />}

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
      <Tooltip
        renderTrigger={(arg) => (
          <Button
            {...arg}
            onClick={action(() => {
              if (model.values.items == null) {
                model.values.items = [];
              }
              model.values.items.push({}, {}, {}, {}, {}, {}, {}, {}, {}, {});
            })}
          >
            在列表末尾追加 10 条项目
          </Button>
        )}
      >
        可以多点击几次来查看大数据量下的表现
      </Tooltip>
    </div>
  );
});

function ItemList({ name }: { name: string }) {
  return (
    <Form.Array
      name={name}
      layout={arrayCard({ showItemOrder: true })}
      itemFactory={(arrayModel) => {
        const cntLength = arrayModel.values?.length;
        return { name: `name-${cntLength + 1}` };
      }}
    >
      <div style={{ display: 'grid', grid: 'auto-flow / repeat(6, 1fr)', gap: 16 }}>
        <div style={{ gridRow: 1, gridColumn: 'span 2' }}>
          <FormItem
            component="testButtonGroup"
            label="证件类型(test.idType)"
            name="test.idType"
            required
            items={['身份证', '护照', '行驶证']}
            validate={(value) => {
              if (value === '行驶证') {
                return '不可以用行驶证哦';
              }
            }}
          />
        </div>
        <div style={{ gridRow: 1, gridColumn: 'span 2' }}>
          <FormItem
            component="testButtonGroup"
            label="test.cdType"
            name="test.cdType"
            required
            items={['A', 'B', 'C', 'D']}
          />
        </div>
        <div style={{ gridColumn: '1 / span 3' }}>
          <FormItem component="input" label="名称" name="name" />
        </div>

        <div style={{ gridColumn: 'span 3' }}>
          <FormItem
            component="numberInput"
            name="nps"
            defaultValue={4}
            label="NPS"
            componentProps={{ min: 0, max: 10, step: 1 }}
            validate={(v) => {
              if (v < 5) {
                return `给 ${v + 1} 分行不行`;
              }
            }}
          />
        </div>
      </div>
      {/*<ItemList name="items" />*/}
    </Form.Array>
  );
}

const ExampleInner = observer(() => {
  return (
    <Form model={model}>
      <Tools />

      <FormItem
        component="singleSelect"
        label="子公司"
        name="org.subsidiary"
        componentProps={{
          style: { width: 200 },
          hasClear: true,
          dataSource: SUBSIDIARIES,
        }}
        // effect={({ model, next }) => {
        //   if (!next) {
        //     model.setValue('org.shop', []);
        //   }
        // }}
      />

      <Form.ModelConsumer>
        {(model) => {
          return (
            model.getValue('org.subsidiary') != null && (
              <FormItem
                component="multiSelect"
                label="门店"
                name="org.shop"
                componentProps={{
                  hasClear: true,
                  dataSource: SHOPS,
                }}
                validate={(v) => (v.length > 3 ? '门店数据不能超过3个' : null)}
              />
            )
          );
        }}
      </Form.ModelConsumer>

      <ItemList name="items" />
    </Form>
  );
});

export function Explore1Example() {
  return <ExampleInner />;
}

const Friend = () => (
  <div className="friend">
    <FormItem component="input" label="昵称" name="title" required />
    <FormItem component="input" label="头像" name="content" required />
    <FormItem component="input" label="心情" name="feeling" />
    <Form.ModelConsumer>{(model) => <h2>朋友圈列表({model.getValue('quanquan', []).length})</h2>}</Form.ModelConsumer>

    <div style={{ border: '1px dashed #ccc', padding: 4 }}>
      <Form.Array name="quanquan" layout={arrayCard()}>
        <Quan />
      </Form.Array>
    </div>
  </div>
);

const Quan = () => (
  <div className="quan">
    <FormItem component="input" label="朋友圈主题" name="title" required defaultValue="" />
    <FormItem component="input" label="朋友圈正文" name="content" required />
    <FormItem component="testButtonGroup" label="心情" name="feeling" items={['😂', '😊', '😉', '😋']} />

    <h2>好友信息</h2>
    <div style={{ border: '1px dashed #ccc', padding: 4 }}>
      <Form.Object name="friend">
        <Friend />
      </Form.Object>
    </div>
  </div>
);

export function Fractal() {
  const [model] = useState(new RootModel());

  return (
    <Form model={model}>
      <Actions />
      <ValuePrinter label="分形表单" />
      <h1>分形表单</h1>

      <Quan />
    </Form>
  );
}
Fractal.storyName = '分形表单';
