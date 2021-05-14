import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheetManager } from 'styled-components';
import {
  AppProvider,
  PHONE_DEVICE,
  TABLET_DEVICE,
  DESKTOP_DEVICE,
  useEventListener,
  theme as defaultTheme,
  darkTheme,
  phoneTheme,
  phoneDarkTheme,
  tabletTheme,
  tabletDarkTheme,
  extendTheme,
} from '@rexd/core';

function getLocalData(localKey) {
  const data = window.localStorage.getItem(localKey);
  let json;

  try {
    json = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }

  return json;
}

function getLocalTheme(deviceName, colorMode) {
  const light = getLocalData('lightColors');
  const dark = getLocalData('darkColors');
  const desktop = getLocalData('pcTokens');
  const phone = getLocalData('phoneTokens');
  const tablet = getLocalData('padTokens');

  const map = {
    light,
    dark,
    desktop,
    phone,
    tablet,
  };

  const newTheme = extendTheme({ colors: (map[colorMode] || {}).colors }, map[deviceName]);
  return extendTheme(newTheme);
}

function getTheme(deviceName, colorMode, themeMode) {
  let theme = {
    'desktop.light': defaultTheme,
    'desktop.dark': darkTheme,
    'phone.light': phoneTheme,
    'phone.dark': phoneDarkTheme,
    'tablet.light': tabletTheme,
    'tablet.dark': tabletDarkTheme,
  }[`${deviceName}.${colorMode}`];

  if (themeMode === 'local') {
    const localTheme = getLocalTheme(deviceName, colorMode);
    theme = {
      ...theme,
      ...localTheme,
    };
  }

  return theme;
}

export const parameters = {
  viewport: {
    viewports: {
      pad: {
        name: 'Tablet/POS',
        styles: {
          height: '1112px',
          width: '834px',
        },
      },
      phone: {
        name: 'iPhone 6/7/8',
        styles: {
          height: '667px',
          width: '375px',
        },
      },
    },
  },
};

export const globalTypes = {
  colorMode: {
    name: 'Color Mode',
    description: '设置色彩模式',
    defaultValue: 'light',
    toolbar: {
      icon: 'switchalt',
      items: ['light', 'dark'],
    },
  },

  themeMode: {
    name: '主题模式',
    description: '设置主题模式',
    defaultValue: 'built-in',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'built-in', title: '使用内置主题' },
        { value: 'local', title: '使用本地配置主题' },
      ],
    },
  },
};

function addBackgroundStyle(selector, css) {
  const existingStyle = document.getElementById(selector);
  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    const style = document.createElement('style');
    style.setAttribute('id', selector);
    style.innerHTML = css;
    document.head.appendChild(style);
  }
}

function resetHTMLMeta(name, content) {
  const node = document.querySelector(`meta[name="${name}"]`);
  if (node) {
    node.setAttribute('content', content);
  }
}

function getDevice() {
  let device = DESKTOP_DEVICE;
  if (window.innerWidth < 415) {
    device = PHONE_DEVICE;
  } else if (window.innerWidth < 835) {
    device = TABLET_DEVICE;
  }
  return device;
}

const withRexAppProvider = (Story, context) => {
  const [device, setDevice] = useState(getDevice);

  const colorMode = context.globals.colorMode;
  const themeMode = context.globals.themeMode;
  const selector = '.sb-show-main';

  const bgColor = {
    light: '#FFFFFF',
    dark: '#0B0E17',
  }[colorMode];

  const backgroundStyle = useMemo(() => {
    return `
      ${selector} {
        background: ${bgColor} !important;
        transition: background-color 0.3s;
      }
    `;
  }, [bgColor, selector]);

  // 设置背景样式
  useEffect(() => {
    addBackgroundStyle(selector, backgroundStyle);
    if (device.name === 'phone') {
      resetHTMLMeta('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover');
    }
  }, [colorMode, selector, device.name]);

  // 监听容器变化
  useEventListener('resize', () => {
    const current = getDevice();
    setDevice(current);
  });

  const theme = getTheme(device.name, colorMode, themeMode);

  return (
    <AppProvider root theme={theme} device={device} colorMode={colorMode}>
      <StyleSheetManager disableVendorPrefixes>
        <Story {...context} />
      </StyleSheetManager>
    </AppProvider>
  );
};

export const decorators = [withRexAppProvider];
