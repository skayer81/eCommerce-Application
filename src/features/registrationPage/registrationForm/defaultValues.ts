import { RegistrationForm } from '@/types/interfaces';

export const defaultValues: RegistrationForm = {
  billingAdress: '',
  billingCity: '',
  billingCountry: '',
  billingIndex: '',
  dateOfBirth: '01-01-2000',
  email: '',
  login: '',
  name: '',
  password: '',
  shippingAdress: '',
  shippingCity: '',
  shippingCountry: '',
  shippingIndex: '',
  surname: '',
  useByDefaultBilling: false,
  useByDefaultShipping: false,
  useShippingAsBilling: false,
};
