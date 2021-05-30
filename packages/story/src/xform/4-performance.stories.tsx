import { Button } from '@rexd/core';
import { arrayCard, Form, FormItem, FormModel, modelUtils } from '@rexd/xform';
import { action } from 'mobx';
import { observer, Observer } from 'mobx-react-lite';
import React, { useState } from 'react';

export default { title: 'XForm / 性能测试' };

const ArrayExampleInner = observer(() => {
  const [model] = useState(
    () => new FormModel<any>({ items: [{ nps: 5 }] }),
  );

  return (
    <Form model={model} layout={{ labelPosition: 'top' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={() => modelUtils.validateAll(model)}>校验全部</Button>
        <Button onClick={() => modelUtils.clearError(model)}>清空错误</Button>
        <Button
          onClick={action(() => {
            modelUtils.clearError(model);
            model.values = { items: [{ nps: 5 }] };
          })}
        >
          重置表单
        </Button>
        <Button
          onClick={action(() => {
            if (model.values.items == null) {
              model.values.items = [];
            }
            for (let i = 0; i < 50; i++) {
              model.values.items.push({
                test: {
                  idType: ['身份证', '护照'][Math.floor(Math.random() * 2)],
                  cdType: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
                },
                nps: Math.floor(Math.random() * 7 + 1),
              });
            }
          })}
        >
          性能测试：在列表末尾追加 50 条项目
        </Button>
      </div>

      <Observer>
        {() => {
          const npsList: number[] = model.getValue('items').map((item: any) => item.nps);
          const avgNps = npsList.reduce((sum, nps) => sum + nps) / npsList.length;
          return <h1>Avg NPS: {avgNps}</h1>;
        }}
      </Observer>

      <Form.Array
        name="items"
        layout={arrayCard({ showItemOrder: true })}
        itemFactory={(arrayModel) => {
          const cntLength = arrayModel.values?.length;
          return { name: `name-${cntLength + 1}`, nps: 5 };
        }}
      >
        <div style={{ display: 'grid', grid: 'auto-flow / repeat(2, 1fr)' }}>
          <FormItem
            component="testButtonGroup"
            label="证件类型(test.idType)"
            name="test.idType"
            required
            componentProps={{ items: ['身份证', '护照', '行驶证'] }}
            validate={(value) => {
              if (value === '行驶证') {
                return '不可以用行驶证哦';
              }
            }}
          />
          <FormItem
            component="testButtonGroup"
            label="test.cdType"
            name="test.cdType"
            required
            componentProps={{ items: ['A', 'B', 'C', 'D'] }}
          />
          <FormItem component="input" label="名称" name="name" />
          <FormItem
            component="numberInput"
            name="nps"
            fallbackValue={4}
            label="NPS"
            componentProps={{ min: 0, max: 10, step: 1 }}
            validate={(v) => {
              if (v < 5) {
                return `给 ${v + 1} 分行不行`;
              }
            }}
          />
        </div>
      </Form.Array>
    </Form>
  );
});

export function 性能鸭测() {
  return <ArrayExampleInner />;
}
