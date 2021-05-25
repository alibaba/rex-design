import { colors, borders, shadows, sizes, radii, space, fontSizes } from '../design-token-helpers';

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
  expect(borders('solid', 'line.border')).toEqual('var(--rex-borders-solid) var(--rex-colors-line-border)');
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
});
