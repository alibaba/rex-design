import { createContext } from '../../utils';

export interface CollapseGroupContext {
  name?: string;
  value: string[];
  onSelect?: (value: string, checked: boolean) => void;
}

const [CollapseGroupProvider, useCollapseGroupContext] = createContext<CollapseGroupContext>({
  strict: false,
});

export { CollapseGroupProvider, useCollapseGroupContext };
