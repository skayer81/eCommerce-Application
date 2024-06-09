import { Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useUserStore } from '@/stores/userStore';

import { getCustomerBasket } from '../../api/clientService';
import basketDataAdapter from './basketDataAdapter';
import { BasketPageList } from './basketPageList';

export function BasketPage(): JSX.Element {
  const userID = useUserStore().userId;

  const { data, error, isPending } = useQuery({
    queryKey: ['customer', userID],
    queryFn: () => getCustomerBasket(userID),
    select: basketDataAdapter,
  });

  if (isPending) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container> `An error has occurred: ${error.message}`</Container>;
  }

  console.log(data);

  return (
    <Container sx={{ border: 1, padding: 2 }}>
      <Typography align="center" component="h1" variant="h4">
        Basket
      </Typography>
      <BasketPageList listData={data} />
    </Container>
  );
}
