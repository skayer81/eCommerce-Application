import { Pagination, Stack } from '@mui/material';

import { PRODUCTS_LIMIT } from '@/utils/constants';
// import { useState } from 'react';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  total: number;
}
export default function CatalogPagination({ total, page, setPage }: PaginationProps): JSX.Element {
  // const setPage = useCatalogStore((state) => state.setPage);

  // const { setPage } = useCatalogStore((state) => ({
  //   setPage: state.setPage,
  // }));

  const paginationCount = Math.ceil(total / PRODUCTS_LIMIT);
  console.log('paginationcount=', paginationCount);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number): void => {
    console.log('page=', value);
    setPage(value);
  };

  return (
    <Stack spacing={2} sx={{ mt: '20px' }}>
      <Pagination
        color="primary"
        count={paginationCount}
        onChange={handleChange}
        page={page}
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </Stack>
  );
}
