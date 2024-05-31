import { useRef } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';

import { useCatalogStore } from '@/stores/catalogStore';

function Search(): JSX.Element {
  const { setSearchValue } = useCatalogStore((state) => ({
    setSearchValue: state.setSearchValue,
  }));

  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (): void => {
    const searchValue = searchRef.current ? searchRef.current.value : '';
    console.log('Поиск:', searchValue);
    setSearchValue(searchValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Grid item xs={12}>
      <Grid item xs={4}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          inputRef={searchRef}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          size="small"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}

export default Search;
