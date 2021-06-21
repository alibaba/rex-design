import React, { useState } from 'react';
import { Tooltip, TooltipProps } from '../overlays';
import { Box, Flex, Group } from '../layout';
import { Button } from '../button';

interface ConfirmProps extends TooltipProps {
  /**
   * 点击确认按钮的回调
   */
  onOk?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * 点击取消按钮的回调
   */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactElement;
}

export function Confirm(props: ConfirmProps) {
  const { title = '确认操作吗？', onCancel, onOk, children, ...rest } = props;
  const [visible, setVisible] = useState(false);

  // 必须传入单个 children 节点，否则不处理
  if (!React.Children.only(children)) {
    return children;
  }

  return (
    <Tooltip
      visible={visible}
      onRequestClose={() => setVisible(false)}
      onRequestOpen={() => setVisible(true)}
      renderTarget={(props) => React.cloneElement(children, props)}
      interactionKind="click"
      title={
        <ConfirmBody
          onOk={(e) => {
            setVisible(false);
            onOk && onOk(e);
          }}
          onCancel={(e) => {
            setVisible(false);
            onCancel && onCancel(e);
          }}
        >
          {title}
        </ConfirmBody>
      }
      {...rest}
    />
  );
}

interface ConfirmBodyProps extends React.ComponentPropsWithoutRef<'div'> {
  onOk?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
}

function ConfirmBody(props: ConfirmBodyProps) {
  const { onOk, onCancel, children } = props;

  return (
    <Box minWidth="120px">
      <Box>{children}</Box>
      <Flex justify="flex-end" mt="m">
        <Group>
          <Button size="small" onClick={onCancel}>
            取消
          </Button>
          <Button size="small" type="primary" onClick={onOk}>
            确认
          </Button>
        </Group>
      </Flex>
    </Box>
  );
}
