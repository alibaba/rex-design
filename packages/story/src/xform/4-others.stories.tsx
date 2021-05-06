import { Box, Button, Dialog, Group, Switch, Toaster, Tooltip, useBoolean } from '@rexd/core';
import { arrayCard, arrayHelpers, Form, FormItem, modelUtils, RootModel, useModel } from '@rexd/xform';
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { bigTreeDataSource } from '../select/tree-select.stories';
import { Actions, BrowserOnlyReactJson, InjectModelToGlobal, ValuePreview, ValuePrinter } from './helpers';

export default { title: 'XForm / 其他示例' };

//#region 列表示例
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
        renderTarget={(arg) => (
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

const ArrayExampleInner = observer(() => {
  const [model] = useState(() => new RootModel<any>());

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

export function ArrayExample() {
  return <ArrayExampleInner />;
}
ArrayExample.storyName = '列表示例';
//#endregion

//#region 分形表单
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
//#endregion

//#region 候选人名单
const model = new RootModel({
  activeIndex: 0,
  items: [
    { id: 1001, name: '小明', gender: '男', phone: '18866668888' },
    { id: 1002, name: '小红', gender: '女' },
  ],
});

const Candidate = observer(() => {
  const mod = useModel();
  return (
    <>
      <FormItem name="name" label="姓名" component="input" required componentProps={{ style: { width: 120 } }} />
      <FormItem
        name="phone"
        label="联系电话"
        component="input"
        required
        componentProps={{ style: { width: 200 } }}
        validate={(v) => (/[\d-]{11,13}/.test(v) ? null : '请输入有效的手机号码')}
      />
      <FormItem name="gender" label="性别" component="testButtonGroup" required items={['男', '女']} />
      <FormItem name="originType" label="来源" component="testButtonGroup" required items={['社会招聘', '校园招聘']} />
      {mod.getValue('originType') === '校园招聘' ? (
        <>
          <FormItem
            name="school"
            label="毕业院校"
            required
            component="singleSelect"
            componentProps={{
              dataSource: '清华大学，北京大学，浙江大学，南京大学，复旦大学，上海交通大学，其他'.split('，'),
              style: { width: 150 },
            }}
          />
          <FormItem
            name="graduateDate"
            label="毕业时间"
            required
            component="datePicker"
            componentProps={{
              format: 'YYYY-MM',
            }}
          />
        </>
      ) : (
        <FormItem
          name="experience"
          label="工作年限"
          component="numberInput"
          defaultValue={0}
          componentProps={{ min: 0, max: 30 }}
        />
      )}
      <FormItem name="address" label="地址" component="input" />
    </>
  );
});

const CandidateListFormInner = observer(() => {
  const data = model.values;
  const arrayModel = model.getSubArray('items');

  const addCandidate = action(() => {
    const mod = arrayModel.getSubModel(String(model.values.activeIndex));

    const result = modelUtils.validateAll(mod);
    if (result.hasError) {
      Toaster.show({ placement: 'top', content: '请先完成当前表单' });
      return;
    }

    arrayHelpers.append(arrayModel);
    model.values.activeIndex = model.values.items.length - 1;
  });

  return (
    <div>
      <div style={{ display: 'flex', height: 400, border: 'solid 1px var(--rex-colors-emphasis-30)' }}>
        <div style={{ display: 'flex', flex: '0 0 250px', flexDirection: 'column' }}>
          {data.items.map((item, index) => (
            <div
              key={arrayHelpers.getKey(arrayModel, index)}
              onClick={action(() => {
                model.values.activeIndex = index;
              })}
              style={{
                cursor: 'pointer',
                paddingLeft: 16,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: data.activeIndex === index ? 'var(--rex-colors-primary-20)' : '',
              }}
            >
              <div>{item.name ?? <span style={{ color: 'var(--rex-colors-gray-60)' }}>[未填写姓名]</span>}</div>

              <Button
                size="small"
                shape="warning"
                style={{ marginLeft: 'auto', marginRight: 16 }}
                onClick={() => {
                  Dialog.confirm({
                    title: `确定要删除 ${item.name} 么？`,
                    // content: `确定要删除 ${item.name} 么？`,
                  }).then((res) => {
                    if (res) {
                      arrayHelpers.delete(arrayModel, index);
                    }
                  });
                }}
              >
                移除
              </Button>
            </div>
          ))}
          <Button onClick={addCandidate}>新增候选人</Button>
        </div>

        <div style={{ flex: 'auto', padding: 16, borderLeft: 'solid 1px var(--rex-colors-emphasis-30)' }}>
          <Form model={model.getSubModel(`items.${model.values.activeIndex}`)} labelPosition="left">
            <Candidate />
          </Form>
        </div>
      </div>

      <div style={{ margin: 4 }}>
        <Switch
          value={model.state.showReactJson}
          onChange={action((b) => {
            model.state.showReactJson = b;
          })}
        />
        显示 ReactJSON
      </div>

      {model.state.showReactJson && <BrowserOnlyReactJson src={toJS(model.values)} />}
    </div>
  );
});

export const CandidateListForm = () => <CandidateListFormInner />;
CandidateListForm.storyName = '候选人名单';
//#endregion

//#region 组件集成

const listData = [
  { label: '设计师', value: '01' },
  { label: '工程师', value: '02' },
  { label: '产品经理', value: '03' },
  { label: '测试开发', value: '04' },
];

const files = [
  {
    id: '01',
    name: 'IMG.png',
    url: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
  },
  {
    id: '02',
    name: 'long.png',
    url: 'https://img.alicdn.com/tfs/TB1gjPyp9slXu8jSZFuXXXg7FXa-750-272.png',
  },
];

export function ComponentsIntegration() {
  const [isPreview, { toggle }] = useBoolean(false);
  const [labelPosition, setLabelPosition] = useState<'top' | 'left'>('left');

  return (
    <Box>
      <div style={{ display: 'flex', gap: 32 }}>
        <Button type="primary" onClick={toggle}>
          切换预览态
        </Button>
        <Button
          onClick={() => {
            setLabelPosition(labelPosition === 'top' ? 'left' : 'top');
          }}
        >
          切换标签位置
        </Button>
      </div>

      <Form
        isPreview={isPreview}
        labelPosition={labelPosition}
        defaultValue={{
          filePicker: files,
          mediaPicker: files,
        }}
        onError={(errors) => console.log('onError:', errors)}
        onSubmit={(values) => console.log('onSubmit:', values)}
      >
        <FormItem label="开关" name="switch" component="switch" required />
        <FormItem label="复选框" name="checkboxGroup" component="checkboxGroup" required dataSource={listData} />
        <FormItem label="单选框" name="radioGroup" component="radioGroup" required dataSource={listData} />
        <FormItem label="文件上传" name="filePicker" component="filePicker" />
        <FormItem label="媒体上传" name="mediaPicker" component="mediaPicker" />
        <FormItem label="输入框" name="input" component="input" required />
        <FormItem label="多行输入" name="textarea" component="textarea" required />
        <FormItem label="数字输入" name="numberInput" component="numberInput" required />
        <FormItem label="时间" name="time" component="timePicker" required />
        <FormItem label="日期" name="date" component="datePicker" required />
        <FormItem label="日期范围" name="dateRange" component="dateRangePicker" required />
        <FormItem label="下拉选择" name="select" component="select" required dataSource={listData} />
        <FormItem label="树选择" name="treeSelect" component="treeSelect" required dataSource={bigTreeDataSource} />
        <FormItem label="范围" name="range" component="range" required />

        <Group>
          <Form.Submit />
          <Form.Reset />
        </Group>

        <ValuePreview />
      </Form>
    </Box>
  );
}
ComponentsIntegration.storyName = '组件集成';
//#endregion
