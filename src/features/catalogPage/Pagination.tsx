import { Pagination, Stack } from '@mui/material';

import { PRODUCTS_LIMIT } from '@/utils/constants';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  total: number;
}
export default function CatalogPagination({ total, page, setPage }: PaginationProps): JSX.Element {
  const paginationCount = Math.ceil(total / PRODUCTS_LIMIT);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number): void => {
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
