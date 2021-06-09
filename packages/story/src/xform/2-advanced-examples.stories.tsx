import { Box, Toaster } from '@rexd/core';
import { arrayCard, AsyncValue, Form, FormItem, FormModel } from '@rexd/xform';
import { observer } from 'mobx-react-lite';
import dayjs from 'moment';
import React from 'react';
import { ValuePreview } from './helpers';

export default { title: 'XForm / 进阶示例' };

function PersonForm({
  name,
  label,
  ...others
}: { name: string; label: React.ReactNode } & React.DelHTMLAttributes<HTMLDivElement>) {
  return (
    <div {...others} style={{ padding: 8, border: '1px dashed #aaa', ...others.style }}>
      <p style={{ fontWeight: 'bold', margin: '0 0 8px 8px' }}>{label}</p>
      <Form.Object name={name}>
        <FormItem component="input" name="name" label="姓名" componentProps={{ style: { width: 120 } }} />
        <FormItem component="input" name="contact" label="联系方式" componentProps={{ style: { width: 180 } }} />
        <FormItem
          style={{ marginBottom: 0 }}
          component="singleSelect"
          name="address.city"
          label="居住城市"
          required
          componentProps={{
            style: { width: 100 },
            dataSource: '杭州，上海，北京，深圳，广州，武汉，成都'.split('，'),
          }}
        />
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
      layout={{ labelWidth: 80, formItemGap: 8 }}
    >
      <h4>家庭信息登记表</h4>
      <div style={{ display: 'grid', grid: 'auto-flow / repeat(auto-fill, minmax(280px, auto))', gap: 8 }}>
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
    placement: 'top-right',
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
    placement: 'top-right',
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

      <Box mt="m">
        <Form.Submit />
        <Form.Reset />
      </Box>

      <ValuePreview />
    </Form>
  );
}

export function ArrayOfString() {
  return (
    <Form defaultValue={{ texts: [] }}>
      <Form.Array name="texts" layout={arrayCard({ showItemOrder: true })} itemFactory={() => ''}>
        <FormItem component="input" label="姓名" name="&" componentProps={{ placeholder: '请输入你的名字' }} />
      </Form.Array>
      <ValuePreview />
    </Form>
  );
}

const ALL_CITIES = [
  { prov: '浙江', cities: '杭州、绍兴、宁波、嘉兴、其他'.split('、') },
  { prov: '江苏', cities: '南京、常州、镇江、苏州、其他'.split('、') },
  { prov: '福建', cities: '厦门、福州、莆田、三明、其他'.split('、') },
];

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const model3 = new FormModel({
  prov: '浙江',
  cities: [] as string[],
  districts: [] as string[],
});

const cityDataSource$ = new AsyncValue(async () => {
  // 依赖收集需要发生在同步代码块中
  const prov = model3.getValue('prov');

  // 根据省份拉取城市列表， 1000ms 延迟用于模拟实际情况
  await delay(1000);
  return ALL_CITIES.find((item) => item.prov === prov).cities;
}, []);

const districtDataSource$ = new AsyncValue(async () => {
  // 依赖收集需要发生在同步代码块中
  const cities: string[] = model3.getValue('cities');

  // 根据省份拉取城市列表， 1000ms 延迟用于模拟实际情况
  await delay(1000);
  return cities.flatMap((city) => [`${city}_001区`, `${city}_002区`, `${city}_003区`]);
}, []);

const AsyncEffectInner = observer(() => {
  const prov = model3.getField('prov');
  const cities = model3.getField('cities');
  const districts = model3.getField('districts');

  return (
    <Form model={model3}>
      <FormItem
        component="singleSelect"
        label="省份(单选)"
        name="prov"
        componentProps={{ dataSource: ALL_CITIES.map((item) => item.prov) }}
      />
      <FormItem
        component="multiSelect"
        label="城市(多选)"
        name="cities"
        help={cityDataSource$.status === 'loading' ? <span style={{ color: 'red' }}>loading...</span> : undefined}
        componentProps={{
          hasClear: true,
          dataSource: cityDataSource$.current,
        }}
      />
      <FormItem
        component="multiSelect"
        label="行政区(多选)"
        name="districts"
        help={districtDataSource$.status === 'loading' ? <span style={{ color: 'red' }}>loading...</span> : undefined}
        componentProps={{
          hasClear: true,
          dataSource: districtDataSource$.current,
        }}
      />

      {/* 切换「省份」时，清空城市 */}
      <Form.Effect
        watch={prov}
        effect={() => {
          cities.value = [];
        }}
      />

      {/* 城市列表加载完成时，自动设置为第一个城市 */}
      <Form.Effect
        watch={cityDataSource$}
        effect={(cityList) => {
          cities.value = cityList.slice(0, 1);
        }}
      />

      {/* 切换城市时，移除无效的行政区 */}
      <Form.Effect
        watch={cities}
        effect={(cities) => {
          const isValid = (district: string) => cities.includes(district.slice(0, 2));
          districts.value = districts.value.filter(isValid);
        }}
      />

      <ValuePreview />
    </Form>
  );
});

export function AsyncEffect() {
  return <AsyncEffectInner />;
}
