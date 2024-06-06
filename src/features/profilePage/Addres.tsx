import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';

import AdressCountrySelect from './AddresCountrySelect';
import { AdressInput } from './AddresInput';

// import { Controller, Form } from "react-hook-form";
// import { CheckBox } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { Controller, RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';

import { addOrChangeAddres } from '@/api/clientService';
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

type OutputAddres = {
  city: string;
  country: string;
  postalCode: string;
  streetName: string;
};

type AddnewAddresAction = {
  action: 'addAddress' | 'changeAddress';
  address: OutputAddres;
  addressId: string;
};

type SetDefaultAddressAction = {
  action: 'setDefaultBillingAddress' | 'setDefaultShippingAddress';
  addressId: string;
};

type Actions = Array<AddnewAddresAction | SetDefaultAddressAction>;

export function Addres({ defaultAddres, isNewAddres, version }: Props): JSX.Element {
  const {
    control,
    formState: { errors },
    handleSubmit,
    // setValue,
    watch,
  } = useForm<AddresType>({ mode: 'onChange', defaultValues: defaultAddres });

  const deleteAddres = (): void => {
    //   await queryClient.invalidateQueries({ queryKey: ['me'] });
    addOrChangeAddres({
      actions: [
        {
          action: 'removeAddress',
          addressId: defaultAddres.adressID,
        },
      ],
      version: version,
    })
      .then(async (response) => {
        await queryClient.invalidateQueries({ queryKey: ['me'] });
        console.log('ответ', response);
        //TODO получить id
        console.log('отправлено');
      })
      .catch((error: Error) => {
        // setLoading(false);
        // const message = String(error.message) ?? '';
        // resultOfSubmit({ hasError: true, message: message });
        console.log(error);
      });
  };

  const queryClient = useQueryClient();
  const country = watch('country');

  const [indexRules, setIndexRules] = useState(RulesValidation.postCodeRU);

  useEffect(() => {
    const newRulesValidation: RegisterOptions = RulesValidation[`postCode${country}`];
    setIndexRules(newRulesValidation);
  }, [country]);

  const [isAdressDisabled, SetIsAdressDisabled] = useState(!isNewAddres);

  const onSubmit: SubmitHandler<AddresType> = async (data: AddresType): Promise<void> => {
    const addres: OutputAddres = {
      country: data.country,
      city: data.city,
      postalCode: data.index,
      streetName: data.street,
    };

    const action: AddnewAddresAction = {
      address: addres,
      addressId: isNewAddres ? '' : defaultAddres.adressID,
      action: isNewAddres ? 'addAddress' : 'changeAddress',
    };

    // isNewAddres ? action.action = 'addAddress' : action.action = 'changeAddress';

    const actions: Actions = [action];
    // if (data.useByDefaultBilling) {
    //   actions.push({
    //     action:"setDefaultBillingAddress",
    //     addressId: defaultAddres.adressID
    //   })
    // }
    // if (data.useByDefaultShipping) {
    //   actions.push({
    //     action:"setDefaultShippingAddress",
    //     addressId: defaultAddres.adressID
    //   })
    // }
    // console.log('actions',actions)
    await queryClient.invalidateQueries({ queryKey: ['me'] });
    // console.log('новая версия')
    if (isNewAddres) {
      // setLoading(true);
      addOrChangeAddres({
        actions: actions,
        version: version,
      })
        .then((response) => {
          console.log('ответ', response);
          //TODO получить id
          console.log('отправлено');
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
      if (data.useByDefaultBilling) {
        actions.push({
          action: 'setDefaultBillingAddress',
          addressId: defaultAddres.adressID,
        });
      }
      if (data.useByDefaultShipping) {
        actions.push({
          action: 'setDefaultShippingAddress',
          addressId: defaultAddres.adressID,
        });
      }

      addOrChangeAddres({
        actions: actions,
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
          //defaultValue={defaultAddres.useByDefaultShipping}
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  defaultChecked={value}
                  disabled={isAdressDisabled}
                  onChange={onChange}
                  value={value}
                />
              }
              label="Use as default shipping address"
            />
          )}
        />
        <Controller
          control={control}
          name="useByDefaultBilling"
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  defaultChecked={value}
                  disabled={isAdressDisabled}
                  onChange={onChange}
                  value={value}
                />
              }
              label="Use as default billing address"
              value={defaultAddres.useByDefaultBilling}
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
          <Button type="submit"> Submit </Button>
        )}

        <Button
          onClick={() => {
            deleteAddres();
          }}
          type="button"
        >
          {' '}
          Delete{' '}
        </Button>
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
