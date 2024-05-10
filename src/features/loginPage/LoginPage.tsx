import type { JSX } from 'react';

import { Container, Typography } from '@mui/material';

export default function LoginPage(): JSX.Element {
  return (
    <Container sx={{ height: '100vh' }}>
      <Typography>Login</Typography>
    </Container>
  );
}
