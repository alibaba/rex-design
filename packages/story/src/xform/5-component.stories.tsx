import { Button } from '@rexd/core';
import { Form, FormItem } from '@rexd/xform';
import React, { useReducer, useState } from 'react';
import styled from 'styled-components';

export default { title: 'XForm / 组件集成' };

const listData = [
  { label: '上海子公司', value: 'sh' },
  { label: '北京子公司', value: 'bj' },
  { label: '杭州子公司', value: 'hz' },
];

const treeData = [
  {
    label: '上海子公司',
    value: 'sh',
    children: [
      { label: '曹家渡店', value: '001' },
      { label: '上海湾店', value: '002' },
      { label: '虹桥店', value: '003' },
    ],
  },
  {
    label: '北京子公司',
    value: 'bj',
    children: [
      { label: '十里堡店', value: '004' },
      { label: '顺义店', value: '005' },
    ],
  },
  {
    label: '杭州子公司',
    value: 'hz',
    children: [
      { label: '亲橙里店', value: '006' },
      { label: '万象汇店', value: '007' },
      { label: '星光大道店', value: '008' },
    ],
  },
];

const defaultFileList = [
  {
    uid: '0',
    name: 'IMG.png',
    state: 'done',
    url: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
    downloadURL: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
    imgURL: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
    size: 2000,
  },
  {
    uid: '1',
    name: 'IMG.png',
    percent: 50,
    state: 'uploading',
    url: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
    downloadURL: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
    imgURL: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
  },
  {
    uid: '2',
    name: 'IMG.png',
    state: 'error',
    url: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
    downloadURL: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
    imgURL: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
    errorMsg: 'fail to upload something',
  },
  {
    uid: '3',
    name: 'IMG.png',
    state: 'error',
    url: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
    downloadURL: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
    imgURL: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
  },
];

const StyledForm = styled(Form)`
  border: 1px dashed #ccc;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 8px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export function ComponentsIntegration() {
  const [isPreview, toggle] = useReducer((x) => !x, false);
  const [labelPosition, setLabelPosition] = useState<'top' | 'left'>('left');

  return (
    <div>
      <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
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
      <StyledForm
        isPreview={isPreview}
        layout={{ labelPosition }}
        onSubmit={(values) => console.log('onSubmit:', values)}
        onError={(errors) => console.error('onError:', errors)}
        defaultValue={{
          upload: defaultFileList,
          imageUpload: defaultFileList,
        }}
      >
        <div>
          <FormItem
            label="复选框"
            name="checkbox"
            component="checkbox"
            componentProps={{
              label: '是否选中',
            }}
          />
          <FormItem label="复选框" name="checkboxGroup" component="checkboxGroup" dataSource={listData} />
          <FormItem label="单选框" name="radioGroup" component="radioGroup" dataSource={listData} />
          <FormItem label="进度" name="range" component="range" />
          <FormItem label="开关" name="switch" component="switch" />
          <FormItem label="输入范围" name="rangeInput" component="rangeInput" />
          <FormItem label="尺寸输入" name="size" component="size" />
          <FormItem label="数字选择器" name="numberInput" component="numberInput" />
          <FormItem label="日期选择" name="datePicker" component="datePicker" />
          <FormItem label="日期范围选择" name="rangePicker" component="rangePicker" />
          <FormItem label="月份选择" name="monthPicker" component="monthPicker" />
          <FormItem label="年份月份" name="yearPicker" component="yearPicker" />
        </div>

        <div>
          <FormItem label="时间选择" name="timePicker" component="timePicker" />
          <FormItem label="时间范围选择" name="timeRangePicker" component="timeRangePicker" />
          <FormItem label="输入框" name="input" component="input" />
          <FormItem label="文本域" name="textArea" component="textArea" />
          <FormItem label="列表单选" name="select" component="select" dataSource={listData} />
          <FormItem
            label="列表多选"
            name="multiSelect"
            component="select"
            dataSource={listData}
            componentProps={{
              mode: 'multiple',
            }}
          />
          <FormItem label="树形单选" name="treeSelect" component="treeSelect" dataSource={treeData} />
          <FormItem
            label="树形多选"
            name="multiTreeSelect"
            component="treeSelect"
            dataSource={treeData}
            componentProps={{
              mode: 'multiple',
              treeCheckable: true,
            }}
          />
          <FormItem label="级联单选" name="cascaderSelect" component="cascaderSelect" dataSource={treeData} />
          <FormItem
            label="级联多选"
            name="multiCascaderSelect"
            component="cascaderSelect"
            dataSource={treeData}
            componentProps={{
              multiple: true,
            }}
          />
        </div>

        <div>
          <FormItem
            label="文件上传"
            name="upload"
            component="upload"
            componentProps={{
              action: 'https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload',
              children: <Button>上传文件</Button>,
            }}
          />
          <FormItem label="图片上传" name="imageUpload" component="imageUpload" />
        </div>

        <div style={{ marginLeft: labelPosition === 'top' ? 0 : 'var(--label-width)', display: 'flex', gap: 16 }}>
          <Form.Submit />
          <Form.Reset />
        </div>
      </StyledForm>
    </div>
  );
}
