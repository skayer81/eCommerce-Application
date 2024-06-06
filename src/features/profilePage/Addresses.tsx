import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack } from '@mui/material';

import { Customer } from '@/features/profilePage/Types';
import { AddresType } from '@/types/interfaces';

import { Addres } from './Addres';

function Addresses({ ...props }): JSX.Element {
  const emptyAddres: AddresType = {
    city: '',
    country: '',
    index: '',
    street: '',
    useByDefaultBilling: false,
    useByDefaultShipping: false,
    adressID: '',
  };

  const customer: Customer = props;
  console.log('props', props);

  const addresses = customer.addresses;
  console.log('addresses', addresses);

  const [isAddresAdd, setIsAddresAdd] = useState(false);

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
      </Stack>
    </Box>
  );
}

export default Addresses;
