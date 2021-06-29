import { searchTreeByKeyword } from '../searchTreeByKeyword';
import { bigTreeDataSource } from './test-data';

test('basic search', () => {
  const result = searchTreeByKeyword('Option 1', [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
  ]);

  expect(result.filteredDataSource.length).toBe(1);
  expect(result.filteredDataSource[0].key).toBe('1');
  expect(result.skipped).toBe(false);
  expect(result.preferredExpandedKeys).toEqual([]);
});

test('skip search', () => {
  const result = searchTreeByKeyword('', [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
  ]);

  expect(result.skipped).toBe(true);
});

test('search big tree', () => {
  expect(searchTreeByKeyword('小灰', bigTreeDataSource)).toMatchSnapshot();
});
