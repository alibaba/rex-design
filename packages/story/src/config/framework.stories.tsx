import React from 'react';
import { Grid, Box, Text, theme } from '@rexd/core';
import ThemeStore from './token-store';
import { Header, SectionHeader, ConfigBox } from './components';
import { getPxValue, toPxValue } from './utils';
import { StoreProvider } from './store-context';

export default { title: 'Config/Frameworkds' };

interface FrameworkConfigProps {
  store: ThemeStore;
}

function FrameworkConfig({ store: tokenStore }: FrameworkConfigProps) {
  const { fontSizes, radii, shadows, sizes, components } = tokenStore.getModel();
  const formHeights = sizes.formHeights;

  const ctx = {
    store: tokenStore,
    update(path: string, val: string) {
      tokenStore.set(path, val);
    },
  };

  return (
    <StoreProvider value={ctx}>
      <Box>
        <Header
          title="fontSizes"
          onReset={() => tokenStore.clear()}
          onSave={() => tokenStore.sync()}
          filename="pc.txt"
          jsonData={tokenStore.toString()}
        />
        {Object.keys(fontSizes).map((item) => (
          <ConfigBox
            key={item}
            tokenPath={`fontSizes.${item}`}
            value={fontSizes[item]}
            parseValue={getPxValue}
            getValue={toPxValue}
            renderContent={({ value }) => <Text fontSize={value}>Hello World 你好，世界</Text>}
          />
        ))}
        <SectionHeader title="Radii" />
        <Box>
          {Object.keys(radii).map((item) => {
            return (
              <ConfigBox
                key={item}
                tokenPath={`radii.${item}`}
                value={radii[item]}
                parseValue={getPxValue}
                getValue={toPxValue}
                renderContent={({ value }) => <Box borderRadius={value} size="80px" bg="brand.normal" />}
              />
            );
          })}
        </Box>
        <SectionHeader title="Shadows" />
        <Box>
          {Object.keys(shadows).map((item) => (
            <ConfigBox
              key={item}
              tokenPath={`shadows.${item}`}
              value={shadows[item]}
              renderContent={({ value }) => <Box boxShadow={value} size="80px" bg="#fff" />}
              component="textarea"
            />
          ))}
        </Box>
        <SectionHeader title="Form Item Heights" />
        <Box>
          {Object.keys(formHeights).map((item) => (
            <ConfigBox
              key={item}
              tokenPath={`sizes.formHeights.${item}`}
              value={formHeights[item]}
              parseValue={getPxValue}
              getValue={toPxValue}
              renderContent={({ value }) => <Box height={value} width="80x" bg="#000" />}
            />
          ))}
        </Box>
        <SectionHeader title="Components" />
        {Object.keys(components).map((comp) => {
          return (
            <Box key={comp} borderBottom="solid" borderBottomColor="line.divider" my="l">
              {Object.keys(components[comp]).map((item) => (
                <ConfigBox
                  key={item}
                  tokenPath={`components.${comp}.${item}`}
                  value={components[comp][item]}
                  component="input"
                />
              ))}
            </Box>
          );
        })}
      </Box>
    </StoreProvider>
  );
}

export function PC() {
  const tokenStore = new ThemeStore('pcTokens', theme);
  return <FrameworkConfig store={tokenStore} />;
}

export function Pad() {
  const tokenStore = new ThemeStore('padTokens', theme);
  return <FrameworkConfig store={tokenStore} />;
}

export function Phone() {
  const tokenStore = new ThemeStore('phoneTokens', theme);
  return <FrameworkConfig store={tokenStore} />;
}
