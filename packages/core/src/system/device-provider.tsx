import React from 'react';

export interface Device {
  /**
   * 断点名称
   */
  name: 's' | 'm' | 'l';
  /**
   * 断点别名
   */
  alias?: string;
  /**
   * 列数
   */
  cols: number;
  /**
   * 断点
   */
  breakpoint?: number;
}

export const phoneDevice = {
  name: 's',
  alias: 'phone',
  cols: 4,
  breakpoint: 415,
} as Device;

export const padDevice = {
  name: 'm',
  alias: 'pad',
  cols: 8,
  breakpoint: 835,
} as Device;

export const pcDevice = {
  name: 'l',
  alias: 'pc',
  cols: 12,
} as Device;

interface DeviceContextType {
  device: Device;
  updateDevice: (device: Device) => void;
}

export const DeviceContext = React.createContext<DeviceContextType>({
  device: pcDevice,
  updateDevice: () => {},
});

export function useDevice() {
  return React.useContext(DeviceContext);
}

function useDeviceState(options: any) {
  const [device, setDevice] = React.useState(() => {
    return options.defaultDevice || pcDevice;
  });

  return [device, setDevice];
}

export interface DeviceProviderProps {
  value?: Device;
  children?: React.ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = (props) => {
  const { value, children } = props;

  const [device, setDevice] = useDeviceState({});

  // TODO: auto detect device by use-agent
  const updateDevice = (target: Device) => {
    setDevice(target);
  };

  const context = {
    device,
    updateDevice,
  };

  const controlledContext = {
    device: value as Device,
    updateDevice: () => {}, // TODO: FIXME
  };

  return (
    <DeviceContext.Provider value={value ? controlledContext : context}>
      {children}
    </DeviceContext.Provider>
  );
};
