import { Button, Dialog, Switch } from '@rexd/core';
import { Toaster } from '@rexd/core';
import { arrayHelpers, Form, FormItem, modelUtils, RootModel, useModel } from '@rexd/xform';
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrowserOnlyReactJson } from '../helpers';

export default { title: 'XForm / 候选人录入表单' };

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
