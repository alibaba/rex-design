import React, { useState } from 'react';
import { createContext } from '../utils';

type DeviceName = 'phone' | 'tablet' | 'desktop';

export interface Device {
  /**
   * 设备名
   */
  name: DeviceName;
  /**
   * 别名
   */
  alias: string;
  /**
   * 断点设置
   */
  breakpoint: string;
}

export const PHONE_DEVICE: Device = {
  name: 'phone',
  alias: 's',
  breakpoint: '415px',
};

export const TABLET_DEVICE: Device = {
  name: 'tablet',
  alias: 'm',
  breakpoint: '835px',
};

export const DESKTOP_DEVICE: Device = {
  name: 'desktop',
  alias: 'l',
  breakpoint: '',
};

export interface DeviceContextType {
  device: Device;
  updateDevice?: (device: Device) => void;
}

const [Provider, useDevice] = createContext<DeviceContextType>({
  name: 'DeviceContext',
  strict: true,
});

export interface DeviceProviderProps {
  value?: Device;
}

export function DeviceProvider(props: React.PropsWithChildren<DeviceProviderProps>) {
  const { value, children } = props;
  const [device, setDevice] = useState(DESKTOP_DEVICE);

  const context = {
    device,
    updateDevice(newDevice: Device) {
      setDevice(newDevice);
    },
  };

  const controlledContext = {
    device: value,
  };

  return <Provider value={value ? controlledContext : context}>{children}</Provider>;
}

export { useDevice };
