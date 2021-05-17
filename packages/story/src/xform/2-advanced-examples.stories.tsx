import { dayjs, Group, Toaster } from '@rexd/core';
import { arrayCard, Form, FormItem, FormModel } from '@rexd/xform';
import React, { useState } from 'react';
import { ValuePreview } from './helpers';

export default { title: 'XForm / 进阶示例' };

function PersonForm({
  name,
  label,
  ...others
}: { name: string; label: React.ReactNode } & React.DelHTMLAttributes<HTMLDivElement>) {
  return (
    <div {...others} style={{ border: '1px dashed var(--rex-colors-emphasis-30)', ...others.style }}>
      <p style={{ fontWeight: 'bold', margin: '12px 0 8px 8px' }}>{label}</p>
      <Form.Object name={name}>
        <FormItem component="input" name="name" label="姓名" required componentProps={{ style: { width: 150 } }} />
        <FormItem component="input" name="age" label="年龄" required componentProps={{ style: { width: 100 } }} />
        <FormItem
          component="testButtonGroup"
          name="gender"
          required
          label="性别"
          componentProps={{ items: ['男', '女'] }}
        />
        <FormItem
          component="input"
          name="contact"
          label="联系方式"
          required
          componentProps={{ style: { width: 200 } }}
        />
        <FormItem
          component="singleSelect"
          name="address.city"
          label="居住城市"
          required
          componentProps={{ dataSource: '杭州，上海，北京，深圳，广州，武汉，成都'.split('，'), style: { width: 200 } }}
        />
        <FormItem component="input" name="address.detail" label="详细地址" componentProps={{ style: { width: 240 } }} />
      </Form.Object>
    </div>
  );
}

export function ObjectExample() {
  return (
    <Form
      defaultValue={{
        me: {
          name: 'rex design',
          gender: '男',
          age: '1',
          contact: 'alibaba.github.io/rex-design/',
          address: { city: '杭州' },
        },
      }}
    >
      <h4>家庭信息登记表</h4>
      <div style={{ display: 'grid', grid: 'auto-flow / repeat(auto-fill, minmax(360px, auto))', gap: 8 }}>
        <PersonForm name="me" label="个人信息" />
        <PersonForm name="father" label="父亲" />
        <PersonForm name="mother" label="母亲" />
        <PersonForm name="urgency" label="其他紧急联系人" />
      </div>

      <ValuePreview />
    </Form>
  );
}

const BRANDS = ['韩都衣舍', 'ZARA', '优衣库', '太平鸟'];
const STYLES = '通勤，百搭，时尚，休闲，原创设计，复古，民族风，优雅，性感，朴实，居家'.split('，');

function showSubmitToast(values: any) {
  Toaster.show({
    content: (
      <div>
        <p style={{ marginBottom: 4, color: '--rex-colors-green-60' }}>正在提交...</p>
        <span style={{ fontFamily: 'monospace' }}>{JSON.stringify(values, null, 2)}</span>
      </div>
    ),
  });
}

function showErrorToast(errors: any) {
  Toaster.show({
    content: (
      <div>
        <p style={{ marginBottom: 4, color: 'var(--rex-colors-red-60)' }}>表单中包含错误！</p>
        <span style={{ fontFamily: 'monospace' }}>{JSON.stringify(errors, null, 2)}</span>
      </div>
    ),
  });
}

export function ArrayExample() {
  return (
    <Form
      defaultValue={{ tickets: [{ name: 'feichao', date: dayjs().format('YYYY-MM-DD') }] }}
      onSubmit={(values) => {
        console.log('onSubmit:', values);
        showSubmitToast(values);
      }}
      onError={(errors) => {
        console.log('onError:', errors);
        showErrorToast(errors);
      }}
      onReset={(model) => {
        model.values = { tickets: [{ name: 'feichao', date: dayjs().format('YYYY-MM-DD') }] };
      }}
    >
      <h4>客户满意度调查列表</h4>
      <Form.Array name="tickets" layout={arrayCard({ showItemOrder: true })}>
        <FormItem
          component="input"
          label="客户名称"
          name="name"
          required
          componentProps={{ style: { maxWidth: 200 } }}
        />
        <FormItem component="datePicker" label="购买日期" name="date" required />
        <FormItem component="testButtonGroup" label="品牌" name="brand" componentProps={{ items: BRANDS }} required />
        <FormItem
          component="singleSelect"
          label="风格"
          name="style"
          required
          componentProps={{ dataSource: STYLES, style: { maxWidth: 200 } }}
        />
        <FormItem
          component="testButtonGroup"
          name="satisfaction"
          label="客户满意度"
          required
          componentProps={{ items: '非常满意，满意，基本满意，不满意，非常不满意'.split('，') }}
        />
        <FormItem component="input" label="客户联系方式" name="contact" componentProps={{ style: { maxWidth: 200 } }} />
        <FormItem component="input" label="客户联系地址" name="address" />
      </Form.Array>

      <Group mt="m">
        <Form.Submit />
        <Form.Reset />
      </Group>

      <ValuePreview />
    </Form>
  );
}

export function SelfReference() {
  const [root] = useState(new FormModel({ texts: [] as string[] }));

  return (
    <Form model={root}>
      <Form.Array name="texts" layout={arrayCard({ showItemOrder: true })} itemFactory={() => ''}>
        <FormItem component="input" label="姓名" name="&" componentProps={{ placeholder: '请输入你的名字' }} />
      </Form.Array>
      <ValuePreview />
    </Form>
  );
}
