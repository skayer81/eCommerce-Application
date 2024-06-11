import { Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import Loader from '@/components/loader/Loader';
import { useUserStore } from '@/stores/userStore';

import { getCustomerBasket } from '../../api/clientService';
import basketDataAdapter from './basketDataAdapter';
import { BasketPageList } from './basketPageList';
import { useBasketStore } from './useBasketStore';

export function BasketPage(): JSX.Element {
  const userID = useUserStore().userId;

  const { data, error, isPending } = useQuery({
    queryKey: ['customer', userID],
    queryFn: () => getCustomerBasket(userID),
    select: basketDataAdapter,
  });

  const { quantityItemInBasket, updateQuantity } = useBasketStore();

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <ErrorAlert />;
  }

  updateQuantity(data.length);
  //console.log(data);

  return (
    <Container sx={{ border: 1, padding: 2 }}>
      <Typography align="center" component="h1" variant="h4">
        Basket
      </Typography>
      {quantityItemInBasket === 0 ? (
        <Typography align="center" component="p" variant="h5">
          this message indicating that the cart is empty
        </Typography>
      ) : (
        <BasketPageList listData={data} />
      )}
    </Container>
  );
}
