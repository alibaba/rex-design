import { Button } from '@rexd/core';
import { Form, FormItem, FormModel, modelUtils } from '@rexd/xform';
import { action } from 'mobx';
import { Observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { useState } from 'react';
import { ValuePreview } from './helpers';

export default { title: 'XForm / 基本示例' };

const model1 = new FormModel({
  name: '小河马',
  phone: '188-8888-8888',
  address: '杭州市余杭区文一西路969号',
});

export function Basic() {
  return (
    <Form model={model1}>
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
      layout={{ labelPosition: 'top' }}
    >
      <FormItem component="input" label="姓名" name="name" required />
      <FormItem component="input" label="电话" name="phone" required />
      <FormItem component="input" label="地址" name="address" />

      <div style={{ display: 'flex', gap: 16 }}>
        <Form.Submit />
        <Form.Reset />
      </div>
    </Form>
  );
}

export function ItemGroup() {
  return (
    <Form>
      <FormItem component="input" label="实验姓名" name="name" required />

      <Form.ItemGroup label="实验目标2" labelWidth={50} controlWidth={200}>
        <FormItem
          label="从"
          component="select"
          required
          name="arg.from"
          componentProps={{ hasClear: true, dataSource: '1234'.split('') }}
        />
        <FormItem
          label="至"
          component="select"
          name="arg.to"
          componentProps={{ hasClear: true, dataSource: '1234'.split('') }}
          required
        />
      </Form.ItemGroup>

      <ValuePreview defaultShow />
    </Form>
  );
}

export function NestedDataIndex() {
  return (
    <Form>
      <FormItem
        component="input"
        label="名称"
        name="foo.bar.buzz"
        required
        tip="输入后在下方的 json 查看器中检查嵌套数据索引"
      />
      <ValuePreview defaultShow />
    </Form>
  );
}
NestedDataIndex.storyName = '嵌套的数据索引';

export function Validation() {
  return (
    <Form>
      <FormItem
        component="input"
        label="名称"
        name="商品编码"
        required
        componentProps={{ placeholder: '请输入商品编码' }}
        validate={(value: string) => {
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

const ALL_CITIES = [
  { prov: '浙江', cities: '杭州、绍兴、宁波、嘉兴、其他'.split('、') },
  { prov: '江苏', cities: '南京、常州、镇江、苏州、其他'.split('、') },
  { prov: '福建', cities: '厦门、福州、莆田、三明、其他'.split('、') },
];

const model2 = new FormModel({ prov: '浙江', cities: ['杭州', '绍兴'] });

export function BasicEffect() {
  const prov = model2.getField('prov');
  const cities = model2.getField('cities');

  return (
    <Observer>
      {() => (
        <Form model={model2}>
          <FormItem
            component="singleSelect"
            label="省份(单选)"
            field={prov}
            componentProps={{ dataSource: ALL_CITIES.map((item) => item.prov) }}
          />
          <FormItem
            component="multiSelect"
            label="城市(多选)"
            field={cities}
            componentProps={{
              hasClear: true,
              dataSource: ALL_CITIES.find((item) => item.prov === prov.value).cities,
            }}
          />

          <Form.Effect
            watch={prov}
            effect={() => {
              cities.value = [];
            }}
          />

          <ValuePreview />
        </Form>
      )}
    </Observer>
  );
}

export function LayoutWithCustomDiv() {
  return (
    <Form layout={{ labelPosition: 'left' }}>
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
          fallbackValue={moment().format('YYYY-MM-DD')}
          componentProps={{ format: 'YYYY-MM-DD' }}
        />
        <FormItem
          component="datePicker"
          label="对比日期"
          name="date.compare"
          fallbackValue={moment().subtract(1, 'day').format('YYYY-MM-DD')}
          componentProps={{ format: 'YYYY-MM-DD' }}
        />
      </div>
      <ValuePreview />
    </Form>
  );
}

const model4 = new FormModel({
  name: '小河马',
  phone: '',
  address: '杭州市余杭区文一西路969号',
  idType: 'id',
});

export function WithActions() {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Button onClick={() => modelUtils.validateAll(model4)}>校验全部</Button>
        <Button onClick={() => modelUtils.clearError(model4)}>清空错误</Button>
        <Button
          onClick={action(() => {
            model4.values = {} as any;
            modelUtils.clearError(model4);
          })}
        >
          重置表单
        </Button>
      </div>

      <Form model={model4}>
        <FormItem
          component="input"
          label="姓名"
          name="name"
          required
          help="help text...."
          tip="tip content"
          componentProps={{ hasClear: true }}
        />
        <FormItem component="input" label="电话" name="phone" required help />
        <FormItem component="input" label="地址" name="address" />
        <ValuePreview />
      </Form>
    </div>
  );
}

export function TupleField() {
  const [model] = useState(() => new FormModel({ start: '', end: '', dateRange: ['', ''] }));

  console.log('TupleField:', model);

  return (
    <Form model={model} layout={{ labelWidth: 200 }}>
      <FormItem
        label="使用 tupleField(start, end)"
        component="dateRangePicker"
        field={model.getTupleField('start', 'end')}
      />
      <FormItem label="使用普通 field(dateRange)" component="dateRangePicker" name="dateRange" />
      <ValuePreview defaultShow />
    </Form>
  );
}

export function ForkField() {
  const [model] = useState(() => new FormModel({ name: '小河马' }));
  const nameField = model.getField('name');

  console.log('ForkField:', model);

  return (
    <Form model={model}>
      <FormItem label="original field" component="input" field={nameField} required />
      <FormItem label="fork(test) field" component="input" disabled field={nameField.getFork('test')} />

      <ValuePreview />
    </Form>
  );
}
