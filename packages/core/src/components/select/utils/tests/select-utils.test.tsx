import { isLeafNode } from 'ali-react-table';
import { arrayUtils, filterTreeByMaxDepth, toggleValue } from '../select-utils';
import { bigSelectDataSource } from './test-data';

test('toggleValue', () => {
  expect(toggleValue(['1', '2'], '3')).toEqual(['1', '2', '3']);
  expect(toggleValue(['1', '2'], '1')).toEqual(['2']);
  expect(toggleValue([], '1')).toEqual(['1']);
});

test('arrayUtils', () => {
  expect(arrayUtils.diff(['1', '2', '3'], ['2', '4'])).toEqual(['1', '3']);
  expect(arrayUtils.diff(['1', '2', '3'], [])).toEqual(['1', '2', '3']);
  expect(arrayUtils.diff(['1', '2', '3'], ['1', '2', '3'])).toEqual([]);
  expect(arrayUtils.diff([], ['1', '2', '3'])).toEqual([]);

  expect(arrayUtils.merge(['1', '2', '3'], ['2', '4'])).toEqual(['1', '2', '3', '4']);
  expect(arrayUtils.merge(['1', '2', '3'], [])).toEqual(['1', '2', '3']);
  expect(arrayUtils.merge(['1', '2', '3'], ['1', '2', '3'])).toEqual(['1', '2', '3']);
  expect(arrayUtils.merge([], ['1', '2', '3'])).toEqual(['1', '2', '3']);
});

test('filterTreeByMaxDepth', () => {
  const level0 = filterTreeByMaxDepth(bigSelectDataSource, 0);
  expect(level0.length).toBe(bigSelectDataSource.length);
  expect(level0.every(isLeafNode)).toBe(true);

  const level1 = filterTreeByMaxDepth(bigSelectDataSource, 1);
  expect(level1.length).toBe(bigSelectDataSource.length);
  expect(level1.every((node) => isLeafNode(node) || node.children.every(isLeafNode))).toBe(true);
});
