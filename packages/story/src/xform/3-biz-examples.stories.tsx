import { Button, Confirm, Notice, Switch } from '@rexd/core';
import { arrayCard, arrayHelpers, arrayTable, Form, FormItem, FormModel, modelUtils, useModel } from '@rexd/xform';
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrowserOnlyReactJson, ValuePreview } from './helpers';

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
        <FormItem component="dateRangePicker" name="dd" label="字段4" required x-table-column={{ width: 280 }} />
      </Form.Array>

      <Form.ModelConsumer>
        {(mod) =>
          mod.getValue('array', []).length > 3 && (
            <div style={{ color: 'red', marginTop: 4 }}>表格内的条目数量不能大于3</div>
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
    <Form defaultValue={{ array: [{ show: true }] }}>
      <Form.Array name="array" layout={arrayCard({ showItemOrder: true })}>
        <FormItem component="checkbox" name="show" label="是否显示 输入框" />
        <Form.ModelConsumer>
          {(mod) => mod.getValue('show') && <FormItem component="input" name="input" label="输入框" />}
        </Form.ModelConsumer>
      </Form.Array>
    </Form>
  );
}

const model = new FormModel({
  activeIndex: 0,
  items: [
    { id: 1001, name: '小明', gender: '男', phone: '18866668888' },
    { id: 1002, name: '小红', gender: '女', phone: '' },
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
        validate={(v) => (/[\d-]{11,13}/.test(v) ? null : '请输入有效的手机号码（11位数字）')}
      />
      <FormItem
        name="gender"
        label="性别"
        component="testButtonGroup"
        required
        componentProps={{ items: ['男', '女'] }}
      />
      <FormItem
        name="originType"
        label="来源"
        component="testButtonGroup"
        required
        componentProps={{ items: ['校园招聘', '社会招聘'] }}
      />
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
          fallbackValue={0}
          componentProps={{ min: 0, max: 30 }}
        />
      )}
      <FormItem name="address" label="地址" component="input" />
    </>
  );
});

const CandidateListFormInner = observer(() => {
  const data = model.values;
  const arrayModel = model.getSubModel('items');

  const addCandidate = action(() => {
    const mod = arrayModel.getSubModel(model.values.activeIndex);

    modelUtils.validateAll(mod).then(
      action((result) => {
        if (result.hasError) {
          Notice.warning({ title: '请先完成当前表单', closeable: true });
          return;
        }

        arrayHelpers.append(arrayModel);
        model.values.activeIndex = model.values.items.length - 1;
      }),
    );
  });

  return (
    <div>
      <div style={{ display: 'flex', height: 400, border: 'solid 1px #ccc' }}>
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
                backgroundColor: data.activeIndex === index ? '#ccc' : '',
              }}
            >
              <div>{item.name ?? <span style={{ color: '#999' }}>[未填写姓名]</span>}</div>

              <Confirm
                title={`确定要删除 ${item.name} 么？`}
                onOk={() => {
                  arrayHelpers.delete(arrayModel, index);
                  if (arrayModel.values.length === 0) {
                    addCandidate();
                  }
                }}
              >
                <Button size="small" style={{ marginLeft: 'auto', marginRight: 16 }}>
                  移除
                </Button>
              </Confirm>
            </div>
          ))}
          <Button onClick={addCandidate}>新增候选人</Button>
        </div>

        <div style={{ flex: 'auto', padding: 16, borderLeft: 'solid 1px #ccc' }}>
          <Form model={model.getSubModel('items').getSubModel(model.values.activeIndex)}>
            <Candidate />
          </Form>
        </div>
      </div>

      <div style={{ margin: 4 }}>
        <Switch
          checked={model.state.showReactJson}
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
