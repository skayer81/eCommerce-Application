import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import ModalMessage from '@/components/modalMessage/modalMessage';
import { useUserStore } from '@/stores/userStore';

import FormOfRegistration from './registrationForm/RegistrationForm';

export default function RegistrationPage(): JSX.Element {
  const DELAY_CLOSE_MESSAGES = 2000;
  const [hasRegFormError, setHasRegFormError] = useState(false);

  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const [message, setMessage] = useState('');
  const { loginUserInStore } = useUserStore();

  const resultOfSubmit = (result: { hasError: boolean; message: string }, id?: string): void => {
    setHasRegFormError(result.hasError);
    setMessage(result.message);
    handleOpen();
    if (!result.hasError) {
      setTimeout(() => {
        if (typeof id === 'string') {
          loginUserInStore(id);
        }

        handleClose();
        navigation('/');
      }, DELAY_CLOSE_MESSAGES);
    }
  };

  return (
    <Container sx={{ height: '100vh' }}>
      <FormOfRegistration resultOfSubmit={resultOfSubmit} />
      <ModalMessage
        handleClose={handleClose}
        hasError={hasRegFormError}
        message={message}
        open={open}
      />
    </Container>
  );
}
