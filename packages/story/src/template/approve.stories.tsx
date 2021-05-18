import React from 'react';
import { Box, PageHeader, Timeline, TimelineItem, FooterToolbar, Description } from '@rexd/core';
import { Panel } from './panel';

export default {
  title: 'Template/Approve',
  parameters: {
    layout: 'fullscreen',
  },
};

interface TicketItemProps {
  user?: string;
  time?: string;
  label?: string;
}

function TicketItem(props: TicketItemProps) {
  const { user, time, label } = props;
  return (
    <Box mt="m">
      <Box>{user}</Box>
      <Box>{time}</Box>
      <Box>{label}</Box>
    </Box>
  );
}

export function ApproveTicket() {
  const actions = [
    { key: 'approve', label: '通过', shape: 'solid', type: 'primary' },
    { key: 'reject', label: '驳回', shape: 'solid', type: 'secondary' },
    { key: 'add', label: '加签', shape: 'solid', type: 'secondary' },
    { key: 'transfer', label: '转单', shape: 'solid', type: 'secondary' },
    { key: 'withdraw', label: '撤回', shape: 'warning', type: 'normal', hasConfirm: true },
  ];

  const detailItems = [
    {
      label: '发起时间',
      content: '2021-03-15 15:12:34',
    },
    {
      label: '任务单号',
      content: '45654645123213123',
    },
  ];

  const descriptionItems = [
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

  return (
    <Box>
      <PageHeader
        title="景庄发起的阿里巴巴经济体开源管理流程"
        description="发起人：景庄（阿里集团-盒马事业群-产品技术部-门店数智化&AIoT产品技术-服务体验技术）"
      >
        <Description items={detailItems} />
      </PageHeader>
      <Box p="xl">
        <Panel title="表单详情">
          <Description items={descriptionItems} />
        </Panel>
        <Panel title="审批进度" mt="l">
          <Timeline>
            <TimelineItem title="已提交" label="耗时2小时12分" status="success">
              <TicketItem user="张三" time="2021-03-16 17:36:40" label="同意" />
            </TimelineItem>
            <TimelineItem title="审批节点1" label="耗时1小时11分" status="success">
              <TicketItem user="李四" time="2021-03-18 17:36:40" label="原则上同意" />
            </TimelineItem>
            <TimelineItem title="审批节点2" label="耗时5分钟" status="success">
              <TicketItem user="王五" time="2021-03-19 17:36:40" label="已通过法务和专利部门审核" />
            </TimelineItem>
            <TimelineItem title="审批节点3" label="耗时1天2小时10分" status="process">
              <TicketItem user="赵六" time="2021-03-20 17:36:40" />
            </TimelineItem>
            <TimelineItem title="审批节点4">
              <TicketItem user="Victor" />
            </TimelineItem>
          </Timeline>
        </Panel>
      </Box>
      <Box position="sticky" bottom="0" zIndex={1}>
        <FooterToolbar actions={actions} />
      </Box>
    </Box>
  );
}
