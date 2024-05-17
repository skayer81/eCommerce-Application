import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import ModalMessage from '@/components/modalMessage/modalMessage';

import FormOfRegistration from './registrationForm/RegistrationForm';

export default function RegistrationPage(): JSX.Element {
  const DELAY_CLOSE_MESSAGES = 2000;
  const [hasRegFormError, setHasRegFormError] = useState(false);
  console.log('render hasRegFormError:', hasRegFormError);

  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
    console.log('hasRegFormError', hasRegFormError);
    if (!hasRegFormError) {
      navigation('/');
    }
  };
  const [message, setMessage] = useState('');

  const resultOfSubmit = (result: { hasError: boolean; message: string }): void => {
    //   setHasRegFormError(result.hasError)
    setHasRegFormError(result.hasError);
    setMessage(result.message);
    handleOpen();
    if (!result.hasError) {
      setTimeout(handleClose, DELAY_CLOSE_MESSAGES);
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

// class Parent extends React.Component {
//   state = { value: '' };

//   updateState = (newValue) => this.setState({ value: newValue });

//   render() {
//     return <Child onValueChange={this.updateState} />;
//   }
