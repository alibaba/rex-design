import { Button, dayjs } from '@rexd/core';
import { Form, FormItem, modelUtils, FormModel } from '@rexd/xform';
import { action } from 'mobx';
import React from 'react';
import { ValuePreview } from './helpers';

export default { title: 'XForm / 基本示例' };

const simpleFormModel = new FormModel({
  name: '小河马',
  phone: '188-8888-8888',
  address: '杭州市余杭区文一西路969号',
});

export function Basic() {
  return (
    <Form model={simpleFormModel}>
      <FormItem component="input" label="姓名" name="name" required />
      <FormItem component="input" label="电话" name="phone" required />
      <FormItem component="input" label="地址" name="address" />
      <ValuePreview />
    </Form>
  );
}

export function BasicUncontrolled() {
  return (
    <Form
      defaultValue={{
        name: '小河马',
        phone: '',
        address: '杭州市余杭区文一西路969号',
      }}
      onSubmit={(values) => console.log('onSubmit:', values)}
      onError={(errors) => console.log('onError:', errors)}
      onReset={() => console.log('onReset')}
    >
      <FormItem component="input" label="姓名" name="name" required />
      <FormItem component="input" label="电话" name="phone" required />
      <FormItem component="input" label="地址" name="address" />

      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <Form.Submit />
        <Form.Reset />
      </div>
    </Form>
  );
}

export function NestedField() {
  return (
    <Form>
      <FormItem component="input" label="名称" name="foo.bar.buzz" required />
      <ValuePreview defaultShow />
    </Form>
  );
}

export function Validation() {
  return (
    <Form>
      <FormItem
        component="input"
        label="名称"
        name="商品编码"
        required
        componentProps={{ placeholder: '请输入商品编码' }}
        validator={(value: string) => {
          let error;
          if (!value) {
            error = '该字段必填';
          } else if (value.toLowerCase() !== 'sku1234') {
            error = '可以输入 sku1234 试试';
          }
          return error;
        }}
      />
    </Form>
  );
}

export function BasicEffect() {
  return (
    <Form defaultValue={{ subsidiary: '北京', shops: ['杭州东新东路店'] }}>
      <Form.Effect
        watch="subsidiary"
        effect={(value, { model }) => {
          model.setValue('shops', []);
        }}
      />
      <FormItem
        component="singleSelect"
        label="子公司 (切换子公司后，门店将被清空)"
        name="subsidiary"
        componentProps={{
          dataSource: '北京，上海，浙江，广州'.split('，'),
        }}
      />
      <FormItem
        component="multiSelect"
        name="shops"
        label="门店"
        componentProps={{
          hasClear: true,
          dataSource: [
            '杭州东新东路店',
            '盒马杭州解百店',
            '杭州临平中都店',
            '杭州亲橙里店',
            '杭州庆春店',
            '杭州下沙银泰店',
            '杭州星光大道店',
            '杭州西溪龙湖店',
            '杭州闸弄口店',
          ],
        }}
      />

      <ValuePreview />
    </Form>
  );
}

export function InnerLayout() {
  return (
    <Form>
      <div style={{ border: '1px dashed #ccc', padding: 8 }}>
        <p style={{ marginBottom: 8, fontWeight: 'bold' }}>商品参数</p>
        <FormItem component="input" label="SKU code" name="sku.code" required />
        <FormItem component="input" label="SKU 名称" name="sku.name" />
      </div>

      <div style={{ marginTop: 12, border: '1px dashed #ccc', padding: 8 }}>
        <p style={{ marginBottom: 8, fontWeight: 'bold' }}>查询参数</p>
        <FormItem
          component="datePicker"
          label="查询日期"
          name="date.current"
          defaultValue={dayjs().format('YYYY-MM-DD')}
          componentProps={{ format: 'YYYY-MM-DD' }}
        />
        <FormItem
          component="datePicker"
          label="对比日期"
          name="date.compare"
          defaultValue={dayjs().subtract(1, 'day').format('YYYY-MM-DD')}
          componentProps={{ format: 'YYYY-MM-DD' }}
        />
      </div>
      <ValuePreview />
    </Form>
  );
}

const model = new FormModel({
  name: '小河马',
  phone: '',
  address: '杭州市余杭区文一西路969号',
  idType: 'id',
});

export function WithActions() {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Button onClick={() => modelUtils.validateAll(model)}>校验全部</Button>
        <Button onClick={() => modelUtils.clearError(model)}>清空错误</Button>
        <Button
          onClick={action(() => {
            model.values = {} as any;
            modelUtils.clearError(model);
          })}
        >
          重置表单
        </Button>
      </div>

      <Form model={model}>
        <FormItem component="input" label="姓名" name="name" required />
        <FormItem component="input" label="电话" name="phone" required />
        <FormItem component="input" label="地址" name="address" />
        <ValuePreview />
      </Form>
    </div>
  );
}
