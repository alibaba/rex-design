import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../utils';
import { Box } from '../layout';

const StepBox = styled(Box)`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: -50%;
    height: var(--rex-step-line-width);
    width: 100%;
    background-color: var(--rex-step-color);
  }
`;

const StepNode = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  z-index: 1;
  border: 0;
  width: var(--rex-step-size);
  height: var(--rex-step-size);
  border-radius: 100%;
  outline: none;
  background-color: var(--rex-step-color);
  color: var(--rex-colors-emphasis-0);
  font-size: var(--rex-fontSizes-title1);
`;

const ColumnStepBox = styled(Box)`
  position: relative;
`;

const ColumnStepHeader = styled(Box)`
  display: flex;
  align-items: center;
`;

const ColumnStepContent = styled(Box)`
  margin-top: var(--rex-space-m);
  margin-bottom: var(--rex-space-m);
  margin-left: calc(var(--rex-step-size) / 2);
  padding-left: calc(var(--rex-step-size) / 2 + var(--rex-space-m) - var(--rex-step-line-width));
  border-left: var(--rex-step-line-width) solid var(--rex-step-color);
  min-height: 40px;
`;

const getColorByStatus = (status: StatusType) => {
  return {
    complete: 'brand.normal',
    incomplete: 'emphasis.40',
    error: 'error.normal',
    warning: 'warning.normal',
    success: 'success.normal',
    disabled: 'fill.disabled',
  }[status];
};

export type StatusType = 'complete' | 'incomplete' | 'error' | 'warning' | 'disabled' | string | undefined;

export interface UseStepProps {
  step?: number;
  /**
   * 状态
   */
  status?: StatusType;
  /**
   * 是否激活项
   */
  active?: boolean;
}

function useStep(props: UseStepProps) {
  const { step, status = 'incomplete', active } = props;
  const completeColor = getColorByStatus('complete');
  const statusColor = getColorByStatus(status);

  const color = active ? completeColor : statusColor;
  const label = status === 'complete' ? <Icon type="select-bold" /> : step;
  const clazz = cx({
    'rex-step': true,
    [`rex-${status}`]: status,
  });

  return {
    rootProps: {
      className: clazz,
      style: {
        ['--rex-step-color' as any]: colors(color),
        ['--rex-step-size' as any]: '32px',
        ['--rex-step-line-width' as any]: '2px',
      },
    },
    label,
  };
}

export interface StepProps extends UseStepProps {
  /**
   * 标题
   */
  title?: string;
  /**
   * 点击步骤按钮回调
   */
  onClick?: any;
  children?: any;
}

export function Step(props: StepProps) {
  const { title, onClick, children } = props;
  const { rootProps, label } = useStep(props);

  return (
    <StepBox as="li" {...rootProps}>
      <StepNode as="button" onClick={onClick}>
        {label}
      </StepNode>
      <Box as="span" fontSize="title1" mt="m" mx="xl" color="text.title">
        {title}
      </Box>
      <Box fontSize="body" mt="m" mx="xl" color="text.body">
        {children}
      </Box>
    </StepBox>
  );
}

export function ColumnStep(props: StepProps) {
  const { title, onClick, children } = props;
  const { rootProps, label } = useStep(props);

  return (
    <ColumnStepBox as="li" {...rootProps}>
      <ColumnStepHeader className="rex-step-header">
        <StepNode as="button" onClick={onClick}>
          {label}
        </StepNode>
        <Box as="span" fontSize="title1" color="text.title" ml="m">
          {title}
        </Box>
      </ColumnStepHeader>
      <ColumnStepContent className="rex-step-content">{children}</ColumnStepContent>
    </ColumnStepBox>
  );
}
