import { createContext, useContext } from 'react';

export const StoreContext = createContext<{
  store: any;
  update: (path: string, value: string) => void;
}>({
  store: {},
  update: () => {},
});

export const StoreProvider = StoreContext.Provider;

export function useStore() {
  return useContext(StoreContext);
}
