import { Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import Loader from '@/components/loader/Loader';
import { useBasketStore } from '@/stores/basketStore';

import { getUserBasket } from '../../api/clientService';
import { TotalItemsCost } from './TotalItemsCost';
import basketDataAdapter from './basketDataAdapter';
import { BasketEmptyList } from './basketEmptyList';
import { BasketPageList } from './basketPageList';

export function BasketPage(): JSX.Element {
  const { basketId } = useBasketStore();

  const { data, error, isPending } = useQuery({
    queryKey: ['basketList', basketId],
    queryFn: () => getUserBasket(basketId),
    select: basketDataAdapter,
    enabled: !!basketId,
  });

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <ErrorAlert />;
  }

  // console.log(data);
  console.log('идет в баскетлист=', data.basketItems);

  return (
    <Container sx={{ border: 1, padding: 2 }}>
      <Typography align="center" component="h1" variant="h4">
        Basket
      </Typography>
      {data.basketItems.length === 0 ? (
        <BasketEmptyList />
      ) : (
        <>
          <BasketPageList listData={data.basketItems} />
          <TotalItemsCost totalCost={data.totalBasketPrice} />
        </>
      )}
    </Container>
  );
}
