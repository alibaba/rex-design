import React from 'react';
import { Box, BoxProps } from '../layout';
import { useConfig } from '../../providers';
import { createContext } from '../../utils';
import { ResponsiveType } from '../../types';

type LabelPosition = 'left' | 'top';

interface FormLayoutContext {
  /**
   * 是否行内布局
   */
  inline?: boolean;
  /**
   * 标签位置
   */
  labelPosition?: LabelPosition;
  /**
   * 标签宽度
   */
  labelWidth?: string;
  /**
   * 布局列数
   */
  columns?: ResponsiveType;
}

const [FormLayoutProvider, useFormLayoutContext] = createContext<FormLayoutContext>({
  strict: false,
  name: 'FormLayoutContext',
});

export interface UseFormProps {
  inline?: boolean;
  labelPosition?: LabelPosition;
  labelWidth?: string;
  columns?: ResponsiveType;
}

export function useFormLayout(props: UseFormProps) {
  const form = useFormLayoutContext();

  return {
    ...props,
    inline: props?.inline ?? form?.inline,
    labelPosition: props?.labelPosition ?? form?.labelPosition,
    labelWidth: props?.labelWidth ?? form?.labelWidth,
    columns: props?.columns ?? form?.columns,
  };
}

export interface FormLayoutProps extends FormLayoutContext, BoxProps {}

/**
 * Form 布局容器
 */
export function FormLayout(props: FormLayoutProps) {
  const { id, columns, inline, labelPosition, labelWidth, children, ...others } = useConfig<FormLayoutProps>(
    'Form',
    props,
  );
  const context = {
    id,
    columns,
    labelPosition,
    labelWidth,
    inline,
  };

  return (
    <FormLayoutProvider value={context}>
      <Box as="form" {...others}>
        {children}
      </Box>
    </FormLayoutProvider>
  );
}
