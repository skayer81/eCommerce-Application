import type { JSX } from 'react';

import { Container, Typography } from '@mui/material';

export default function Login(): JSX.Element {
  return (
    <Container sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
      <Typography>Login</Typography>
    </Container>
  );
}
