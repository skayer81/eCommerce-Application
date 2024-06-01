import { Grid, Stack } from '@mui/material';

import FilterChips from './FilterChips';
import FilterForm from './FilterForm';
import SortForm from './SortForm';

function ControlPanel(): JSX.Element {
  return (
    <Grid item>
      <Stack direction="row" spacing={2}>
        <SortForm />
        <FilterForm />
        <FilterChips />
      </Stack>
    </Grid>
  );
}

export default ControlPanel;
