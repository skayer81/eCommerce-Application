import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { useCustomerStore } from '@/features/profilePage/Types';

const country = {
  RU: 'Russia',
  JP: 'Japan',
  SE: 'Sweden',
};

function Addresses(): JSX.Element {
  const addresses = useCustomerStore().customer.addresses;
  const billingAddressIds = useCustomerStore().customer.billingAddressIds;
  const filteredBillingAddresses = addresses!.filter((address) =>
    billingAddressIds!.includes(address.id as string),
  );
  const shippingAddressIds = useCustomerStore().customer.shippingAddressIds;
  const filteredShippingAddresses = addresses!.filter((address) =>
    shippingAddressIds!.includes(address.id as string),
  );
  const filteredAnyAddresses = addresses!.filter(
    (address) =>
      !billingAddressIds!.includes(address.id as string) &&
      !shippingAddressIds!.includes(address.id as string),
  );
  const defaultBillingAddres = useCustomerStore().customer.defaultBillingAddressId as string;
  const defaultShippingAddres = useCustomerStore().customer.defaultShippingAddressId;

  return (
    <Container component="section">
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
        <Accordion sx={{ width: '100%' }}>
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
        </Accordion>

        {filteredAnyAddresses.length > 0 ? (
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
        )}
      </Stack>
    </Container>
  );
}

export default Addresses;
