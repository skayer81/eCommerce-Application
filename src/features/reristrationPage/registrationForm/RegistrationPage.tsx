import { RegisterOptions, useForm } from 'react-hook-form';

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
import { RegistrationForm } from '@/types/interfaces';

export default function FormOfRegistration(): JSX.Element {
  const {
    control,
    formState: { errors },
  } = useForm<RegistrationForm>({ mode: 'onChange' });

  const rules: RegisterOptions = {
    required: 'Обязательное поле',
  };
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
            Регистрация
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <FormInputText
              control={control}
              errors={errors}
              label="Логин"
              name="login"
              rules={rules}
              type="text"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Пароль"
              name="password"
              rules={rules}
              type="password"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Имя"
              name="name"
              rules={rules}
              type="text"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Фамилия"
              name="surname"
              rules={rules}
              type="text"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Электронная почта"
              name="email"
              rules={rules}
              type="email"
            />

            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue="2000-01-01"
              id="date"
              label="Дата Рождения"
              name=""
              type="date"
            />
            <Box component="fieldset" sx={{ border: '1px solid black' }}>
              <legend>Адрес доставки </legend>
              <FormInputText
                control={control}
                errors={errors}
                label="Страна"
                name="shippingCountry"
                rules={rules}
                type="text"
              />
              <FormInputText
                control={control}
                errors={errors}
                label="Город"
                name="shippingCity"
                rules={rules}
                type="text"
              />
              <FormInputText
                control={control}
                errors={errors}
                label="Улица"
                name="shippingAdress"
                rules={rules}
                type="text"
              />
              <FormInputText
                control={control}
                errors={errors}
                label="Индекс"
                name="shippingIndex"
                rules={rules}
                type="text"
              />

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Использовать как адрес по умолчанию"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Использовать как адрес выставления счета"
              />
            </Box>
            <Box component="fieldset" sx={{ border: '1px solid black' }}>
              <legend>Aдрес выставления счета </legend>
              <FormInputText
                control={control}
                errors={errors}
                label="Страна"
                name="billingCountry"
                rules={rules}
                type="text"
              />
              <FormInputText
                control={control}
                errors={errors}
                label="Город"
                name="billingCity"
                rules={rules}
                type="text"
              />
              <FormInputText
                control={control}
                errors={errors}
                label="Улица"
                name="billingAdress"
                rules={rules}
                type="text"
              />
              <FormInputText
                control={control}
                errors={errors}
                label="Индекс"
                name="billingIndex"
                rules={rules}
                type="text"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Использовать как адрес по умолчанию"
              />
            </Box>
            <Button fullWidth sx={{ mb: 2, mt: 3 }} type="submit" variant="contained">
              Зарегистрироваться
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
