import type { JSX } from 'react';

import { Container, Typography } from '@mui/material';

export default function MainPage(): JSX.Element {
  return (
    <Container sx={{ height: '100vh' }}>
      <Typography>Main</Typography>
    </Container>
  );
}
