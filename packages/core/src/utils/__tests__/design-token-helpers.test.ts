// @ts-nocheck

import {
  borders,
  colors,
  fontSizes,
  getToken,
  getTokenValue,
  radii,
  rgba,
  shadows,
  sizes,
  space,
} from '../design-token-helpers';

test('rgba', () => {
  expect(rgba()).toBeUndefined();
  expect(rgba('#000000', '0.4')).toEqual('rgba(0,0,0,0.4)');
});

test('colors', () => {
  expect(colors()).toBeUndefined();
  expect(colors('#FFF')).toEqual('#FFF');
  expect(colors('#FFFFFF')).toEqual('#FFFFFF');
  expect(colors('primary.10')).toEqual('var(--rex-colors-primary-10)');
  expect(colors('primary')).toEqual('var(--rex-colors-primary)');
  expect(colors('var(--rex-colors-test)')).toEqual('var(--rex-colors-test)');
  expect(colors('url(/images/image.jpg)')).toEqual('url(/images/image.jpg)');
  expect(colors('rgb(255, 0, 0)')).toEqual('rgb(255, 0, 0)');
  expect(colors('rgba(255, 0, 0, 0.5)')).toEqual('rgba(255, 0, 0, 0.5)');
});

test('borders', () => {
  expect(borders()).toBeUndefined();
  expect(borders(0)).toEqual(0);
  expect(borders('solid')).toEqual('var(--rex-borders-solid)');
  expect(borders('2px dashed #FFF')).toEqual('2px dashed #FFF');
});

test('shadows', () => {
  expect(shadows()).toBeUndefined();
  expect(shadows('lowDown')).toEqual('var(--rex-shadows-lowDown)');
  expect(shadows('0px 3px 3px 1px #999999')).toEqual('0px 3px 3px 1px #999999');
});

test('sizes', () => {
  expect(sizes()).toBeUndefined();
  expect(sizes(0)).toEqual('0px');
  expect(sizes('2px')).toEqual('2px');
  expect(sizes('calc(100% - 20px)')).toEqual('calc(100% - 20px)');
  expect(sizes(99)).toEqual('99px');
  expect(sizes('s1')).toEqual('var(--rex-sizes-s1)');
});

test('space', () => {
  expect(space('s')).toEqual('var(--rex-space-s)');
});

test('radii', () => {
  expect(radii('s')).toEqual('var(--rex-radii-s)');
});

test('fontSizes', () => {
  expect(fontSizes('body')).toEqual('var(--rex-fontSizes-body)');
  expect(fontSizes('fontSizes.icon.s')).toEqual('var(--rex-fontSizes-icon-s)');
});

test('getToken', () => {
  expect(getToken()).toBeUndefined();
  expect(getToken('Button.textSecondary')).toEqual('var(--rex-components-Button-textSecondary)');
  expect(getToken('Button.someInvalidToken')).toEqual('Button.someInvalidToken');
});

const mockTheme = {
  colors: {
    gray: {
      0: '#FFFFFF',
    },
  },
};

test('getTokenValue', () => {
  expect(getTokenValue()).toBeUndefined();
  expect(getTokenValue('colors.gray.0', mockTheme)).toEqual('#FFFFFF');
});
