import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Cart, ClientResponse, MyCartUpdate } from '@commercetools/platform-sdk';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import {
  Alert,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useBasketStore } from '@/stores/basketStore';

import { changeNumberItemInBasket } from '../../api/clientService';

export interface PromoForm {
  promo: string;
}

export interface PromoProps {
  basketId: string;
  basketVersion: number;
  discountCodes: string[];
}

export default function PromocodeForm({
  basketId,
  basketVersion,
  discountCodes,
}: PromoProps): JSX.Element {
  const queryClient = useQueryClient();
  const { updateCurrentVersion } = useBasketStore((state) => ({
    updateCurrentVersion: state.updateCurrentVersion,
  }));

  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PromoForm>({
    defaultValues: {
      promo: '',
    },
  });

  const { mutate } = useMutation<ClientResponse, HttpErrorType, MyCartUpdate>({
    mutationFn: (itemBody) => changeNumberItemInBasket(itemBody, basketId),
    onSuccess: async ({ body }: ClientResponse<Cart>) => {
      updateCurrentVersion(body.version);
      await queryClient.invalidateQueries({ queryKey: ['basketList'] });
    },
    onError: (error: HttpErrorType) => {
      if (error.code === 400) {
        setErrorMessage('There is no such promocode');
      } else {
        setErrorMessage(error.message);
      }
    },
  });

  const submit: SubmitHandler<PromoForm> = (data: PromoForm): void => {
    console.log('formdata=', data);
    const promoBody: MyCartUpdate = {
      version: basketVersion,
      actions: [{ action: 'addDiscountCode', code: data.promo }],
    };

    mutate(promoBody);
    reset();
  };

  return (
    <Stack>
      <Box
        component="form"
        onChange={() => setErrorMessage('')}
        onSubmit={(event) => void handleSubmit(submit)(event)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h6">
          Promocode
        </Typography>
        <Controller
          control={control}
          name="promo"
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.promo}
              fullWidth
              helperText={errors.promo ? 'Required field' : ''}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          )}
          rules={{ required: true }}
        />
        {errorMessage && (
          <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ mb: '10px' }}>
            {errorMessage}
          </Alert>
        )}
        <Button color="primary" type="submit" variant="contained">
          Apply
        </Button>
      </Box>
      {discountCodes && discountCodes.length > 0 && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="h6">Promocodes applied:</Typography>
          <List sx={{ mt: 1 }}>
            {discountCodes.map((code) => (
              <ListItem key={code}>
                <ListItemText primary={code} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Stack>
  );
}
