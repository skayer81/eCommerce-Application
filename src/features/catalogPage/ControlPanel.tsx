import { Grid, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import CategoriesControl from './CategoriesControl';
import FilterChips from './FilterChips';
import FilterForm from './FilterForm';
import SortForm from './SortForm';

function ControlPanel(): JSX.Element {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid item>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" spacing={2}>
          {isTablet && <CategoriesControl />}

          <SortForm />
          <FilterForm />
        </Stack>
        <FilterChips />
      </Stack>
    </Grid>
  );
}

export default ControlPanel;
