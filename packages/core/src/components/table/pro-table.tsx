import { BaseTableProps, features, TablePipeline } from 'ali-react-table';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { Pagination, PaginationProps } from '../pagination';
import { BaseTable, HIPPO_TABLE_PIPELINE_CTX } from './base-table';
import * as tableHacks from './table-hacks';

// TODO 移除本文件中的 ts-ignore

const ProTableWrapperDiv = styled.div.withConfig({
  componentId: 'hippo-table-wrapper',
})`
  // TODO 移除 .hippo
  > .hippo-table-toolbar {
    margin-bottom: 12px;
  }

  > .hippo-table-footer {
    margin-top: 12px;
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
};

const featureNames = Object.keys(featDict) as (keyof typeof featDict)[];

export interface ProTableFeatureProps {
  // 表格拓展功能
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
}

function omit<T extends object, KS extends keyof T>(
  input: T,
  omitKeys: KS[],
): {
  [K in keyof Omit<T, KS>]: T[K];
} {
  const keySet = new Set(omitKeys) as Set<string>;
  const result: any = {};
  for (const key of Object.keys(input)) {
    if (!keySet.has(key)) {
      result[key] = input[key];
    }
  }
  return result;
}

export interface ProTableProps extends BaseTableProps, ProTableFeatureProps {
  pagination?: PaginationProps;

  /** @deprecated todo 功能实现中 */
  toolbar?: any; // TODO ToolbarProps;

  // 表格外层 div
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  wrapperStyle?: React.CSSProperties;
  wrapperClassName?: string;
}

interface ProTableState {
  pipelineState: object;
  pagination: {
    pageSize: number;
    current: number;
  };
}

/** 开箱即用的 Hippo Design 表格组件 */
export class ProTable extends React.Component<ProTableProps, ProTableState> {
  static features = {
    ...features,
    ...featDict,
  };

  constructor(props: ProTableProps) {
    super(props);

    this.state = {
      pipelineState: {},
      pagination: {
        // @ts-ignore
        current: props.pagination?.defaultCurrent ?? 1,
        // @ts-ignore
        pageSize: props.pagination?.pageSize ?? 10,
      },
    };
  }

  setPipelineState = (updater: React.ReducerWithoutAction<object>) => {
    this.setState((prev) => ({
      pipelineState: updater(prev.pipelineState),
    }));
  };

  setupFeatures(pipeline: TablePipeline) {
    const props = this.props;
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

  onPaginationChange = (current: number) => {
    this.props.pagination.onChange?.(current);
    this.setState({
      pagination: { ...this.state.pagination, current },
    });
  };

  onPaginationPageSizeChange = (pageSize: number) => {
    this.props.pagination.onPageSizeChange?.(pageSize);
    this.setState({
      pagination: { ...this.state.pagination, pageSize },
    });
  };

  renderToolbar(): React.ReactNode {
    return null;
    // const { toolbar } = this.props;
    // if (!toolbar) {
    //   return null;
    // }
    //
    // let { tipNode, totalCount, ...others } = toolbar;
    // if (tipNode == null) {
    //   if (typeof totalCount === 'string' || typeof totalCount === 'number') {
    //     tipNode = `共 ${totalCount} 条数据`;
    //   }
    // }
    //
    // return <Toolbar className="hippo-table-toolbar" tipNode={tipNode} {...others} />;
  }

  renderFooter() {
    const { pagination, dataSource } = this.props;

    return (
      pagination && (
        <Pagination
          // @ts-ignore
          total={dataSource.length}
          {...pagination}
          onChange={this.onPaginationChange}
          onPageSizeChange={this.onPaginationPageSizeChange}
        />
      )
    );
    // const { dataSource, pagination, footer, footerActions } = this.props;
    //
    // if (footer || pagination || footerActions) {
    //   return (
    //     <Toolbar
    //       {...footer}
    //       className={cx('hippo-table-footer', footer?.className)}
    //       leftActions={footer?.leftActions ?? footerActions}
    //       rightNode={
    //         footer?.rightNode ??
    //         (pagination ? (
    //           <Pagination
    //             total={dataSource.length}
    //             {...omit(pagination, ['keepDataSource'])}
    //             onChange={this.onPaginationChange}
    //             onPageSizeChange={this.onPaginationPageSizeChange}
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

      ...others
    } = this.props;

    const pipeline = new TablePipeline({
      state: this.state.pipelineState,
      setState: this.setPipelineState,
      ctx: HIPPO_TABLE_PIPELINE_CTX,
    });
    pipeline.input({ dataSource, columns });

    if (primaryKey != null) {
      pipeline.primaryKey(primaryKey);
    }

    // 兼容 dataIndex
    pipeline.mapColumns(tableHacks.compatWithDataIndex);
    pipeline.mapColumns(tableHacks.compatWithColumnCell);

    if (pagination) {
      // @ts-ignore
      const pageSize = pagination.pageSize ?? this.state.pagination.pageSize;
      // @ts-ignore
      const current = pagination.current ?? this.state.pagination.current;
      pipeline.mapDataSource((rows) => rows.slice((current - 1) * pageSize, current * pageSize));
    }

    this.setupFeatures(pipeline);

    if (getRowProps) {
      pipeline.appendRowPropsGetter(getRowProps);
    }

    return (
      <ProTableWrapperDiv {...wrapperProps} className={cx('rex-table-wrapper', wrapperClassName)} style={wrapperStyle}>
        {this.renderToolbar()}
        <BaseTable {...omit(others, featureNames)} className={cx(className, 'rex-table')} {...pipeline.getProps()} />
        {this.renderFooter()}
      </ProTableWrapperDiv>
    );
  }
}
