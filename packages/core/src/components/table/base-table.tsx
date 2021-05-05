import {
  BaseTable as ArtBaseTable,
  BaseTableProps,
  getTreeDepth,
  LoadingContentWrapperProps,
  useTablePipeline as useArtTablePipeline,
} from 'ali-react-table';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { useColorMode, useDevice } from '../../providers';
import theme from '../../theme';
import { Checkbox } from '../checkbox';

import { Loading } from '../loading';
import { Radio } from '../radio';
import { TableHeaderTipsTooltip } from './table-hacks';

function HippoLoadingContentWrapper(props: LoadingContentWrapperProps) {
  const { visible, children } = props;

  return (
    <div className="hippo-loading-content-wrapper">
      {children}

      {visible && (
        <div
          style={{
            background: 'var(--bgcolor)',
            opacity: 0.4,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}

const StyledLoading = styled(Loading)`
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;

  > .rex-rotate {
    width: 100%;
    height: 100%;
  }
`;

const StyledArtBaseTable: any = styled(ArtBaseTable)`
  --row-height: 50px;
  --header-row-height: 36px;
  --border-color: #eee;
  --lock-shadow: rgba(100, 100, 100, 0.25) 0px 0 4px 2px;
  --cell-padding: 8px 20px;
  --line-height: 20px;

  --color: #333;
  --header-color: #333;
  --bgcolor: #fff;
  --header-bgcolor: #f5f5f5;
  --hover-bgcolor: #f5f5f5;
  --header-hover-bgcolor: #eee;
  --highlight-bgcolor: #f5f5f5;
  --header-highlight-bgcolor: #eee;

  &.dark {
    --bgcolor: #333;
    --header-bgcolor: #45494f;
    --hover-bgcolor: #46484a;
    --header-hover-bgcolor: #606164;
    --highlight-bgcolor: #191a1b;
    --header-highlight-bgcolor: #191a1b;
    --color: #dadde1;
    --header-color: #dadde1;
    --lock-shadow: rgb(37 37 37 / 0.5) 0 0 6px 2px;
    --border-color: #3c4045;
  }

  &.header-depth-1 {
    --header-row-height: 40px;
  }

  &.header-depth-0 {
    --header-row-height: 50px;
  }

  &:not(.bordered) {
    --cell-border-vertical: none;
    --header-cell-border-vertical: none;

    thead > tr.first th {
      border-top: none;
    }

    thead > tr.last th {
      border-bottom: none;
    }
  }

  th {
    font-weight: 500;
  }

  &.compact {
    --row-height: 40px;
    --header-row-height: 40px;
    --cell-padding: 8px 16px;
  }

  &.zebra tr.odd,
  tr.alternative {
    --bgcolor: var(--hover-bgcolor);
  }

  &.small {
    --cell-border-horizontal: none;
    --cell-padding: 8px;

    tr.odd {
      --bgcolor: #f1f6fa;
    }
  }
`;

export { BaseTableProps, ArtColumn as Column } from 'ali-react-table';

/**
 * Hippo Design 基础表格组件.
 *
 * `BaseTable` 在开源的 ali-react-table 的基础表格上定制了 hippo 的表格样式，用法与开源表格完全相同，详见开源的文档
 *
 * @see https://ali-react-table.js.org/docs */
export const BaseTable = React.forwardRef<ArtBaseTable, BaseTableProps>((props, ref) => {
  const headerDepth = getTreeDepth(props.columns);
  const { colorMode } = useColorMode();
  const { device } = useDevice();

  return (
    <StyledArtBaseTable
      theme={theme}
      ref={ref}
      {...props}
      className={cx(props.className, {
        'header-depth-0': headerDepth === 0,
        'header-depth-1': headerDepth === 1,
        dark: colorMode === 'dark',
        small: device.name === 'phone',
      })}
      components={{
        LoadingContentWrapper: HippoLoadingContentWrapper,
        LoadingIcon: StyledLoading,
      }}
    />
  );
});

export const HIPPO_TABLE_PIPELINE_CTX = {
  components: { Radio, Checkbox, Balloon: TableHeaderTipsTooltip },
  indents: { iconIndent: -8, iconGap: 16, iconWidth: 16, indentSize: 24 } as const,
};

export function useTablePipeline() {
  return useArtTablePipeline(HIPPO_TABLE_PIPELINE_CTX);
}