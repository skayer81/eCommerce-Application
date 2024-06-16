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
  const { updateCurrentVersion, numbOfItems } = useBasketStore((state) => ({
    updateCurrentVersion: state.updateCurrentVersion,
    numbOfItems: state.numbOfItems,
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
          width: '100%',
          margin: '0 auto',
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
              disabled={!numbOfItems}
              error={!!errors.promo}
              fullWidth
              helperText={errors.promo ? 'Required field' : ''}
              size="small"
              sx={{ mb: 2, width: '100%' }}
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
        <Button color="primary" disabled={!numbOfItems} type="submit" variant="contained">
          Apply
        </Button>
      </Box>
      {discountCodes && discountCodes.length > 0 && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body1">Promocodes applied:</Typography>
          <List sx={{ padding: 0 }}>
            {discountCodes.map((code) => (
              <ListItem key={code} sx={{ pt: 0, pb: 0 }}>
                <ListItemText primary={code} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Stack>
  );
}
