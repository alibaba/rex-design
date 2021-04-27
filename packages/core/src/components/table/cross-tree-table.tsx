import { CrossTreeTable as ArtCrossTreeTable, CrossTreeTableProps } from 'ali-react-table/pivot';
import React from 'react';
import { BaseTable } from './base-table';

export { CrossTreeTableProps };

export const CrossTreeTable = (props: CrossTreeTableProps) => {
  return <ArtCrossTreeTable BaseTableComponent={BaseTable} {...props} />;
};
