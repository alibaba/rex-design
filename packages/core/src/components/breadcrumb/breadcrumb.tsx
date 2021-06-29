import React from 'react';
import styled from 'styled-components';
import { Box } from '../layout';

const BreadcrumbSeparator = (props: any) => (
  <Box as="span" color="text.note" {...props}>
    /
  </Box>
);

export interface BreadcurmbProps {
  /**
   * 分隔线
   */
  separator?: React.ReactNode;
  /**
   * 点击单个节点时的回调
   */
  onItemClick?: (key: string) => void;
  children?: React.ReactNode | React.ReactNode[];
}

const Wrapper = styled(Box)`
  font-size: var(--rex-fontSizes-body);
`;

const noop = () => {};

export const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcurmbProps>((props, ref) => {
  const { separator = <BreadcrumbSeparator />, onItemClick = noop, children, ...others } = props;
  const total = React.Children.count(children);

  return (
    <Wrapper ref={ref} {...others}>
      {React.Children.map(children, (child, idx) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            separator: idx + 1 < total ? separator : null,
            isLast: idx + 1 === total,
            onClick: () => onItemClick(child.key as string),
          });
        }
        return null;
      })}
    </Wrapper>
  );
});
