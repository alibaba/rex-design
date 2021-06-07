import { createContext } from '../../utils';

export interface CheckboxGroupContext {
  name?: string;
  value: string[];
  onSelect?: (value: string, checked: boolean) => void;
}

const [CheckboxGroupProvider, useCheckboxGroupContext] = createContext<CheckboxGroupContext>({
  name: 'CheckboxGroupContext',
  strict: false,
});

export { CheckboxGroupProvider, useCheckboxGroupContext };
