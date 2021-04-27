import React from 'react';

import { Timeline, TimelineItem } from '@rexd/core';

export default { title: 'Timeline' };

export const Basic = () => {
  return (
    <Timeline>
      <TimelineItem title="下单" label="2018-05-10 18:00:00" status="success">
        订单已受理
      </TimelineItem>
      <TimelineItem title="打包" label="2018-05-10 18:10:00" status="success">
        订单已打包完成，等待骑手取货
      </TimelineItem>
      <TimelineItem title="配送" label="2018-05-10 18:15:00" status="process">
        骑手正在火速配送中
      </TimelineItem>
      <TimelineItem title="送件失败" label="2018-05-10 18:25:00" status="error">
        失败原因：地址错误
      </TimelineItem>
      <TimelineItem title="客户退单" label="2018-05-10 18:30:00">
        客户退单
      </TimelineItem>
      <TimelineItem title="完成" label="2018-05-10 18:30:00">
        订单完成
      </TimelineItem>
    </Timeline>
  );
};

export const Hoz = () => (
  <Timeline direction="row">
    <TimelineItem title="下单" label="2018-05-10 18:00:00" status="success">
      订单已受理
    </TimelineItem>
    <TimelineItem title="打包" label="2018-05-10 18:10:00" status="success">
      订单已打包完成，等待骑手取货
    </TimelineItem>
    <TimelineItem title="配送" label="2018-05-10 18:15:00" status="process">
      骑手正在火速配送中
    </TimelineItem>
    <TimelineItem title="送件失败" label="2018-05-10 18:25:00" status="error">
      失败原因：地址错误
    </TimelineItem>
    <TimelineItem title="客户退单" label="2018-05-10 18:30:00">
      客户退单
    </TimelineItem>
    <TimelineItem title="完成" label="2018-05-10 18:30:00">
      订单完成
    </TimelineItem>
  </Timeline>
);
