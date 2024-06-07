import { describe, expect, it } from 'vitest';

import { RegistrationForm } from '@/types/interfaces';

import registrationFormDataAdapter from './RegistrationFormDataAdapter';

const testValues: RegistrationForm = {
  billingAdress: 'billingAdress',
  billingCity: 'billingCity',
  billingCountry: 'RU',
  billingIndex: 'billingIndex',
  dateOfBirth: null,
  email: 'email',
  login: 'login',
  name: 'testName',
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

describe('registrationFormDataAdapter', () => {
  it('should return name', () => {
    const firstName = registrationFormDataAdapter(testValues).firstName;
    expect(firstName).toBe('testName');
  });
});
