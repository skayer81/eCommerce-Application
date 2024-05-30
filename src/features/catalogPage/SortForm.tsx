import { useState } from 'react';

import SortIcon from '@mui/icons-material/Sort';
import { FormControlLabel, IconButton, Menu, MenuItem, Radio, RadioGroup } from '@mui/material';

import { useCatalogStore } from '@/stores/catalogStore';

function SortForm(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { setSortValue, sortValue } = useCatalogStore((state) => ({
    setSortValue: state.setSortValue,
    sortValue: state.sortValue,
  }));

  const sortOptions = new Map([
    ['', 'No Sorting'],
    ['name.en asc', 'By Name'],
    ['price asc', 'By Price (Ascending)'],
    ['price desc', 'By Price (Descending)'],
  ]);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSortValue(event.target.value);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="sort"
        onClick={handleClick}
        sx={{
          backgroundColor: sortValue ? 'lightgreen' : 'inherit',
          borderRadius: '10px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        <SortIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted onClose={handleClose} open={Boolean(anchorEl)}>
        <RadioGroup aria-label="sort" name="sort" onChange={handleChange} value={sortValue}>
          {Array.from(sortOptions.entries()).map(([value, label]) => (
            <MenuItem key={value} onClick={handleClose} sx={{ height: '30px' }}>
              <FormControlLabel control={<Radio />} label={label} value={value} />
            </MenuItem>
          ))}
        </RadioGroup>
      </Menu>
    </div>
  );
}

export default SortForm;
