import { Grid, Stack } from '@mui/material';

import FilterForm from './FilterForm';
import SortForm from './SortForm';

function ControlPanel(): JSX.Element {
  return (
    <Grid item>
      <Stack direction="row" spacing={2}>
        <SortForm />
        <FilterForm />
      </Stack>
    </Grid>
  );
}

export default ControlPanel;
