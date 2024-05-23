import { Dayjs } from 'dayjs';

export interface RegistrationForm {
  billingAdress: string;
  billingCity: string;
  billingCountry: string;
  billingIndex: string;
  dateOfBirth: Dayjs | null; //string;
  email: string;
  login: string;
  name: string;
  password: string;
  shippingAdress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingIndex: string;
  surname: string;
  useByDefaultBilling: boolean;
  useByDefaultShipping: boolean;
  useShippingAsBilling: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

export type RegistrationAdress = {
  city: string;
  country: string;
  postalCode: string;
  region?: string;
  streetName: string;
};

export type RegistrationRequestBody = {
  addresses: Array<RegistrationAdress>;
  billingAddresses: Array<number>;
  dateOfBirth: string;
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  salutation?: string;
  shippingAddresses?: Array<number>;
  title: string;
};
