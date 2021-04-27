import { FormControlOnChangeHandler, StringOrNumber } from '../../types';
import { createContext } from '../../utils';

export interface CheckboxGroupContext {
  name?: string;
  value: StringOrNumber[];
  onSelect?: (value: StringOrNumber, checked: boolean) => void;
}

const [CheckboxGroupProvider, useCheckboxGroupContext] = createContext<CheckboxGroupContext>({
  name: 'CheckboxGroupContext',
  strict: false,
});

export { CheckboxGroupProvider, useCheckboxGroupContext };
