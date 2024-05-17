import { RegistrationForm } from '@/types/interfaces';

export const defaultValues: RegistrationForm = {
  billingAdress: '',
  billingCity: '',
  billingCountry: 'RU',
  billingIndex: '',
  dateOfBirth: '',
  email: '',
  login: '',
  name: '',
  password: '',
  shippingAdress: '',
  shippingCity: '',
  shippingCountry: 'RU',
  shippingIndex: '',
  surname: '',
  useByDefaultBilling: false,
  useByDefaultShipping: false,
  useShippingAsBilling: false,
};
