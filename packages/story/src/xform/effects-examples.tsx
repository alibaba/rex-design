import { AsyncValue, Form, FormItem, FormModel } from '@rexd/xform';
import { observer } from 'mobx-react-lite';
import React from 'react';

const ALL_CITIES = [
  { prov: '浙江', cities: '杭州、绍兴、宁波、嘉兴、其他'.split('、') },
  { prov: '江苏', cities: '南京、常州、镇江、苏州、其他'.split('、') },
  { prov: '福建', cities: '厦门、福州、莆田、三明、其他'.split('、') },
];

const model1 = new FormModel({ prov: '', cities: [] });

const Example1_inner = observer(() => {
  const prov = model1.getField('prov');
  const cities = model1.getField('cities');

  return (
    <Form model={model1}>
      <FormItem
        component="singleSelect"
        label="省份(单选)"
        help="选择一个省份后，将显示城市下拉框"
        field={prov}
        componentProps={{
          hasClear: true,
          dataSource: ALL_CITIES.map((item) => item.prov),
        }}
      />
      {prov.value && (
        <FormItem
          component="multiSelect"
          label="城市(多选)"
          field={cities}
          componentProps={{
            hasClear: true,
            dataSource: ALL_CITIES.find((item) => item.prov === prov.value).cities,
          }}
        />
      )}
    </Form>
  );
});

export const Example1 = () => <Example1_inner />;

const model2 = new FormModel({ prov: '', cities: [] });

const Example2_inner = observer(() => {
  const prov = model2.getField('prov');
  const cities = model2.getField('cities');

  return (
    <Form model={model2}>
      <FormItem
        component="singleSelect"
        label="省份(单选)"
        help="选择一个省份后，将显示城市下拉框；切换省份时，城市将被清空"
        field={prov}
        componentProps={{
          hasClear: true,
          dataSource: ALL_CITIES.map((item) => item.prov),
        }}
      />
      {prov.value && (
        <FormItem
          component="multiSelect"
          label="城市(多选)"
          field={cities}
          componentProps={{
            hasClear: true,
            dataSource: ALL_CITIES.find((item) => item.prov === prov.value).cities,
          }}
        />
      )}
      <Form.Effect
        watch={prov}
        effect={() => {
          cities.value = [];
        }}
      />
    </Form>
  );
});

export const Example2 = () => <Example2_inner />;

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const model3 = new FormModel({ prov: '浙江', cities: [] });

const cityDataSource$ = new AsyncValue(
  async () => {
    // 依赖收集需要发生在同步代码块中
    const prov = model3.getValue('prov');

    // 根据省份拉取城市列表， 2000ms 延迟用于模拟实际情况
    await delay(2000);
    return ALL_CITIES.find((item) => item.prov === prov).cities;
  },
  /* 这个空数组表示城市数据源的初始值 */ [],
);

const Example3_inner = observer(() => {
  const prov = model3.getField('prov');
  const cities = model3.getField('cities');

  return (
    <Form model={model3}>
      <FormItem
        component="singleSelect"
        label="省份(单选)"
        help="切换省份时，异步加载城市数据源"
        field={prov}
        componentProps={{
          hasClear: true,
          dataSource: ALL_CITIES.map((item) => item.prov),
        }}
      />
      <FormItem
        component="multiSelect"
        label="城市(多选)"
        field={cities}
        help={cityDataSource$.status === 'loading' ? <span style={{ color: 'red' }}>loading...</span> : ''}
        componentProps={{
          hasClear: true,
          dataSource: cityDataSource$.current,
        }}
      />
      <Form.Effect
        watch={prov}
        effect={() => {
          cities.value = [];
        }}
      />
    </Form>
  );
});

export const Example3 = () => <Example3_inner />;
