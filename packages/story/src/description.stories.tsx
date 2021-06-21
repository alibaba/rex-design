import React from 'react';
import { Description, Group, Image, BaseTable } from '@rexd/core';

export default { title: 'Description' };

export function Basic() {
  const items = [
    {
      label: '退款单号',
      content: '2342345231515',
    },
    {
      label: '这是一个比较长的标签',
      content: '45654645',
    },
    {
      label: '退款金额',
      content: '￥18.00',
    },
    {
      label: '退款原因',
      content: '无理由退货',
      color: 'error.normal',
    },
    {
      label: '交易金额',
      content: '￥28.00',
    },
    {
      label: '退款说明',
      content: '备注备注',
    },
    {
      label: '收货地址',
      content: '浙江省 杭州市 余杭区 文一西路 969 号一号楼邮局',
      span: 3,
    },
  ];

  return <Description items={items} />;
}

export function Complex() {
  const items = [
    {
      label: '退款单号',
      content: '2342345231515',
    },
    {
      label: '采退类型',
      content: '45654645',
    },
    {
      label: '退款金额',
      content: '￥18.00',
    },
    {
      label: '退款原因',
      content: '无理由退货',
    },
    {
      label: '交易金额',
      content: '￥28.00',
    },
    {
      label: '退款说明',
      content: '备注备注',
    },
    {
      label: '收货地址',
      content: '浙江省 杭州市 余杭区 文一西路 969 号一号楼邮局',
      span: 3,
    },
    {
      label: '图片列表',
      content: [
        {
          url: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
        },
        {
          url: 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png',
        },
      ],
      span: 3,
      renderContent: ({ content }: { content: any[] }) => {
        return (
          <Group>
            {content.map((item, index) => (
              <Image key={index} src={item.url} width="100px" height="100px" />
            ))}
          </Group>
        );
      },
    },
    {
      label: '退款详情',
      content: [
        {
          title: '配送服务',
          price: '10.00',
        },
        {
          title: '盒马公仔',
          price: '18.00',
        },
      ],
      span: 3,
      renderContent: ({ content }: { content: any[] }) => {
        return (
          <BaseTable
            dataSource={content}
            columns={[
              { name: '商品名称', code: 'title' },
              { name: '商品价格', code: 'price' },
            ]}
          />
        );
      },
    },
  ];
  return <Description items={items as any[]} />;
}

export function Columns() {
  const items = [
    {
      label: '退款单号',
      content: '2342345231515',
    },
    {
      label: '采退类型',
      content: '45654645',
    },
    {
      label: '退款金额',
      content: '￥18.00',
    },
    {
      label: '退款原因',
      content: '无理由退货',
    },
    {
      label: '交易金额',
      content: '￥28.00',
    },
    {
      label: '退款说明',
      content: '备注备注',
    },
    {
      label: '收货地址',
      content: '浙江省 杭州市 余杭区 文一西路 969 号一号楼邮局',
    },
  ];
  return <Description columns={1} items={items} />;
}
