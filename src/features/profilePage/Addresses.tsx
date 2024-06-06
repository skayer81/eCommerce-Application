import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  // Typography,
} from '@mui/material';

import { Customer } from '@/features/profilePage/Types';
import { AddresType } from '@/types/interfaces';

import { Addres } from './Addres';

//import { version } from 'react';

// const country = {
//   RU: 'Russia',
//   JP: 'Japan',
//   SE: 'Sweden',
// };

function Addresses({ ...props }): JSX.Element {
  const emptyAddres: AddresType = {
    city: '',
    country: '',
    index: '',
    street: '',
    // useAsBilling: true,
    // useAsShipping: true,
    useByDefaultBilling: false,
    useByDefaultShipping: false,
    adressID: '',
  };

  //   const defaultBillingAddressId =
  // :
  // "cjFVYHi8"
  // defaultShippingAddressId
  // :
  // "cjFVYHi8"

  const customer: Customer = props;
  console.log('props', props);

  const addresses = customer.addresses;
  console.log('addresses', addresses);

  const [isAddresAdd, setIsAddresAdd] = useState(false);
  // const billingAddressIds = customer.billingAddressIds;
  // const filteredBillingAddresses = addresses!.filter((address) =>
  //   billingAddressIds!.includes(address.id as string),
  // );
  // const shippingAddressIds = customer.shippingAddressIds;
  // const filteredShippingAddresses = addresses!.filter((address) =>
  //   shippingAddressIds!.includes(address.id as string),
  // );
  // const filteredAnyAddresses = addresses!.filter(
  //   (address) =>
  //     !billingAddressIds!.includes(address.id as string) &&
  //     !shippingAddressIds!.includes(address.id as string),
  // );
  // const defaultBillingAddres = customer.defaultBillingAddressId as string;
  // const defaultShippingAddres = customer.defaultShippingAddressId;

  return (
    <Box component="section">
      <Stack
        maxWidth={350}
        spacing={2}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {addresses?.map((addres, index) => {
          const defaultAddres = {
            city: addres.city ?? '',
            country: addres.country ?? '',
            index: addres.postalCode ?? '',
            street: addres.streetName ?? '',
            // useAsBilling: true,
            // useAsShipping: true,
            useByDefaultBilling: customer.defaultBillingAddressId === addres.id ? true : false,
            useByDefaultShipping: customer.defaultShippingAddressId === addres.id ? true : false,
            adressID: addres.id ?? '',
          };
          return (
            <Accordion key={index} sx={{ width: '100%' }}>
              <AccordionSummary
                aria-controls="billing-addresses"
                expandIcon={<ExpandMoreIcon />}
                id="billing-addresses"
              >
                Addres {index}
              </AccordionSummary>
              <AccordionDetails>
                <Addres
                  defaultAddres={defaultAddres}
                  isNewAddres={false}
                  version={customer.version ?? 0}
                ></Addres>
              </AccordionDetails>
            </Accordion>
          );
        })}
        {isAddresAdd ? (
          <Addres
            defaultAddres={emptyAddres}
            isNewAddres={true}
            //key={index}
            version={customer.version ?? 0}
          ></Addres>
        ) : (
          ''
        )}
        {isAddresAdd ? (
          <Button
            onClick={() => {
              setIsAddresAdd(false);
            }}
          >
            Cancel
          </Button>
        ) : (
          <Button
            onClick={() => {
              setIsAddresAdd(true);
            }}
          >
            Add addres
          </Button>
        )}

        {/* <Accordion sx={{ width: '100%' }}>
          <AccordionSummary
            aria-controls="billing-addresses"
            expandIcon={<ExpandMoreIcon />}
            id="billing-addresses"
          >
            Billing addresses
          </AccordionSummary>
          <AccordionDetails>
            {filteredBillingAddresses.map((el) => {
              const currentCountry = el.country as keyof typeof country;

              return (
                <Box
                  component="li"
                  key={el.id}
                  sx={{ mb: 1, border: '1px solid gray', borderRadius: 1, padding: 2 }}
                >
                  {el.id === defaultBillingAddres ? (
                    <Typography
                      sx={{
                        background: '#e6f5fe',
                        color: '#067cc6',
                        width: 'max-content',
                        fontSize: '12px',
                      }}
                    >
                      Default billing
                    </Typography>
                  ) : (
                    ''
                  )}
                  <Typography>Country: {country[currentCountry]}</Typography>
                  <Typography>City: {el.city}</Typography>
                  <Typography>Street: {el.streetName}</Typography>
                  <Typography>
                    State: {el.region !== '' ? el.region : 'You have not state'}
                  </Typography>
                  <Typography>Postal code: {el.postalCode}</Typography>
                  <Typography sx={{ mt: 1 }}>Edit mode</Typography>
                </Box>
              );
            })}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ width: '100%' }}>
          <AccordionSummary
            aria-controls="shipping-addresses"
            expandIcon={<ExpandMoreIcon />}
            id="shipping-addresses"
          >
            Shipping addresses
          </AccordionSummary>
          <AccordionDetails>
            {filteredShippingAddresses.map((el) => {
              const currentCountry = el.country as keyof typeof country;
              return (
                <Box
                  component="li"
                  key={el.id}
                  sx={{ mb: 1, border: '1px solid gray', borderRadius: 1, padding: 2 }}
                >
                  {el.id === defaultShippingAddres ? (
                    <Typography
                      sx={{
                        background: '#e6f5fe',
                        color: '#067cc6',
                        width: 'max-content',
                        fontSize: '12px',
                      }}
                    >
                      Default shipping
                    </Typography>
                  ) : (
                    ''
                  )}
                  <Typography>Country: {country[currentCountry]}</Typography>
                  <Typography>City: {el.city}</Typography>
                  <Typography>Street: {el.streetName}</Typography>
                  <Typography>
                    State: {el.region !== '' ? el.region : 'You have not state'}
                  </Typography>
                  <Typography>Postal code: {el.postalCode}</Typography>
                </Box>
              );
            })}
          </AccordionDetails>
        </Accordion> */}

        {/* {filteredAnyAddresses.length > 0 ? (
          <Accordion sx={{ width: '100%' }}>
            <AccordionSummary
              aria-controls="billing-addresses"
              expandIcon={<ExpandMoreIcon />}
              id="billing-addresses"
            >
              Uncategory addresses
            </AccordionSummary>
            <AccordionDetails>
              {filteredAnyAddresses.map((el) => {
                const currentCountry = el.country as keyof typeof country;
                return (
                  <Box
                    component="li"
                    key={el.id}
                    sx={{ mb: 1, border: '1px solid gray', borderRadius: 1, padding: 2 }}
                  >
                    <Typography>Country: {country[currentCountry]}</Typography>
                    <Typography>City: {el.city}</Typography>
                    <Typography>Street: {el.streetName}</Typography>
                    <Typography>
                      State: {el.region !== '' ? el.region : 'You have not state'}
                    </Typography>
                    <Typography>Postal code: {el.postalCode}</Typography>
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
        ) : (
          ''
        )} */}
      </Stack>
    </Box>
  );
}

export default Addresses;
