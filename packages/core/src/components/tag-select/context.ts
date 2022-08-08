import { createContext } from '../../utils/index';

interface TagSelectContext {
  value?: string | string[];
  onSelect?: (value: string, checked: boolean) => void;
}

const [TagSelectProvider, useTagSelectContext] = createContext<TagSelectContext>({
  name: 'ToggleButtonGroupContext',
  strict: false,
});

export { TagSelectProvider, useTagSelectContext };
