import { useCallback, useEffect, useRef, useState } from 'react';
import { useControllableState } from '../../../hooks';
import type { SelectProps } from '../select';
import type { ISelectAsyncProps, SelectItem } from '../types';

export type AsyncSelectProps<ValueType, IsMulti extends boolean> = SelectProps<ValueType, IsMulti> & ISelectAsyncProps;

export function useSelectAsync<ValueType, IsMulti extends boolean>({
  loadDataSource,
  loading: loadingProp,
  dataSource: dataSourceProp,
  onSearch: onSearchProp,
  cacheOptions = true,

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
  const [optionsCache, setOptionsCache] = useState<Record<string, Array<SelectItem<ValueType>>>>({});
  const [prevCacheOptions, setPrevCacheOptions] = useState(undefined);

  if (cacheOptions !== prevCacheOptions) {
    setOptionsCache({});
    setPrevCacheOptions(cacheOptions);
  }

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
    (nextSearchValue: string) => {
      if (!nextSearchValue) {
        lastRequest.current = undefined;
        setSearchValue('');
        setLoadedDataSource([]);
        setIsLoading(false);
        return;
      }

      // 如果当前命中缓存, 直接读
      if (cacheOptions && optionsCache[nextSearchValue]) {
        setSearchValue(nextSearchValue);
        setLoadedDataSource(optionsCache[nextSearchValue]);
        setIsLoading(false);
      } else {
        const request = (lastRequest.current = {});
        setSearchValue(nextSearchValue);
        setIsLoading(true);

        loadDataSource(nextSearchValue).then((nextDataSource) => {
          if (!mounted) return;
          if (request !== lastRequest.current) return;

          lastRequest.current = undefined;
          setIsLoading(false);
          setLoadedDataSource(nextDataSource);
          setOptionsCache(nextDataSource ? { ...optionsCache, [nextSearchValue]: nextDataSource } : optionsCache);
        });
      }
    },
    [cacheOptions, loadDataSource, optionsCache, setSearchValue],
  );

  const dataSource = loadDataSource ? loadedDataSource : [];

  return {
    ...restSelectProps,
    loading: isLoading || loadingProp,
    dataSource,
    showSearch,
    filterOption,
    onSearch,
  };
}
