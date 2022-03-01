import { useCallback, useEffect, useRef, useState } from 'react';
import type { SelectProps } from '../select';
import type { ISelectAsyncProps } from '../types';
import { useControllableState } from '../../../hooks';

export type AsyncSelectProps<ValueType, IsMulti extends boolean> = SelectProps<ValueType, IsMulti> & ISelectAsyncProps;

export function useSelectAsync<ValueType, IsMulti extends boolean>({
  loadDataSource,
  loading: loadingProp,
  dataSource: dataSourceProp,
  onSearch: onSearchProp,

  // Async Presets
  showSearch = true,
  filterOption = null,

  ...restSelectProps
}: AsyncSelectProps<ValueType, IsMulti>): SelectProps<ValueType, IsMulti> {
  const { searchValue: searchValueProp, defaultSearchValue: defaultSearchValueProp } = restSelectProps;

  const [searchValue, setSearchValue] = useControllableState({
    name: 'AsyncSelect',
    defaultValue: defaultSearchValueProp,
    value: searchValueProp,
    onChange: (nextValue) => {
      onSearchProp?.(nextValue, null);
    },
  });

  const lastRequest = useRef<unknown>(undefined);
  const mounted = useRef(false);

  // Defaults to loading state if `loadDataSource` is a function
  const [isLoading, setIsLoading] = useState(typeof loadDataSource === 'function');
  const [loadedDataSource, setLoadedDataSource] = useState([]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    loadDataSource(searchValue).then((nextDataSource) => {
      if (!mounted.current) return;
      setLoadedDataSource(nextDataSource);
      setIsLoading(!!lastRequest.current);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = useCallback(
    (nextSearchValue: string, detail: any) => {
      if (!nextSearchValue) {
        lastRequest.current = undefined;
        setSearchValue('');
        setLoadedDataSource([]);
        setIsLoading(false);
        return;
      }

      const request = (lastRequest.current = {});
      setSearchValue(nextSearchValue);
      setIsLoading(true);

      loadDataSource(nextSearchValue).then((nextDataSource) => {
        if (!mounted) return;
        if (request !== lastRequest.current) return;

        lastRequest.current = undefined;
        setIsLoading(false);
        setLoadedDataSource(nextDataSource);
      });
    },
    [loadDataSource, setSearchValue],
  );

  const dataSource = loadDataSource
    ? // 开启远程搜索
      isLoading
      ? []
      : loadedDataSource
    : // 不开启远程搜索
      dataSourceProp;

  return {
    ...restSelectProps,
    loading: isLoading || loadingProp,
    dataSource,
    showSearch,
    filterOption,
    onSearch,
  };
}
