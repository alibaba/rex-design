import { useCallback } from 'react';
import { useControllableState } from '../../hooks';
import { ButtonProps } from '../button';
import { SingleSelectProps } from '../select/single-select';

// https://dev.to/namirsab/comment/2050
const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export interface UsePaginationProps {
  /**
   * 分页器按钮尺寸
   */
  size?: ButtonProps['size'];
  /**
   * 外观类型
   */
  shape?: 'normal' | 'simple';
  /**
   * 头尾总是展示的按钮个数
   *
   * @example boundaryCount = 2
   * < 1 2 ... 3 4 5 ... 70 71 >
   *   ↑ ↑               ↑  ↑
   */
  boundaryCount?: number;
  /**
   * 当前页前后显示的按钮个数
   *
   * @example siblingCount = 1
   * < 1 2 ... 3 4 5 ... 70 71 >
   *           ↑ ↑ ↑
   * 4 是当前页码, 前后追加展示 1 个按钮
   */
  siblingCount?: number;
  /**
   * 总页数
   */
  pageCount?: number;
  /**
   * 受控的 page 页码值
   */
  activePage?: number;
  /**
   * 默认激活的页码
   */
  defaultActivePage?: number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否有下翻页按钮
   */
  hasNextButton?: boolean;
  /**
   * 是否有上翻页按钮
   */
  hasPrevButton?: boolean;
  /**
   * 每页数据的个数，需受控使用
   */
  pageSize?: number;
  /**
   * 没页个数选择的列表
   */
  pageSizeList?: SingleSelectProps['dataSource'];
  /**
   * 是否有页数选择列表
   */
  hasPageSizeList?: boolean;
  /**
   * 每页个数变化时的回调
   * @param nextPageSize 变化后的每页数据个数
   */
  onPageSizeChange?(nextPageSize: number): void;
  /**
   * 页码变化时的回调
   */
  onChange?: (nextValue: number) => void;
  /**
   * 文案
   */
  locale?: {
    previous: string;
    next: string;
  };
}

const defaultLocale = {
  previous: '上一页',
  next: '下一页',
};

export function usePagination(props: UsePaginationProps) {
  const {
    size = 'medium',
    shape = 'normal',
    activePage: activePageProp,
    defaultActivePage = 1,
    onChange: onChangeProp,
    boundaryCount = 1,
    siblingCount = 1,
    pageCount = 1,
    disabled,
    hasNextButton = true,
    hasPrevButton = true,
    hasPageSizeList = false,
    pageSize = 20,
    pageSizeList = ['10', '20', '40'],
    onPageSizeChange,
    locale = defaultLocale,
    ...htmlProps
  } = props;

  const [page, setPage] = useControllableState<number>({
    value: activePageProp,
    defaultValue: defaultActivePage,
    onChange: onChangeProp,
  });

  let itemList;

  if (shape === 'simple') {
    itemList = [...(hasPrevButton ? [locale.previous] : []), 'pageIndex', ...(hasNextButton ? [locale.next] : [])];
  } else {
    const startPages = range(1, Math.min(boundaryCount, pageCount));
    const endPages = range(Math.max(pageCount - boundaryCount + 1, boundaryCount + 1), pageCount);

    const siblingsStart = Math.max(
      Math.min(page - siblingCount, pageCount - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : pageCount - 1,
    );

    itemList = [
      ...(hasPrevButton ? [locale.previous] : []),
      ...startPages,

      // Start ellipsis
      ...(siblingsStart > boundaryCount + 2
        ? ['ellipsis']
        : boundaryCount + 1 < pageCount - boundaryCount
        ? [boundaryCount + 1]
        : []),

      // Sibling pages
      ...range(siblingsStart, siblingsEnd),

      // End ellipsis
      ...(siblingsEnd < pageCount - boundaryCount - 1
        ? ['ellipsis']
        : pageCount - boundaryCount > boundaryCount
        ? [pageCount - boundaryCount]
        : []),

      ...endPages,
      ...(hasNextButton ? [locale.next] : []),
      ...(hasPageSizeList ? ['pageSizeSelect'] : []),
    ];
  }

  const getNextPage = useCallback(
    (type: string) => {
      switch (type) {
        case locale.previous:
          return page - 1;
        case locale.next:
          return page + 1;
        default:
          return null;
      }
    },
    [page, locale],
  );

  // 转换为 PaginationItem 的属性对象
  const paginationItems = itemList.map((item) => {
    if (item === 'pageSizeSelect') {
      return {
        variant: 'pageSizeSelect',
        label: '每页显示',
        value: pageSize,
        dataSource: pageSizeList,
        onChange: onPageSizeChange,
        size,
        disabled,
      };
    }

    // 是一个省略号
    if (item === 'ellipsis') {
      return { variant: 'ellipsis' as any, label: '...' };
    }

    if (item === 'pageIndex') {
      return {
        variant: 'ellipsis',
        label: `${page}/${pageCount}页`,
      };
    }

    // 是一个页码按钮
    if (typeof item === 'number') {
      return {
        onClick: () => {
          setPage(item);
        },
        disabled,
        variant: 'page' as any,
        isSelected: item === page,
        label: item,
        size,
      };
    }

    // 是一个控制按钮
    return {
      onClick: () => {
        setPage(getNextPage(item));
      },
      variant: 'controller' as any,
      label: item,
      isSelected: false,
      disabled: disabled || (item === locale.previous && page <= 1) || (item === locale.next && page >= pageCount),
      size,
    };
  });

  return {
    items: paginationItems,
    htmlProps,
  };
}
