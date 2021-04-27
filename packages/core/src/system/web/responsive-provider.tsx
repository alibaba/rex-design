import React, { useState } from 'react';

export type ResponsiveOptions = {
  name?: string;
  min?: number;
  base?: number;
  max?: number;
  columns: number;
  gutter?: number;
  margin?: number;
};

export const ResponsiveContext = React.createContext<{
  respOpts: ResponsiveOptions;
  updateResponsiveOptions: (target: ResponsiveOptions) => void;
}>({
  respOpts: { columns: 1 },
  updateResponsiveOptions: () => {},
});

export function useResponsive() {
  return React.useContext(ResponsiveContext);
}

export interface ResponsiveProviderProps {
  value?: ResponsiveOptions;
  children?: React.ReactNode;
}

export const ResponsiveProvider = (props: ResponsiveProviderProps) => {
  const { value, children } = props;

  const [respOpts, setRespOpts] = useState<ResponsiveOptions>({
    columns: 3,
  });

  const updateResponsiveOptions = (target: ResponsiveOptions) => {
    setRespOpts(target);
  };

  const context = {
    respOpts: respOpts,
    updateResponsiveOptions,
  };

  const controlledContext = {
    respOpts: value,
    updateResponsiveOptions: () => {}, // FIXME
  };

  return (
    <ResponsiveContext.Provider value={value ? controlledContext : context}>
      {children}
    </ResponsiveContext.Provider>
  );
};
