import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';

import AdressCountrySelect from './AddresCountrySelect';
import { AdressInput } from './AddresInput';

// import { Controller, Form } from "react-hook-form";
// import { CheckBox } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { Controller, RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';

import { addAddres } from '@/api/clientService';
import RulesValidation from '@/components/formComponents/rulesValidation';
import { AddresType } from '@/types/interfaces';

// type AddresType = {
//   adressID: string;
//   city: string;
//   country: string;
//   index: string;
//   street: string;
//     // useAsBilling: boolean;
//     // useAsShipping: boolean;
//     // useByDefaultBilling: boolean;
//     // useByDefaultShipping: boolean;
// }

type Props = {
  defaultAddres: AddresType;
  isNewAddres: boolean;
  version: number;
};

export function Addres({ defaultAddres, isNewAddres, version }: Props): JSX.Element {
  const {
    control,
    formState: { errors },
    handleSubmit,
    // setValue,
    watch,
  } = useForm<AddresType>({ mode: 'onChange', defaultValues: defaultAddres });

  const queryClient = useQueryClient();
  const country = watch('country');

  const [indexRules, setIndexRules] = useState(RulesValidation.postCodeRU);

  useEffect(() => {
    const newRulesValidation: RegisterOptions = RulesValidation[`postCode${country}`];
    setIndexRules(newRulesValidation);
  }, [country]);

  const [isAdressDisabled, SetIsAdressDisabled] = useState(!isNewAddres);

  const onSubmit: SubmitHandler<AddresType> = async (data: AddresType): Promise<void> => {
    const addres = {
      country: data.country,
      city: data.city,
      postalCode: data.index,
      streetName: data.street,
    };
    await queryClient.invalidateQueries({ queryKey: ['me'] });

    if (isNewAddres) {
      // setLoading(true);
      addAddres({
        actions: [
          {
            action: 'addAddress',
            address: addres,
          },
        ],
        version: version,
      })
        // createCustomer(registrationFormDataAdapter(data))
        .then(() => {
          console.log('отправлено'); //return loginUser({ email: data.email, password: data.password });
        })
        // .then(({ body }: ClientResponse<CustomerSignInResult>) => {
        //   setLoading(false);
        //   resultOfSubmit(
        //     { hasError: false, message: 'You have successfully registered' },
        //     body.customer.id,
        //   );
        //   const root = passwordFlowAuth({ email: data.email, password: data.password });
        //   return getProject(root);
        // })
        .catch((error: Error) => {
          // setLoading(false);
          // const message = String(error.message) ?? '';
          // resultOfSubmit({ hasError: true, message: message });
          console.log(error);
        });
    } else {
      addAddres({
        actions: [
          {
            action: 'changeAddress',
            address: addres,
            addressId: defaultAddres.adressID,
          },
        ],
        version: version,
      })
        .then(() => {
          console.log('изменено');
        })
        .catch((error: Error) => {
          // setLoading(false);
          // const message = String(error.message) ?? '';
          // resultOfSubmit({ hasError: true, message: message });
          console.log(error);
        });
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      sx={{ mt: 1 }}
    >
      <Box component="fieldset" sx={{ border: '1px solid black' }}>
        <legend>Address</legend>
        <AdressCountrySelect
          control={control}
          errors={errors}
          id="country"
          isDisabled={isAdressDisabled}
          label="Country"
          name="country"
          rules={RulesValidation.required}
        />
        <AdressInput
          control={control}
          errors={errors}
          isDisabled={isAdressDisabled}
          label="City"
          name="city"
          rules={RulesValidation.onlyLetters}
          type="text"
        />
        <AdressInput
          control={control}
          errors={errors}
          isDisabled={isAdressDisabled}
          label="Street"
          name="street"
          rules={RulesValidation.lettersNumbersAndSpecialCharacter}
          type="text"
        />
        <AdressInput
          control={control}
          errors={errors}
          isDisabled={isAdressDisabled}
          label="Index"
          name="index"
          rules={indexRules}
          type="text"
        />
        <Controller
          control={control}
          name="useByDefaultShipping"
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} color="primary" />}
              label="Use as default address"
            />
          )}
        />
        {isAdressDisabled ? (
          <Button
            onClick={() => {
              SetIsAdressDisabled(false);
            }}
            type="button"
          >
            Edit
          </Button>
        ) : (
          <Button type="submit"> submit </Button>
        )}
        {/* <Button type='submit'>
      submit
    </Button> */}
        {/* <Controller
      control={control}
      name="useShippingAsBilling"
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} color="primary" />} // onChange={onChange}
          label="Use as billing address"
        />
      )}
    /> */}
      </Box>
    </Box>
  );
}
