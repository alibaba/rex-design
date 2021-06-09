import { action, computed, Lambda, makeObservable, observable, reaction, runInAction } from 'mobx';
import { Field } from '../models';
import { AsyncValue } from './AsyncValue';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RemoteSearch {
  export interface Options {
    field?: Field<any>;
    fetchLabel?: (value: any) => Promise<any>;
    debounceTime?: number;
    mode?: 'single' | 'multiple';
    skipEmptySearchResult?: boolean;
    resetSearchValueWhenValueChange?: boolean;
  }
}

/**
 * 远程搜索辅助函数，用于简化 Select 远程搜索的实现.
 *
 * 目前支持以下特性：
 * - 搜索防抖： 默认为 200ms，可通过 options.debounceTime 进行调整
 * - label 缓存： 当 value 动态发生变化时，优先使用内部缓存的 label，并在必要时按需获取 label
 *   （需要配置 options.field & options.fetchLabel）
 * - loading 状态： dataSource 加载过程中，自动设置 state='loading'
 * - 多选：支持多选模式下的远程搜索
 * */
export class RemoteSearch {
  public _isFetchingLabel = false;
  public _searchValue = '';
  public _debouncedSearchValue = '';
  readonly options: Required<RemoteSearch.Options>;

  /** 所有 value -> label 的缓存 */
  private _labelCache = observable.map<string, string>({}, { deep: false });

  /** 根据搜索获取的数据源 */
  private _dataSourceFromSearch$: AsyncValue<Array<{ label: string; value: string }>>;
  private _debounceHandle: any;
  private _disposers: Lambda[] = [];

  get mode() {
    return this.options.mode;
  }

  constructor(
    readonly search: (keyword: string) => Promise<Array<{ label: string; value: string }>>,
    {
      field = null,
      fetchLabel = null,
      skipEmptySearchResult = false,
      resetSearchValueWhenValueChange = false,
      debounceTime = 200,
      mode = 'single',
    }: RemoteSearch.Options = {},
  ) {
    this.search = search;
    this.options = {
      field,
      fetchLabel,
      skipEmptySearchResult,
      resetSearchValueWhenValueChange,
      debounceTime,
      mode,
    };

    makeObservable(this, {
      _searchValue: observable,
      _debouncedSearchValue: observable,
      dataSource: computed,
      selectProps: computed,
      _isFetchingLabel: observable,
    });

    this._dataSourceFromSearch$ = new AsyncValue(async () => {
      const result = await this.search(this._debouncedSearchValue);
      return this.options.skipEmptySearchResult && result.length === 0 ? this._dataSourceFromSearch$.current : result;
    }, []);
    this._disposers.push(() => this._dataSourceFromSearch$.dispose());

    if (this.options.field) {
      const field = this.options.field;
      this._disposers.push(
        reaction(
          () => {
            const value = field.value;
            const dataSource = this._dataSourceFromSearch$.current;
            return { value, dataSource };
          },
          ({ value, dataSource }) => {
            for (const item of dataSource) {
              this._labelCache.set(item.value, item.label);
            }

            if (value == null || this.options.fetchLabel == null) {
              return;
            }

            // value 发生变化时，现有的 dataSource 可能无法覆盖到新的 value
            // 此时我们需要调用 this.options.fetchLabel 来获取相应 label 以生成完整的 dataSource

            if (this.mode === 'multiple') {
              const queryValues = (value as string[]).filter((v) => !this._labelCache.has(v));
              if (queryValues.length === 0) {
                return;
              }
              // mode=multiple 时： fetchLabel: (values: string[]) => Promise<string[]>
              this._isFetchingLabel = true;
              this.options.fetchLabel(queryValues).then(
                action((labels: string[]) => {
                  this._isFetchingLabel = false;
                  labels.forEach((label, i) => {
                    this._labelCache.set(queryValues[i], label);
                  });
                }),
              );
            } else {
              // mode=single
              if (this._labelCache.has(value)) {
                return;
              }
              // mode=single 时： fetchLabel: (value: string) => Promise<string>
              this._isFetchingLabel = true;
              this.options.fetchLabel(value).then(
                action((label) => {
                  this._isFetchingLabel = false;
                  this._labelCache.set(value, label);
                }),
              );
            }
          },
          { fireImmediately: true },
        ),
      );
      if (this.options.resetSearchValueWhenValueChange) {
        this._disposers.push(
          reaction(
            () => field.value,
            () => (this._searchValue = ''),
          ),
        );
      }
    }
  }

  public dispose() {
    runInAction(() => {
      this._labelCache.clear();
      clearTimeout(this._debounceHandle);
      for (const fn of this._disposers) {
        fn();
      }
    });
  }

  get dataSource() {
    const dataSourceFromSearch = this._dataSourceFromSearch$.current;

    if (this.options.field) {
      const value = this.options.field.value;
      const inDataSourceValueSet = new Set(dataSourceFromSearch.map((item) => item.value));
      const currentValues: string[] = this.mode === 'multiple' ? value : [value];
      const appendDataSource = currentValues
        .filter((v) => !inDataSourceValueSet.has(v))
        .map((v) => ({ label: this._labelCache.get(v), value: v }))
        .filter((item) => item.label != null && item.label.includes(this._searchValue));
      return dataSourceFromSearch.concat(appendDataSource);
    }
    return dataSourceFromSearch;
  }

  public setSearchValue = action((nextSearchValue: string, debounce = true) => {
    this._searchValue = nextSearchValue;

    if (debounce) {
      clearTimeout(this._debounceHandle);
      this._debounceHandle = setTimeout(
        action(() => {
          this._debouncedSearchValue = this._searchValue;
        }),
        this.options.debounceTime,
      );
    } else {
      clearTimeout(this._debounceHandle);
      this._debouncedSearchValue = this._searchValue;
    }
  });

  get selectProps() {
    return {
      mode: this.mode,
      showSearch: true,
      filterLocal: false,
      searchValue: this._searchValue,
      onSearch: this.setSearchValue,
      dataSource: this.dataSource,
      state: this._dataSourceFromSearch$.status === 'loading' || this._isFetchingLabel ? 'loading' : undefined,
    };
  }
}
