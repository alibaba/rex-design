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
import * as tableUtils from './table-utils';

const ProTableWrapperDiv = styled.div`
  > .rex-toolbar {
    margin-bottom: 8px;
  }

  > .rex-table-footer {
    margin-top: 8px;
  }
`;

const featDict = {
  sort: tableUtils.sortCompatibleWithDataIndex,
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
  sort?: boolean | tableUtils.SortCompatibleWithDataIndexFeatureOptions;
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
 * ?????? pipeline ???????????? cache???????????????????????????????????????
 * pro table ????????? cache ????????? visibleCodes ??????????????? */
function getPipelineCache(_pipeline: TablePipeline) {
  const pipeline: any = _pipeline;
  if (pipeline._cache == null) {
    pipeline._cache = {};
  }
  return pipeline._cache;
}

// columnFilter ??????????????? UI??????????????????????????????????????????????????????????????????????????????????????? ColumnFilterOptions
interface ColumnFilterOptions {
  /**
   * ????????????????????????????????????
   * ?????? column.features.enforceVisible=true ?????????????????????????????????
   * ????????? visibleCodes ??????????????????????????????????????????????????????????????? column.features.defaultVisible=false ?????????????????????
   * */
  visibleCodes?: string[];

  /** ???????????????visibleCodes ????????????????????? */
  onChange?(nextVisibleCodes: string[]): void;

  /** ??? columnFilter ??????????????????????????? */
  columns?: Column[];

  /** ?????????????????????????????? */
  drawerTitle?: React.ReactNode;

  /** ??????????????????????????????????????? 500px */
  drawerWidth?: number;

  /** ?????????????????????????????? */
  showCheckAll?: boolean;

  /** ?????????????????????????????? */
  showUncheckAll?: boolean;

  /** ????????? true ??????columnFilter ????????????????????????????????????????????? props.columns ??????????????????????????? */
  keepTableColumns?: boolean;

  // ???????????? drawer ???????????????????????????????????????????????????????????????????????????
}

export interface ProTableProps extends BaseTableProps, ProTableFeatureProps {
  pagination?: PaginationProps & { keepDataSource?: boolean };

  toolbar?: ToolbarProps & { totalCount?: number | 'auto' | '-' };
  footer?: ToolbarProps;

  // ???????????? div
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

/** ??????????????? ReX Design ???????????? */
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
        // ?????? visibleCodes ?????????????????? null ???
        // ?????????????????? columnFilterState.visibleCodes ??? null??????????????????????????????
        visibleCodes: null,
      },
      pipelineState: {},
      pagination: {
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
    // ?????????????????????????????????????????????
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
        tipNode = `??? ${totalCount} ?????????`;
      }
    }

    if (columnFilter != null) {
      rightActions.push({
        key: 'columnFilter',
        label: '????????????',
        icon: 'setting',
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
          // drawer ??????
          title={columnFilter.drawerTitle}
          width={columnFilter.drawerWidth}
          visible={columnFilterState.drawerVisible}
          onRequestClose={() => this._setColumnFilterDrawerVisibility(false)}
          // ????????????
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
    const { dataSource, pagination, footer } = this.props;

    if (footer || pagination) {
      return (
        <Toolbar
          {...footer}
          className={cx('rex-table-footer', footer?.className)}
          rightNode={
            footer?.rightNode ??
            (pagination ? (
              <Pagination
                total={dataSource.length}
                {...omit(pagination, ['keepDataSource'])}
                onChange={this._onPaginationChange}
                onPageSizeChange={this._onPaginationPageSizeChange}
              />
            ) : null)
          }
        />
      );
    }

    return null;
  }

  render() {
    const {
      // ?????? props
      style,
      className,
      primaryKey,
      dataSource,
      columns,
      getRowProps,

      // UI ???????????????????????? & ????????????
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

    // ?????? dataIndex
    pipeline.mapColumns(tableUtils.compatWithDataIndex);
    pipeline.mapColumns(tableUtils.compatWithColumnCell);

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
