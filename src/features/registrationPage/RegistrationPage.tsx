import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import ModalMessage from '@/components/modalMessage/modalMessage';

import FormOfRegistration from './registrationForm/RegistrationForm';

export default function RegistrationPage(): JSX.Element {
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
    navigation('/');
  };
  const [message, setMessage] = useState();

  const resultOfSubmit = (result: { error: boolean; message: string }): void => {
    console.log('result', result.error, result.message);
    setMessage(result.message);
    handleOpen();
  };

  return (
    <Container sx={{ height: '100vh' }}>
      <FormOfRegistration resultOfSubmit={resultOfSubmit} />
      <ModalMessage handleClose={handleClose} message={message} open={open} />
    </Container>
  );
}

// class Parent extends React.Component {
//   state = { value: '' };

//   updateState = (newValue) => this.setState({ value: newValue });

//   render() {
//     return <Child onValueChange={this.updateState} />;
//   }
