import { useControllableState } from '../../hooks';
import { toNumber } from '../../utils';

export interface UseRangeProps {
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export function useRange(props: UseRangeProps) {
  const { min, max, value: valueProp, defaultValue, onChange, ...htmlProps } = props;
  const [value, updateValue] = useControllableState<number>({
    value: valueProp,
    defaultValue,
    onChange,
  });

  const getInputProps = () => {
    return {
      ...htmlProps,
      type: 'range',
      min,
      max,
      value,
      onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = toNumber(e.target.value);
        updateValue(nextValue);
      },
    };
  };

  const getFilledTrackProps = () => {
    return {
      style: {
        width: `${value}%`,
      },
    };
  };

  const getTooltipProps = () => {
    return {
      style: {
        left: `calc(${value}%)`,
      },
    };
  };

  return {
    state: {
      value,
    },
    getInputProps,
    getFilledTrackProps,
    getTooltipProps,
  };
}
