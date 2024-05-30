import { Grid, Stack } from '@mui/material';

import SortForm from './SortForm';

function ControlPanel(): JSX.Element {
  return (
    <Grid item>
      <Stack direction="row" spacing={2}>
        <SortForm />
      </Stack>
    </Grid>
  );
}

export default ControlPanel;
