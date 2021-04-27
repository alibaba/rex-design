import { FormControlOnChangeHandler } from '../../types';
import { StepProps } from './step';

const getStatus = (isComplete: boolean, detail: StepProps) => {
  const status = detail.status || (isComplete ? 'complete' : 'incomplete');
  return status;
};
export interface UseStepsProps {
  /**
   * 步骤配置数据
   */
  steps: StepProps[];
  /**
   * 当前步骤
   */
  step?: number;
  /**
   * 步骤变化时的回调
   */
  onChange?: FormControlOnChangeHandler<number>;
}

export function useSteps(props: UseStepsProps) {
  const { step, onChange, steps = [] } = props;

  const items = steps.map((item, key) => {
    const itemStep = key + 1;
    return {
      ...item,
      step: itemStep,
      status: getStatus(itemStep < step, item),
      isActive: item.isActive || itemStep === step,
      onClick: () => {
        if (itemStep !== step && onChange) {
          onChange(itemStep, { data: item });
        }
      },
    };
  });

  return {
    items,
  };
}
