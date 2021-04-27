import { createContext } from '../../utils';

export interface TabsContext {
  value?: string;
}

const [TabsProvider, useTabsContext] = createContext<TabsContext>({
  name: 'TabsContext',
  strict: false,
});

export { TabsProvider, useTabsContext };
