export interface RegistrationForm {
  billingAdress: string;
  billingCity: string;
  billingCountry: string;
  billingIndex: string;
  dateOfBirth: string;
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
