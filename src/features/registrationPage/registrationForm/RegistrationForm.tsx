import { useEffect, useState } from 'react';
import { Controller, RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';

import { FormControlLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

import { createCustomer, loginUser, passwordFlowAuth } from '@/api/clientService';
import ButtonToAnotherPage from '@/components/formComponents/ButtonToAnotherPage';
import { FormInputText } from '@/components/formComponents/FormInputText';
import FormSelect from '@/components/formComponents/FormSelect';
import RulesValidation from '@/components/formComponents/rulesValidation';
import { RegistrationForm } from '@/types/interfaces';

import registrationFormDataAdapter from './RegistrationFormDataAdapter';
import { defaultValues } from './defaultValues';

type Props = {
  resultOfSubmit: (result: { hasError: boolean; message: string }) => void;
};

export default function FormOfRegistration({ resultOfSubmit }: Props): JSX.Element {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<RegistrationForm>({ mode: 'onChange', defaultValues: defaultValues });

  const checkboxUseAsBilling = watch('useShippingAsBilling');
  const shippingCountry = watch('shippingCountry');
  const billingCountry = watch('billingCountry');
  const shippingAdress = watch('shippingAdress');
  const shippingIndex = watch('shippingIndex');
  const shippingCity = watch('shippingCity');

  const [shippingIndexRules, setShippingIndexRules] = useState(RulesValidation.postCodeRU);

  useEffect(() => {
    const newRulesValidation: RegisterOptions = RulesValidation[`postCode${shippingCountry}`];
    setShippingIndexRules(newRulesValidation);
  }, [shippingCountry]);

  const [billingIndexRules, setBillingIndexRules] = useState(RulesValidation.postCodeRU);

  useEffect(() => {
    const newRulesValidation: RegisterOptions = RulesValidation[`postCode${billingCountry}`];
    setBillingIndexRules(newRulesValidation);
  }, [billingCountry]);

  useEffect(() => {
    if (checkboxUseAsBilling) {
      setValue('billingCountry', shippingCountry);
      setValue('billingAdress', shippingAdress);
      setValue('billingIndex', shippingIndex);
      setValue('billingCity', shippingCity);
    }
  }, [
    checkboxUseAsBilling,
    setValue,
    shippingAdress,
    shippingIndex,
    shippingCity,
    shippingCountry,
  ]);

  const onSubmit: SubmitHandler<RegistrationForm> = (data: RegistrationForm): void => {
    createCustomer(registrationFormDataAdapter(data))
      .then(() => {
        loginUser({ email: data.email, password: data.password })
          .then(() => {
            resultOfSubmit({ hasError: false, message: 'you have successfully registered' });
            passwordFlowAuth({ email: data.email, password: data.password });
          })
          .catch(() => {});
      })
      .catch((error: Error) => {
        let message = String(error.message);
        if (!message) {
          message = '';
        }
        resultOfSubmit({ hasError: true, message: message });
        console.log(error);
      });
    // console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 8,
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <ButtonToAnotherPage
          addressPage="/login"
          textOnButton="Sign in"
          title="Already have an account?"
        />
        <Box
          component="form"
          noValidate
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          sx={{ mt: 1 }}
        >
          <FormInputText
            control={control}
            errors={errors}
            label="Login"
            name="login"
            rules={RulesValidation.onlyLetters}
            type="text"
          />
          <FormInputText
            control={control}
            errors={errors}
            label="Password"
            name="password"
            rules={RulesValidation.password}
            type="password"
          />
          <FormInputText
            control={control}
            errors={errors}
            label="Name"
            name="name"
            rules={RulesValidation.onlyLetters}
            type="text"
          />
          <FormInputText
            control={control}
            errors={errors}
            label="Surname"
            name="surname"
            rules={RulesValidation.onlyLetters}
            type="text"
          />
          <FormInputText
            control={control}
            errors={errors}
            label="Email"
            name="email"
            rules={RulesValidation.mail}
            type="email"
          />

          <FormInputText
            control={control}
            errors={errors}
            label="Date of birth"
            name="dateOfBirth"
            rules={RulesValidation.dateOfbirth}
            type="date"
          />
          <Box component="fieldset" sx={{ border: '1px solid black' }}>
            <legend>Shipping address</legend>
            <FormSelect
              control={control}
              errors={errors}
              id="shippingCountry"
              label="Country"
              name="shippingCountry"
              rules={RulesValidation.required}
            />
            <FormInputText
              control={control}
              errors={errors}
              label="City"
              name="shippingCity"
              rules={RulesValidation.onlyLetters}
              type="text"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Street"
              name="shippingAdress"
              rules={RulesValidation.lettersNumbersAndSpecialCharacter}
              type="text"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Index"
              name="shippingIndex"
              rules={shippingIndexRules}
              type="text"
            />
            <Controller
              control={control}
              name="useByDefaultShipping"
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color="primary" />}
                  label="Use as default address"
                />
              )}
            />
            <Controller
              control={control}
              name="useShippingAsBilling"
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color="primary" />} // onChange={onChange}
                  label="Use as billing address"
                />
              )}
            />
          </Box>
          <Box component="fieldset" sx={{ border: '1px solid black' }}>
            <legend>Billing address</legend>
            <FormSelect
              control={control}
              errors={errors}
              id="billingCountry"
              label="Country"
              name="billingCountry"
              rules={RulesValidation.required}
            />
            <FormInputText
              control={control}
              errors={errors}
              label="City"
              name="billingCity"
              rules={RulesValidation.onlyLetters}
              type="text"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Street"
              name="billingAdress"
              rules={RulesValidation.lettersNumbersAndSpecialCharacter}
              type="text"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Index"
              name="billingIndex"
              rules={billingIndexRules}
              type="text"
            />
            <Controller
              control={control}
              name="useByDefaultBilling"
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color="primary" />}
                  label="Use as default address"
                />
              )}
            />
          </Box>
          <Button fullWidth sx={{ mb: 2, mt: 3 }} type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
