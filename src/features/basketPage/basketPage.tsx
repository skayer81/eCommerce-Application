import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// import ErrorAlert from '@/components/errorAlert/ErrorAlert';
// import Loader from '@/components/loader/Loader';
// import { useUserStore } from '@/stores/userStore';

// import { getCustomerBasket } from '../../api/clientService';
// import basketDataAdapter from './basketDataAdapter';
// import { BasketPageList } from './basketPageList';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Cart, ClientResponse, MyCartUpdate } from '@commercetools/platform-sdk';

import { useBasketStore } from '@/stores/basketStore';

import { changeNumberItemInBasket, getUserBasket } from '../../api/clientService';

export interface PromoForm {
  promo: string;
}

export function BasketPage(): JSX.Element {
  const queryClient = useQueryClient();
  // const userID = useUserStore().userId;

  const { basketId, updateCurrentVersion } = useBasketStore((state) => ({
    basketId: state.basketId,
    updateCurrentVersion: state.updateCurrentVersion,
  }));

  const { handleSubmit, control } = useForm<PromoForm>({
    defaultValues: {
      promo: '',
    },
  });

  // const { data, error, isPending } = useQuery({
  //   queryKey: ['customer', userID],
  //   queryFn: () => getCustomerBasket(userID),
  //   select: basketDataAdapter,
  // });

  // if (isPending) {
  //   return <Loader />;
  // }

  // if (error) {
  //   console.log(error);
  //   return <ErrorAlert />;
  // }

  // console.log(data);

  const { data: basketData } = useQuery({
    queryKey: ['basketData', basketId],
    queryFn: () => getUserBasket(basketId),
    select: (data: ClientResponse<Cart>) => data.body,
    enabled: !!basketId,
  });
  console.log('basketData=', basketData);

  const { mutate } = useMutation<ClientResponse, Error, MyCartUpdate>({
    mutationFn: (itemBody) => changeNumberItemInBasket(itemBody, basketId),
    onSuccess: async ({ body }: ClientResponse<Cart>) => {
      console.log('afterpromo=', body);
      updateCurrentVersion(body.version);
      await queryClient.invalidateQueries({ queryKey: ['basketData'] });
    },
    onError: (error) => console.error(error),
  });

  const totalPrice = basketData ? basketData.totalPrice.centAmount : 0;
  const totalPriceView = (totalPrice / 1000).toFixed(2) + '$';

  const submit: SubmitHandler<PromoForm> = (data: PromoForm): void => {
    console.log('formdata=', data);
    const version = basketData?.version as number;
    const promoBody: MyCartUpdate = {
      version: version,
      actions: [{ action: 'addDiscountCode', code: data.promo }],
    };

    // changeNumberItemInBasket(promoBody, basketId).then(({ body }) => {
    //   console.log('afterpromo=', body);
    //   updateCurrentVersion(body.version);
    // });

    mutate(promoBody);
  };

  return (
    <Container sx={{ border: 1, padding: 2 }}>
      <Typography align="center" component="h1" variant="h4">
        Basket
      </Typography>
      {/* <BasketPageList listData={data} /> */}
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography lineHeight={1.2}>Price without promocode</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color={'grey'} sx={{ textDecoration: 'line-through' }} variant="h4">
              {totalPriceView}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography lineHeight={1.2}>Price with promocode</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color={'primary'} variant="h4">
              345
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Stack>
        <Box
          component="form"
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
              <TextField {...field} fullWidth label="Promocode" sx={{ mb: 2 }} variant="outlined" />
            )}
          />
          <Button color="primary" type="submit" variant="contained">
            Apply
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
