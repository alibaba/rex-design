import { arrayCard, arrayTable, Form, FormEnvProvider, FormItem, useModel } from '@rexd/xform';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ValuePreview } from './helpers';

export default { title: 'XForm / 业务示例' };

// 表格布局
export function TableLayout() {
  const layout = arrayTable({
    defaultColumnWidth: 180,
    operationColumn: { lock: true },
    orderColumn: { width: 50, lock: true },
  });

  return (
    <Form defaultValue={{ array: [{}, {}] }}>
      <Form.Array name="array" layout={layout}>
        <FormItem component="input" name="aa" label="字段1" required />
        <FormItem component="input" name="bb" label="字段2" />
        <FormItem component="input" name="cc" label="字段3" />
        <FormItem component="dateRangePicker" name="dd" label="字段4" required x-table-column={{ width: 240 }} />
      </Form.Array>

      <Form.ModelConsumer>
        {(mod) =>
          mod.getValue('array', []).length > 3 && (
            <div style={{ color: 'var(--rex-colors-red-50)', marginTop: 4 }}>表格内的条目数量不能大于3</div>
          )
        }
      </Form.ModelConsumer>

      <ValuePreview />
    </Form>
  );
}

// 数组元素内的显示/隐藏控制
export function VisibilityControlInArrayItem() {
  return (
    <Form defaultValue={{ array: [{ show: true }, { show: false }] }} labelPosition="left">
      <Form.Array
        name="array"
        layout={arrayCard({ showItemOrder: true })}
        itemFactory={(arrayModel) => {
          return { show: arrayModel.values.length % 2 === 0 };
        }}
      >
        <FormItem component="switch" name="show" label="是否显示 输入框" defaultValue={false} />
        <Form.ModelConsumer>
          {(mod) => mod.getValue('show') && <FormItem component="input" name="input" label="输入框" required />}
        </Form.ModelConsumer>
      </Form.Array>
    </Form>
  );
}

// 内部订阅, 监听 person.effects.aaa 值改变，当变为 123 时，ddd 的值被设置
export function DeclarativeEffect() {
  return (
    <Form>
      <Form.Effect
        watch="person.effects.aaa"
        effect={(value, { model }) => {
          if (value === '123') {
            model.setValue('ddd', 'this is linkage relationship');
          } else if (value === '') {
            model.setValue('ddd', '');
          }
        }}
      />

      <p>内部订阅, 监听 person.effects.aaa 值改变，当变为 123 时，ddd 的值被设置；当 aaa 变为空时，ddd 也被清空</p>

      <Form.Object name="person.effects">
        <FormItem component="input" name="aaa" label="person.effects.aaa" />
        <FormItem component="input" name="bbb" label="person.effects.bbb" />
      </Form.Object>
      <FormItem component="input" name="ccc" label="ccc" />
      <FormItem component="input" name="ddd" label="ddd" />

      <ValuePreview />
    </Form>
  );
}

const SubGroup = observer(() => {
  const model = useModel();

  return (
    <>
      <FormItem component="switch" name="preview" label="开启预览" />
      <FormEnvProvider isPreview={model.getValue('preview')}>
        <FormItem component="input" name="username" label="用户名" />
        <FormItem component="numberInput" name="age" label="年龄" defaultValue={18} />
      </FormEnvProvider>
    </>
  );
});

export function LogicsWithinArrayItem() {
  return (
    <Form
      style={{ fontSize: 12 }}
      defaultValue={{ primary: {}, users: [{}, { username: 'My Name', preview: true }] }}
      labelPosition="left"
    >
      <Form.Object name="primary">
        <SubGroup />
      </Form.Object>

      <Form.Array name="users" layout={arrayCard({ showItemOrder: true })}>
        <SubGroup />
      </Form.Array>

      <ValuePreview />
    </Form>
  );
}
