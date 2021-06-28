import {
  BaseTableProps,
  collectNodes,
  features,
  isLeafNode,
  makeRecursiveMapper,
  TablePipeline,
} from 'ali-react-table';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { omit } from '../../utils';
import { Pagination, PaginationProps } from '../pagination';
import { Toolbar, ToolbarProps } from '../toolbar';
import { BaseTable, Column, REX_TABLE_PIPELINE_CTX } from './base-table';
import { ColumnFilterDrawer } from './column-filter-drawer';
import { columnCollapse, ColumnCollapseFeatureOptions } from './feature-columnCollapse';
import { parseColumns } from './parseColumns';
import * as tableHacks from './table-hacks';

const ProTableWrapperDiv = styled.div`
  > .rex-toolbar {
    margin-bottom: 8px;
  }

  > .rex-table-footer {
    margin-top: 8px;
  }
`;

const featDict = {
  sort: tableHacks.sortCompatibleWithDataIndex,
  singleSelect: features.singleSelect,
  multiSelect: features.multiSelect,
  treeMode: features.treeMode,
  treeSelect: features.treeSelect,
  rowGrouping: features.rowGrouping,
  columnRangeHover: features.columnRangeHover,
  columnHover: features.columnHover,
  rowDetail: features.rowDetail,
  tips: features.tips,
  columnResize: features.columnResize,
  autoRowSpan: features.autoRowSpan,
  columnCollapse: columnCollapse,
};

const featureNames = Object.keys(featDict) as (keyof typeof featDict)[];

export interface ProTableFeatureProps {
  sort?: boolean | tableHacks.SortCompatibleWithDataIndexFeatureOptions;
  singleSelect?: boolean | features.SingleSelectFeatureOptions;
  multiSelect?: boolean | features.MultiSelectFeatureOptions;
  treeMode?: boolean | features.TreeModeFeatureOptions;
  treeSelect?: boolean | features.TreeSelectFeatureOptions;
  rowGrouping?: boolean | features.RowGroupingFeatureOptions;
  columnRangeHover?: boolean;
  columnHover?: boolean;
  rowDetail?: boolean | features.RowDetailFeatureOptions;
  tips?: boolean;
  columnResize?: boolean | features.ColumnResizeFeatureOptions;
  autoRowSpan?: boolean;
  columnCollapse?: boolean | ColumnCollapseFeatureOptions;
  columnFilter?: ColumnFilterOptions;
}

const BEFORE_COLUMN_FILTER = 'BEFORE_COLUMN_FILTER';

/**
 * 获取 pipeline 实例上的 cache，用于缓存一些中间计算结果
 * pro table 会使用 cache 来存放 visibleCodes 的计算结果 */
function getPipelineCache(_pipeline: TablePipeline) {
  const pipeline: any = _pipeline;
  if (pipeline._cache == null) {
    pipeline._cache = {};
  }
  return pipeline._cache;
}

// columnFilter 包含额外的 UI，且实现过程中涉及大量内部渲染逻辑，所以我们在这里单独定义 ColumnFilterOptions
interface ColumnFilterOptions {
  /**
   * 受控用法，当前可见的列；
   * 设置 column.features.enforceVisible=true 时，对应的列总是可见；
   * 不设置 visibleCodes 时为非受控用法，所有列均默认可见，可以通过 column.features.defaultVisible=false 配置默认不可见
   * */
  visibleCodes?: string[];

  /** 受控用法，visibleCodes 发生变化的回调 */
  onChange?(nextVisibleCodes: string[]): void;

  /** 为 columnFilter 提供自定义的列配置 */
  columns?: Column[];

  /** 设置自定义列抽屉标题 */
  drawerTitle?: React.ReactNode;

  /** 设置自定义列抽屉宽度，默认 500px */
  drawerWidth?: number;

  /** 是否显示「全选」按钮 */
  showCheckAll?: boolean;

  /** 是否显示「清空」按钮 */
  showUncheckAll?: boolean;

  /** 设置为 true 后，columnFilter 将不对表格产生影响（表格会根据 props.columns 来决定渲染哪些列） */
  keepTableColumns?: boolean;

  // todo visible 自定义列 drawer 是否打开暂时只支持非受控用法
}

export interface ProTableProps extends BaseTableProps, ProTableFeatureProps {
  pagination?: PaginationProps & { keepDataSource?: boolean };

  toolbar?: ToolbarProps & { totalCount?: number | 'auto' | '-' };

  // 表格外层 div
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  wrapperStyle?: React.CSSProperties;
  wrapperClassName?: string;
}

interface ProTableState {
  columnFilterState: {
    drawerVisible: boolean;
    visibleCodes: null | string[];
  };
  pipelineState: object;
  pagination: {
    pageSize: number;
    current: number;
  };
}

/** 开箱即用的 ReX Design 表格组件 */
export class ProTable extends React.Component<ProTableProps, ProTableState> {
  static Column = (props: Omit<Column, 'children'>) => {
    /** <ProTable.Column /> */
    return null as React.ReactElement;
  };
  static ColumnGroup = (props: Omit<Column, 'children'> & { children?: React.ReactNode }) => {
    /** <ProTable.ColumnGroup /> */
    return null as React.ReactElement;
  };

  static parseColumns = parseColumns;

  static features = {
    ...features,
    ...featDict,
  };

  constructor(props: ProTableProps) {
    super(props);

    this.state = {
      columnFilterState: {
        drawerVisible: false,
        // 这里 visibleCodes 是特意设置为 null 的
        // 在渲染时，若 columnFilterState.visibleCodes 为 null，则所有列均默认可见
        visibleCodes: null,
      },
      pipelineState: {},
      pagination: {
        // todo
        current: props.pagination?.defaultCurrent ?? 1,
        pageSize: props.pagination?.pageSize ?? 10,
      },
    };
  }

  _setPipelineState = (updater: React.ReducerWithoutAction<object>) => {
    this.setState((prev) => ({
      pipelineState: updater(prev.pipelineState),
    }));
  };

  _setupFeatures(pipeline: TablePipeline) {
    const props = this.props;
    // 多个表格拓展的应用顺序是固定的
    for (const featName of featureNames) {
      let opts: any = props[featName];
      if (opts == null || opts === false) {
        continue;
      }
      if (opts === true) {
        opts = {};
      }
      const feature = featDict[featName];
      pipeline.use(feature(opts));
    }
  }

  _onPaginationChange = (current: number) => {
    this.props.pagination.onChange?.(current);
    this.setState((prev) => ({
      pagination: { ...prev.pagination, current },
    }));
  };

  _onPaginationPageSizeChange = (pageSize: number) => {
    this.props.pagination.onPageSizeChange?.(pageSize);
    this.setState((prev) => ({
      pagination: { ...prev.pagination, pageSize },
    }));
  };

  _setColumnFilterDrawerVisibility = (visible: boolean) => {
    this.setState((prev) => ({
      columnFilterState: {
        ...prev.columnFilterState,
        drawerVisible: visible,
      },
    }));
  };

  _setColumnFilterVisibleCodes = (nextVisibleCodes: string[]) => {
    this.setState((prev) => ({
      columnFilterState: {
        ...prev.columnFilterState,
        visibleCodes: nextVisibleCodes,
      },
    }));
  };

  _renderToolbar(pipeline: TablePipeline) {
    const { toolbar, columnFilter } = this.props;
    if (toolbar == null && columnFilter == null) {
      return null;
    }

    let renderedColumnFilter = null;
    const { columnFilterState } = this.state;
    // eslint-disable-next-line prefer-const
    let { tipNode, totalCount, rightActions = [], ...others } = toolbar ?? {};

    if (tipNode == null) {
      if (typeof totalCount === 'string' || typeof totalCount === 'number') {
        tipNode = `共 ${totalCount} 条数据`;
      }
    }

    if (columnFilter != null) {
      rightActions.push({
        key: 'columnFilter',
        label: '自定义列',
        icon: 'setting',
        // todo 使用以前的 onClick???
        onSelect: () => this._setColumnFilterDrawerVisibility(true),
      });

      const columnsBeforeFilter = pipeline.getColumns(BEFORE_COLUMN_FILTER);
      const leafColumnsBeforeFilter = collectNodes(columnsBeforeFilter, 'leaf-only');
      const enforceVisibleCodes = leafColumnsBeforeFilter
        .filter((col) => col.features?.enforceVisible)
        .map((col) => col.code);

      const { visibleCodes } = getPipelineCache(pipeline);

      renderedColumnFilter = (
        <ColumnFilterDrawer
          // drawer 配置
          title={columnFilter.drawerTitle}
          width={columnFilter.drawerWidth}
          visible={columnFilterState.drawerVisible}
          onRequestClose={() => this._setColumnFilterDrawerVisibility(false)}
          // 其他配置
          columns={columnFilter.columns ?? columnsBeforeFilter}
          showCheckAll={columnFilter.showCheckAll}
          showUncheckAll={columnFilter.showUncheckAll}
          enforceCheckedCodes={enforceVisibleCodes}
          checkedCodes={visibleCodes}
          onChange={(nextVisibleCodes) => {
            columnFilter.onChange?.(nextVisibleCodes);
            this._setColumnFilterVisibleCodes(nextVisibleCodes);
          }}
        />
      );
    }

    return (
      <>
        <Toolbar tipNode={tipNode} rightActions={rightActions} {...others} />
        {renderedColumnFilter}
      </>
    );
  }

  _renderFooter() {
    const { pagination, dataSource } = this.props;

    return (
      pagination && (
        <Pagination
          total={dataSource.length}
          {...pagination}
          onChange={this._onPaginationChange}
          onPageSizeChange={this._onPaginationPageSizeChange}
        />
      )
    );

    // todo
    // const { dataSource, pagination, footer, footerActions } = this.props;
    //
    // if (footer || pagination || footerActions) {
    //   return (
    //     <Toolbar
    //       {...footer}
    //       className={cx('rex-table-footer', footer?.className)}
    //       leftActions={footer?.leftActions ?? footerActions}
    //       rightNode={
    //         footer?.rightNode ??
    //         (pagination ? (
    //           <Pagination
    //             total={dataSource.length}
    //             {...omit(pagination, ['keepDataSource'])}
    //             onChange={this._onPaginationChange}
    //             onPageSizeChange={this._onPaginationPageSizeChange}
    //           />
    //         ) : null)
    //       }
    //     />
    //   );
    // }
    //
    // return null;
  }

  render() {
    const {
      // 基本 props
      style,
      className,
      primaryKey,
      dataSource,
      columns,
      getRowProps,

      // UI 拓展（表格工具栏 & 翻页器）
      wrapperProps,
      wrapperClassName,
      wrapperStyle,
      toolbar,
      pagination,
      columnFilter,

      ...others
    } = this.props;
    const { columnFilterState } = this.state;

    const pipeline = new TablePipeline({
      state: this.state.pipelineState,
      setState: this._setPipelineState,
      ctx: REX_TABLE_PIPELINE_CTX,
    });
    pipeline.input({ dataSource, columns });

    if (primaryKey != null) {
      pipeline.primaryKey(primaryKey);
    }

    // 兼容 dataIndex
    pipeline.mapColumns(tableHacks.compatWithDataIndex);
    pipeline.mapColumns(tableHacks.compatWithColumnCell);

    if (columnFilter != null) {
      pipeline.snapshot(BEFORE_COLUMN_FILTER);

      const columnsBeforeFilter = pipeline.getColumns(BEFORE_COLUMN_FILTER);
      const leafColumnsBeforeFilter = collectNodes(columnsBeforeFilter, 'leaf-only');

      const visibleCodes =
        columnFilter.visibleCodes ??
        columnFilterState.visibleCodes ??
        leafColumnsBeforeFilter.filter((col) => col.features?.defaultVisible !== false).map((col) => col.code);

      getPipelineCache(pipeline).visibleCodes = visibleCodes;

      if (!columnFilter.keepTableColumns) {
        const visibleCodeSet = new Set(visibleCodes);
        pipeline.mapColumns(
          makeRecursiveMapper((col) => {
            if (!isLeafNode(col)) {
              return col;
            }
            const enforceChecked = col.features?.enforceVisible;
            const checked = visibleCodeSet.has(col.code);
            return checked || enforceChecked ? col : [];
          }),
        );
      }
    }

    if (pagination && !pagination.keepDataSource) {
      const pageSize = pagination.pageSize ?? this.state.pagination.pageSize;
      const current = pagination.current ?? this.state.pagination.current;
      pipeline.mapDataSource((rows) => rows.slice((current - 1) * pageSize, current * pageSize));
    }

    this._setupFeatures(pipeline);

    if (getRowProps) {
      pipeline.appendRowPropsGetter(getRowProps);
    }

    return (
      <ProTableWrapperDiv {...wrapperProps} className={cx('rex-table-wrapper', wrapperClassName)} style={wrapperStyle}>
        {this._renderToolbar(pipeline)}
        <BaseTable
          {...omit(others, featureNames)}
          style={style}
          className={cx(className, 'rex-table')}
          {...pipeline.getProps()}
        />
        {this._renderFooter()}
      </ProTableWrapperDiv>
    );
  }
}
