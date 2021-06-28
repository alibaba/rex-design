import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React, { useState } from 'react';
import styled from 'styled-components';
import { composeHandlers, composeState } from '../../utils';
import { Button, ButtonProps } from '../button';
import { Select } from '../select';

const defaultLocale = {
  previous: '上一页',
  next: '下一页',
};

// 注意该 range 与 lodash.range 有一些不同，该 range 生成的序列会包含 start 和 end
const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

/**
 * 头尾总是展示的按钮个数
 *
 * @example BOUNDARY_COUNT = 2
 * < 1 2 ... 3 4 5 ... 70 71 >
 *   ↑ ↑               ↑  ↑
 */
const BOUNDARY_COUNT = 1;

/**
 * 当前页前后显示的按钮个数
 *
 * @example SIBLING_COUNT = 1
 * < 1 2 ... 3 4 5 ... 70 71 >
 *           ↑ ↑ ↑
 * 4 是当前页码, 前后追加展示 1 个按钮
 */
const SIBLING_COUNT = 1;

const PaginationDiv = styled.div`
  display: inline-flex;
  align-items: center;
  user-select: none;

  &.rex-fill {
    width: 100%;
  }

  > * {
    margin-left: var(--rex-space-m);
    &:first-child {
      margin-left: 0;
    }
  }

  .rex-pagination-page-size-select {
    display: inline-flex;
    align-items: center;
    margin-left: var(--rex-space-xl);

    .rex-pagination-page-size-select-label {
      margin-right: var(--rex-space-m);
    }
  }
`;

export interface PaginationProps {
  style?: React.CSSProperties;
  className?: string;
  fill?: boolean;

  /** 分页器按钮尺寸 */
  size?: ButtonProps['size'];

  /** 外观类型 */
  shape?: 'normal' | 'simple';

  /** 总记录数 */
  total?: number;

  /** 受控的 page 页码值（页码从 1 开始） */
  current?: number;

  /** 默认激活的页码（页码从 1 开始） */
  defaultCurrent?: number;

  /** 页码变化时的回调 */
  onChange?: (nextValue: number) => void;

  /** 是否禁用 */
  disabled?: boolean;

  /** 是否有下翻页按钮 */
  hasNextButton?: boolean;

  /** 是否有上翻页按钮 */
  hasPrevButton?: boolean;

  /** 每页数据的个数，需受控使用 */
  pageSize?: number;

  /** 非受控用法下，pageSize 的默认值 */
  defaultPageSize?: number;

  /** 每页个数选择的列表 */
  pageSizeList?: number[];

  /** 是否有页数选择列表 */
  hasPageSizeList?: boolean;

  /**
   * 每页个数变化时的回调
   * @param nextPageSize 变化后的每页数据个数
   */
  onPageSizeChange?(nextPageSize: number): void;

  /** 文案 */
  locale?: {
    previous: string;
    next: string;
  };

  /**
   * type 设置为 normal 时，在页码数超过5页后，会显示跳转输入框与按钮;
   * 当设置 showJump 为 false 时，不再显示该跳转区域 */
  showJump?: boolean;
}

export function Pagination({
  style,
  className,
  fill,
  size = 'medium',
  shape = 'normal',
  current: currentProp,
  defaultCurrent = 1,
  onChange: onChangeProp,
  total = 100,
  disabled,
  hasNextButton = true,
  hasPrevButton = true,
  hasPageSizeList = false,
  pageSize: pageSizeProp,
  defaultPageSize = 10,
  pageSizeList = [5, 10, 20],
  onPageSizeChange: onPageSizeChangeProp,
  locale = defaultLocale,
}: PaginationProps) {
  const [_pageSize, _onPageSizeChange] = useState(defaultPageSize);
  const pageSize = composeState(pageSizeProp, _pageSize);
  const onPageSizeChange = composeHandlers(onPageSizeChangeProp, _onPageSizeChange);

  const [_current, _onChange] = useState(defaultCurrent);
  const current = composeState(currentProp, _current);
  const onChange = composeHandlers(onChangeProp, _onChange);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const startPages = range(1, Math.min(BOUNDARY_COUNT, pageCount));
  const endPages = range(Math.max(pageCount - BOUNDARY_COUNT + 1, BOUNDARY_COUNT + 1), pageCount);
  const siblingsStart = Math.max(
    Math.min(current - SIBLING_COUNT, pageCount - BOUNDARY_COUNT - SIBLING_COUNT * 2 - 1),
    BOUNDARY_COUNT + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(current + SIBLING_COUNT, BOUNDARY_COUNT + SIBLING_COUNT * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : pageCount - 1,
  );

  const nodes: React.ReactElement[] = [];

  const pageBtn = (page: number) => (
    <Button key={page} size={size} isSelected={current === page} onClick={() => onChange(page)}>
      {page}
    </Button>
  );
  const prevBtn = () => (
    <Button key="prev" size={size} disabled={disabled || current <= 1} onClick={() => onChange(current - 1)}>
      {locale.previous}
    </Button>
  );
  const nextBtn = () => (
    <Button key="next" size={size} disabled={disabled || current >= pageCount} onClick={() => onChange(current + 1)}>
      {locale.next}
    </Button>
  );

  if (shape === 'simple') {
    nodes.push(
      prevBtn(),
      <span key="current">
        {current}/{pageCount}页
      </span>,
      nextBtn(),
    );
  } else {
    // 「上一页」按钮
    if (hasPrevButton) {
      nodes.push(prevBtn());
    }

    // 起始页码
    startPages.forEach((page) => {
      nodes.push(pageBtn(page));
    });

    // 起始的省略号
    if (siblingsStart > BOUNDARY_COUNT + 2) {
      nodes.push(
        <Button key="start-ellipsis" isIconButton shape="text">
          <Icon type="ellipsis" />
        </Button>,
      );
    } else if (BOUNDARY_COUNT + 1 < pageCount - BOUNDARY_COUNT) {
      nodes.push(pageBtn(BOUNDARY_COUNT + 1));
    }

    // 当前页码 以及 当前左右两边的页码
    range(siblingsStart, siblingsEnd).forEach((page) => {
      nodes.push(pageBtn(page));
    });

    // 结束的省略号
    if (siblingsEnd < pageCount - BOUNDARY_COUNT - 1) {
      nodes.push(
        <Button key="end-ellipsis" isIconButton shape="text">
          <Icon type="ellipsis" />
        </Button>,
      );
    } else if (pageCount - BOUNDARY_COUNT > BOUNDARY_COUNT) {
      nodes.push(pageBtn(pageCount - BOUNDARY_COUNT));
    }

    // 结束页码
    endPages.forEach((page) => {
      nodes.push(pageBtn(page));
    });

    // 「下一页」按钮
    if (hasNextButton) {
      nodes.push(nextBtn());
    }
  }

  if (hasPageSizeList) {
    nodes.push(
      <div key="page-size-select" className="rex-pagination-page-size-select">
        <span className="rex-pagination-page-size-select-label">每页显示</span>
        <Select.Single
          dataSource={pageSizeList.map(String)}
          value={String(pageSize)}
          onChange={(value: string) => onPageSizeChange(Number(value))}
          size={size}
          disabled={disabled}
          style={{ width: 80 }}
        />
      </div>,
    );
  }

  return (
    <PaginationDiv className={cx('rex-pagination', { 'rex-fill': fill }, className)} style={style}>
      {nodes}
    </PaginationDiv>
  );
}
