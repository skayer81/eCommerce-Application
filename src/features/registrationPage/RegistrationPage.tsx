import type { JSX } from 'react';

import { Container } from '@mui/material';

import FormOfRegistration from './registrationForm/RegistrationForm';

export default function RegistrationPage(): JSX.Element {
  return (
    <Container sx={{ height: '100vh' }}>
      <FormOfRegistration />
    </Container>
  );
}
