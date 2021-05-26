import { Button, Link, Notice } from '@rexd/core';
import React from 'react';

export default { title: 'overlays / Notice Quick Tools' };

export function Basic() {
  return (
    <div style={{ display: 'flex', gap: 8, flexFlow: 'wrap' }}>
      <Button
        onClick={() => {
          Notice.show({
            status: 'error',
            title: '您当前的浏览器已过期，请使用最新版的浏览器！',
            extra: <Link>查看详情</Link>,
            closeable: true,
          });
        }}
      >
        show notice
      </Button>

      <Button
        onClick={() => {
          Notice.success({
            title: '文件已上传成功',
            extra: <Link>查看详情</Link>,
            closeable: true,
          });
        }}
      >
        notice.success(...)
      </Button>

      <Button
        onClick={() => {
          Notice.info({
            title: '文件已上传成功',
            extra: <Link>查看详情</Link>,
            closeable: true,
          });
        }}
      >
        notice.info(...)
      </Button>

      <Button
        onClick={() => {
          Notice.warning({
            title: '你的密码已过期，请尽快更换',
            extra: <Link>更换密码</Link>,
            closeable: true,
          });
        }}
      >
        notice.warning(...)
      </Button>

      <Button
        style={{ marginLeft: 8 }}
        onClick={() => {
          Notice.closeAll();
        }}
      >
        关闭所有消息
      </Button>
    </div>
  );
}

export function Attached() {
  const [notice, contextHolder] = Notice.useNotice();

  return (
    <div style={{ display: 'flex', gap: 8, flexFlow: 'wrap' }}>
      {contextHolder}
      <Button
        onClick={() => {
          notice.show({
            status: 'error',
            title: '您当前的浏览器已过期，请使用最新版的浏览器！',
            extra: <Link>查看详情</Link>,
            closeable: true,
          });
        }}
      >
        show notice
      </Button>

      <Button
        onClick={() => {
          notice.success({
            title: '文件已上传成功',
            extra: <Link>查看详情</Link>,
            closeable: true,
          });
        }}
      >
        notice.success(...)
      </Button>

      <Button
        onClick={() => {
          notice.info({
            title: '文件已上传成功',
            extra: <Link>查看详情</Link>,
            closeable: true,
          });
        }}
      >
        notice.info(...)
      </Button>

      <Button
        onClick={() => {
          notice.warning({
            title: '你的密码已过期，请尽快更换',
            extra: <Link>更换密码</Link>,
            closeable: true,
          });
        }}
      >
        notice.warning(...)
      </Button>

      <Button
        style={{ marginLeft: 8 }}
        onClick={() => {
          notice.closeAll();
        }}
      >
        关闭所有消息
      </Button>
    </div>
  );
}
