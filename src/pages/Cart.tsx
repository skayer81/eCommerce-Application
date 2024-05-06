import type { JSX } from 'react';

import { Container, Typography } from '@mui/material';

export default function Cart(): JSX.Element {
  return (
    <Container sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
      <Typography>Cart</Typography>
    </Container>
  );
}
