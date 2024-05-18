import { RegistrationAdress, RegistrationForm, RegistrationRequestBody } from '@/types/interfaces';

function registrationFormDataAdapter(data: RegistrationForm): RegistrationRequestBody {
  const INDEX_BILLING_ADRESS = 0;
  const INDEX_SHIPPING_ADRESS = 1;
  const billingAddress: RegistrationAdress = {
    city: data.billingCity,
    country: data.billingCountry,
    postalCode: data.billingIndex,
    region: '',
    streetName: data.billingAdress,
  };

  const shippingAddress: RegistrationAdress = {
    city: data.shippingCity,
    country: data.shippingCountry,
    postalCode: data.shippingIndex,
    region: '',
    streetName: data.shippingAdress,
  };

  const result: RegistrationRequestBody = {
    addresses: [billingAddress, shippingAddress],
    billingAddresses: [INDEX_BILLING_ADRESS],
    dateOfBirth: data.dateOfBirth === null ? '' : data.dateOfBirth.format('YYYY-MM-DD'),
    email: data.email,
    firstName: data.name,
    lastName: data.surname,
    password: data.password,
    salutation: '',
    shippingAddresses: [INDEX_SHIPPING_ADRESS],
    title: '',
  };

  if (data.useByDefaultBilling) {
    result.defaultBillingAddress = INDEX_BILLING_ADRESS;
  }
  if (data.useByDefaultShipping) {
    result.defaultShippingAddress = INDEX_SHIPPING_ADRESS;
  }
  return result;
}

export default registrationFormDataAdapter;
