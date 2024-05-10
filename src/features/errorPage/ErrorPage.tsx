import type { JSX } from 'react';

import { Container, Typography } from '@mui/material';

export default function ErrorPage(): JSX.Element {
  return (
    <Container sx={{ height: '100vh' }}>
      <Typography>Error</Typography>
    </Container>
  );
}
