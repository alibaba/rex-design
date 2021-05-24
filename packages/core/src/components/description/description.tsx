import React from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { DescriptionItemType } from './types';
import { useDescription, UseDescriptionProps } from './use-description';

const Wrapper = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
`;

const CellWrapper = styled.td`
  vertical-align: top;
`;

export interface DescriptionProps extends UseDescriptionProps {}

export function Description(props: DescriptionProps) {
  const { rows, labelWidth } = useDescription(props);

  return (
    <Wrapper>
      <tbody>
        {rows.map((cols, rowIndex) => (
          <tr key={rowIndex}>
            {cols.map((col, colIndex) => (
              <Cell key={colIndex} width={labelWidth} {...col} />
            ))}
          </tr>
        ))}
      </tbody>
    </Wrapper>
  );
}

interface CellProps extends DescriptionItemType {
  width?: string;
  color?: string;
}

function Cell(props: CellProps) {
  // TODO: labelPosition
  const { span = 1, label, content, renderContent, width, color } = props;
  return (
    <CellWrapper colSpan={span}>
      <Box display="flex" alignItems="flex-start" py="s">
        <Box color="text.note" fontSize="body" mr="m" width={width}>
          {label}
        </Box>
        <Box flex="1" fontSize="body" color={color}>
          {renderContent ? renderContent(props) : content}
        </Box>
      </Box>
    </CellWrapper>
  );
}
