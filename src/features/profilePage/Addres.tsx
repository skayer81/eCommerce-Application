import { useEffect, useState } from 'react';
import { Controller, RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';

import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { addOrChangeAddres } from '@/api/clientService';
import RulesValidation from '@/components/formComponents/rulesValidation';
import { AddresType } from '@/types/interfaces';

import AdressCountrySelect from './AddresCountrySelect';
import { AdressInput } from './AddresInput';

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
    watch,
  } = useForm<AddresType>({ mode: 'onChange', defaultValues: defaultAddres });

  const deleteAddres = (): void => {
    addOrChangeAddres({
      actions: [
        {
          action: 'removeAddress',
          addressId: defaultAddres.adressID,
        },
      ],
      version: version,
    })
      .then(async () => {
        await queryClient.invalidateQueries({ queryKey: ['me'] });
      })
      .catch((error: Error) => {
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

  const [isAdressDisabled, setIsAdressDisabled] = useState(!isNewAddres);

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

    const actions: Actions = [action];
    await queryClient.invalidateQueries({ queryKey: ['me'] });
    if (isNewAddres) {
      addOrChangeAddres({
        actions: actions,
        version: version,
      })
        .then(() => {
          //TODO получить id
          setIsAdressDisabled(true);
        })
        .catch((error: Error) => {
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
          setIsAdressDisabled(true);
          console.log('изменено');
        })
        .catch((error: Error) => {
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
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  color="primary"
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
                  checked={value}
                  color="primary"
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
        {/* {isAdressDisabled ? (
          <Button
            onClick={() => {
              setIsAdressDisabled(false);
            }}
            type="button"
          >
            Edit
          </Button>
        ) : (
          <Button type="submit"> Submit </Button>
        )} */}
        <Button
          disabled={!isAdressDisabled}
          onClick={() => {
            setIsAdressDisabled(false);
          }}
          type="button"
        >
          Edit
        </Button>

        <Button disabled={isAdressDisabled} type="submit">
          {' '}
          Submit{' '}
        </Button>

        <Button
          onClick={() => {
            deleteAddres();
          }}
          type="button"
        >
          {' '}
          Delete{' '}
        </Button>
      </Box>
    </Box>
  );
}
