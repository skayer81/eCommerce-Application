import type { JSX } from 'react';

import { Container, Typography } from '@mui/material';

export default function Main(): JSX.Element {
  return (
    <Container sx={{ bgcolor: '#cfe5ff', height: '100vh' }}>
      <Typography>Menu</Typography>
    </Container>
  );
}
