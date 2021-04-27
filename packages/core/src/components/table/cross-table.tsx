import { CrossTable as ArtCrossTable, CrossTableProps } from 'ali-react-table/pivot';
import React from 'react';
import { BaseTable } from './base-table';

export { CrossTableProps };

export const CrossTable = (props: CrossTableProps) => {
  return <ArtCrossTable BaseTableComponent={BaseTable} {...props} />;
};
