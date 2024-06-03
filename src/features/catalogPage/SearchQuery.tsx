import { Typography } from '@mui/material';

import { useCatalogStore } from '@/stores/catalogStore';

function SearchQuery(): JSX.Element {
  const { searchValue } = useCatalogStore((state) => ({
    searchValue: state.searchValue,
  }));

  return (
    <Typography component="p" sx={{ height: '1.5rem' }}>
      {searchValue ? `You are searching for "${searchValue}"` : ' '}
    </Typography>
  );
}

export default SearchQuery;
