import React, { useState } from 'react';
import { Pagination, DemoGroup } from '@rexd/core';

export default { title: 'Pagination' };

export function Basic() {
  return <Pagination pageCount={10} onChange={console.log} />;
}

export function Light() {
  return <Pagination shape="simple" pageCount={10} onChange={console.log} />;
}

export function Controlled() {
  const [page, setPage] = useState(2);

  return <Pagination activePage={page} pageCount={10} onChange={(val) => setPage(val)} />;
}
