import React from 'react';
import { useDevice } from './device-provider';
import { defaultConfig, phoneConfig } from '../config';
import { createContext } from '../utils';

const configMap = {
  desktop: defaultConfig,
  tablet: defaultConfig,
  phone: phoneConfig,
};

export interface ConfigContextType {}

const [Provider, useDeviceConfig] = createContext<ConfigContextType>({
  name: 'ConfigProvider',
  strict: true,
});

export function ConfigProvider(props: any) {
  const { value, children } = props;

  const { device } = useDevice();
  const context = configMap[device.name];

  const controlledContext = {
    ...value,
  };

  return <Provider value={value ? controlledContext : context}>{children}</Provider>;
}

export function useConfig<T>(name: string, props: T) {
  const config = useDeviceConfig();
  const value = config[name] || {};
  const merged = {
    ...value,
    ...props,
  }; // 用户传入的覆盖默认的
  return merged as T;
}
