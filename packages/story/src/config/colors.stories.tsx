import React, { createContext, useContext, useState } from 'react';
import { AppProvider, Grid, GridItem, Box, Text, THEMES, getThemeValue } from '@rexd/core';
import { get } from 'lodash';

import TokenStore from './token-store';
import { Header, SectionHeader, ColorPicker, TokenPicker } from './components';

export default { title: 'Config/Colors' };

interface ColorBoxProps {
  getValue?: (value: string) => string;
  tokenValue?: string;
  tokenPath?: string;
  onChange?: (value: string, label: string) => void;
  picker?: any;
  pickerProps?: any;
}

function ColorBox(props: ColorBoxProps) {
  const { getValue, tokenValue, tokenPath, onChange, picker: Picker, pickerProps } = props;
  const [value, setValue] = useState(tokenValue);

  const handleChange = (color: string) => {
    setValue(color);
    typeof onChange === 'function' && onChange(color, tokenPath);
  };

  return (
    <GridItem>
      <Box bg={getValue(value)} height="100px" mb="m" />
      <Box>
        {Picker && <Picker {...pickerProps} value={value} onChange={handleChange} />}
        <Text as="div" fontSize="body">
          {tokenPath}
        </Text>
      </Box>
    </GridItem>
  );
}

interface ColorListProps {
  variant?: string;
  picker?: any;
  pickerProps?: any;
}

function ColorList({ variant, picker = ColorPicker, pickerProps }: ColorListProps) {
  const ctx = useContext(ThemeContext);

  const handleChange = (color: string, tokenPath: string) => {
    if (ctx) {
      ctx.update(tokenPath, color);
    }
  };

  const model = ctx ? ctx.store.getModel() : {};
  const colors = ctx ? ctx.store.model.colors[variant] : [];

  return (
    <Box py="m">
      <Text as="div">{variant}</Text>
      <Grid spacing="12px" columns={8}>
        {Object.keys(colors).map((colorKey) => {
          const tokenPath = `colors.${variant}.${colorKey}`;
          const tokenValue = colors[colorKey];
          return (
            <ColorBox
              key={colorKey}
              // value={value}
              getValue={(value: string) => getThemeValue(value, model)}
              tokenValue={tokenValue}
              tokenPath={tokenPath}
              onChange={handleChange}
              picker={picker}
              pickerProps={pickerProps}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

const ThemeContext = createContext<{
  store: any;
  update: (path: string, value: string) => void;
}>({
  store: {},
  update: () => {},
});

const generateTokenDataSource = (theme: any = {}, cates: string[] = []) => {
  const list: any[] = [];

  cates.forEach((cate) => {
    const obj = get(theme, cate);
    Object.keys(obj).forEach((key) => {
      list.push({
        label: `${cate}.${key}`,
        value: obj[key],
        color: getThemeValue(obj[key], theme),
      });
    });
  });

  return list;
};

export const Light = () => {
  const lightStore = new TokenStore('lightColors', THEMES.base);

  const ctx = {
    store: lightStore,
    update: (path: string, value: string) => {
      lightStore.set(path, value);
    },
  };

  const tokenPickerProps = {
    picker: TokenPicker,
    pickerProps: {
      dataSource: generateTokenDataSource(lightStore.getModel(), [
        'colors.primary',
        'colors.secondary',
        'colors.emphasis',
        'colors.red',
        'colors.green',
        'colors.yellow',
      ]),
    },
  };

  return (
    <ThemeContext.Provider value={ctx}>
      <AppProvider colorMode="light">
        <Box bg="white" p="xl">
          <Header
            title="基础色板"
            onSave={() => lightStore.sync()}
            onReset={() => lightStore.clear()}
            filename="lightColors.txt"
            jsonData={lightStore.toString()}
          />
          <ColorList variant="primary" />
          <ColorList variant="secondary" />
          <ColorList variant="gray" />
          <ColorList variant="red" />
          <ColorList variant="green" />
          <ColorList variant="yellow" />
          <SectionHeader title="语义化色板" />
          <ColorList variant="brand" {...tokenPickerProps} />
          <ColorList variant="text" {...tokenPickerProps} />
          <ColorList variant="link" {...tokenPickerProps} />
          <ColorList variant="fill" {...tokenPickerProps} />
          <ColorList variant="line" {...tokenPickerProps} />
          <ColorList variant="success" {...tokenPickerProps} />
          <ColorList variant="error" {...tokenPickerProps} />
          <ColorList variant="warning" {...tokenPickerProps} />
        </Box>
      </AppProvider>
    </ThemeContext.Provider>
  );
};

export const Dark = () => {
  const darkStore = new TokenStore('darkColors', THEMES.dark.desktop);

  const ctx = {
    store: darkStore,
    update: (path: string, value: string) => {
      darkStore.set(path, value);
    },
  };

  const tokenPickerProps = {
    picker: TokenPicker,
    pickerProps: {
      dataSource: generateTokenDataSource(darkStore.getModel(), [
        'colors.primary',
        'colors.secondary',
        'colors.gray',
        'colors.red',
        'colors.green',
        'colors.yellow',
      ]),
    },
  };

  return (
    <ThemeContext.Provider value={ctx}>
      <AppProvider colorMode="dark" theme={THEMES.dark.desktop}>
        <Box bg="black" p="xl">
          <Header
            title="基础色板"
            onSave={() => darkStore.sync()}
            onReset={() => darkStore.clear()}
            filename="darkColors.txt"
            jsonData={darkStore.toString()}
          />
          <ColorList variant="primary" />
          <ColorList variant="secondary" />
          <ColorList variant="gray" />
          <ColorList variant="red" />
          <ColorList variant="green" />
          <ColorList variant="yellow" />
          <SectionHeader title="语义化色板" />
          <ColorList variant="emphasis" {...tokenPickerProps} />
          <ColorList variant="brand" {...tokenPickerProps} />
          <ColorList variant="text" {...tokenPickerProps} />
          <ColorList variant="link" {...tokenPickerProps} />
          <ColorList variant="fill" {...tokenPickerProps} />
          <ColorList variant="line" {...tokenPickerProps} />
          <ColorList variant="success" {...tokenPickerProps} />
          <ColorList variant="error" {...tokenPickerProps} />
          <ColorList variant="warning" {...tokenPickerProps} />
        </Box>
      </AppProvider>
    </ThemeContext.Provider>
  );
};
