import React from 'react';
import { Notice, Grid, Box, Link, useVisible } from '@rexd/core';

export default { title: 'Notice' };

export const Basic = () => <Notice status="error" title="您当前的浏览器已过期，请使用最新版的浏览器！" />;

export const Extra = () => (
  <Notice status="error" title="您当前的浏览器已过期，请使用最新版的浏览器！" extra={<Link>查看详情</Link>} />
);

export function Closeable() {
  const { visible, onClose } = useVisible({ defaultVisible: true });

  return (
    <Box>
      {visible && (
        <Notice status="error" title="您当前的浏览器已过期！" closeable onClose={onClose}>
          请升级到最新版的浏览器，否则部分功能可能不可用！
        </Notice>
      )}
    </Box>
  );
}

export const Content = () => (
  <Notice status="error" title="您当前的浏览器已过期！" extra={<Link>查看详情</Link>} closeable>
    请升级到最新版的浏览器，否则部分功能可能不可用！请升级到最新版的浏览器，否则部分功能可能不可用！请升级到最新版的浏览器，否则部分功能可能不可用！请升级到最新版的浏览器，否则部分功能可能不可用！请升级到最新版的浏览器，否则部分功能可能不可用！
  </Notice>
);

export const Status = () => (
  <Grid spacingY="l" columns={1}>
    <Notice status="error" title="发起的请求出现错误"></Notice>
    <Notice status="success" title="文件已上传成功"></Notice>
    <Notice status="warning" title="你的账号密码似乎已经过期，请尽快更换"></Notice>
    <Notice status="info" title="Hippo 将在 2021 年 3 月发布新版本更新"></Notice>
  </Grid>
);
