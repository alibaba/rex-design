import React, { useCallback } from 'react';
import { Icon } from '@rexd/icon';
import { Box, BoxProps } from '../layout';
import { Tooltip, TooltipProps } from '../overlays';
import { useFormLayout } from './form-layout';

export interface FormControlProps {
  /**
   * 字段名
   */
  label?: React.ReactNode;
  /**
   * 标签宽度，仅在 水平排布 时生效
   */
  labelWidth?: string;
  /**
   * 标签位置
   */
  labelPosition?: 'left' | 'top';
  /**
   * 字段名提示信息或解释信息
   */
  labelTips?: React.ReactNode;
  /**
   * 附加提示文本
   */
  help?: React.ReactNode;
  /**
   * 错误消息
   */
  error?: string | string[];
  /**
   * 是否显示必选标记
   */
  required?: boolean;
  /**
   * 是否行内模式
   */
  isInline?: boolean;
  children?: React.ReactNode;
}

function useFormControl(props: FormControlProps) {
  const { isInline, labelPosition = 'left', labelWidth = '100px', required, labelTips } = props;
  const getRootProps = useCallback((): BoxProps => {
    if (isInline) {
      return {
        display: 'inline-block',
        mr: 'm',
      };
    }
    if (labelPosition === 'left') {
      return {
        display: 'flex',
      };
    }
    if (labelPosition === 'top') {
      return {
        mb: 'm',
      };
    }
  }, [isInline, labelPosition]);

  const getLabelWrapperProps = useCallback((): FormLabelProps => {
    const shared: FormLabelProps = {
      tips: labelTips,
      required,
    };

    if (isInline) {
      return {
        ...shared,
        display: 'inline-block',
        verticalAlign: 'top',
      };
    }

    if (labelPosition === 'left') {
      return {
        ...shared,
        flex: `0 0 ${labelWidth}`,
        verticalAlign: 'top',
        textAlign: 'right',
      };
    }

    if (labelPosition === 'top') {
      return {
        ...shared,
      };
    }
  }, [isInline, labelPosition, labelWidth, labelTips, required]);

  const getControlWrapperProps = useCallback((): BoxProps => {
    if (isInline) {
      return {
        display: 'inline-block',
      };
    }
    if (labelPosition === 'left') {
      return {
        flex: '1',
        pb: 'm',
      };
    }
    if (labelPosition === 'top') {
      return {};
    }
  }, [isInline, labelPosition]);

  return {
    getRootProps,
    getLabelWrapperProps,
    getControlWrapperProps,
  };
}

export function FormControl(props: FormControlProps) {
  const { label, help, error, children } = props;
  const form = useFormLayout(props);
  const { getRootProps, getLabelWrapperProps, getControlWrapperProps } = useFormControl({
    ...form,
    ...props,
  });

  return (
    <Box {...getRootProps()}>
      {label && <FormLabel {...getLabelWrapperProps()}>{label}</FormLabel>}
      <Box {...getControlWrapperProps()}>
        {children}
        {help && <FormHelperText>{help}</FormHelperText>}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </Box>
    </Box>
  );
}

interface FormLabelProps extends BoxProps {
  /**
   * 是否显示必选标识
   */
  required?: boolean;
  /**
   * 附加的字段提示或解释
   */
  tips?: React.ReactNode;
}

function FormLabel(props: FormLabelProps) {
  const { tips, required, children, ...rest } = props;
  return (
    <Box pr="m" color="text.note" fontSize="body" lineHeight="32px" verticalAlign="middle" {...rest}>
      {required && <FormRequiredIndicator />}
      {children}
      {tips && <FormLabelTips title={tips} />}
    </Box>
  );
}

function FormRequiredIndicator(props: BoxProps) {
  const { children, ...rest } = props;
  return (
    <Box role="presentation" display="inline-block" mr="s" verticalAlign="middle" color="error.normal" {...rest}>
      {children || '*'}
    </Box>
  );
}

interface FormLabelTipProps extends TooltipProps {
  title?: React.ReactNode;
}

function FormLabelTips(props: FormLabelTipProps) {
  const { title, ...rest } = props;
  return (
    <Tooltip
      title={title}
      renderTarget={(pass) => (
        <Box {...pass} display="inline-block" ml="s" fontSize="body" verticalAlign="middle">
          <Icon type="prompt" />
        </Box>
      )}
      {...rest}
    />
  );
}

function FormErrorMessage(props: BoxProps) {
  const { children, ...rest } = props;
  return (
    <Box color="error.normal" fontSize="body" lineHeight="2" {...rest}>
      {children}
    </Box>
  );
}

function FormHelperText(props: BoxProps) {
  const { children, ...rest } = props;
  return (
    <Box color="text.note" fontSize="body" lineHeight="2" {...rest}>
      {children}
    </Box>
  );
}
