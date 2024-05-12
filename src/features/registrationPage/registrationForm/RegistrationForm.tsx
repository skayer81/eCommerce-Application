import { useForm } from 'react-hook-form';

import { FormControlLabel, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { FormInputText } from '@/components/formComponents/FormInputText';
import { RulesValidation } from '@/components/formComponents/rulesValidation';
import { RegistrationForm } from '@/types/interfaces';

export default function FormOfRegistration(): JSX.Element {
  const {
    control,
    formState: { errors },
  } = useForm<RegistrationForm>({ mode: 'onChange' });

  // const rules: RegisterOptions = {
  //   required: 'Обязательное поле',
  // };
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
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

            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue="2000-01-01"
              id="date"
              label="Date Of birth"
              name="date"
              type="date"
            />
            <Box component="fieldset" sx={{ border: '1px solid black' }}>
              <legend>Shipping address</legend>
              <FormInputText
                control={control}
                errors={errors}
                label="Сountry"
                name="shippingCountry"
                rules={RulesValidation.onlyLetters}
                type="text"
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
                rules={RulesValidation.onlyLetters}
                type="text"
              />

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Use as default address"
              />
              <FormControlLabel control={<Checkbox />} label="Use as billing address" />
            </Box>
            <Box component="fieldset" sx={{ border: '1px solid black' }}>
              <legend>Billing address</legend>
              <FormInputText
                control={control}
                errors={errors}
                label="Country"
                name="billingCountry"
                rules={RulesValidation.onlyLetters}
                type="text"
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
                rules={RulesValidation.onlyLetters}
                type="text"
              />
              <FormControlLabel control={<Checkbox />} label="Use as default address" />
            </Box>
            <Button fullWidth sx={{ mb: 2, mt: 3 }} type="submit" variant="contained">
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
