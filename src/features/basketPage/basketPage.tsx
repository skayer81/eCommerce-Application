import { Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import Loader from '@/components/loader/Loader';
import { useBasketStore } from '@/stores/basketStore';

import { getUserBasket } from '../../api/clientService';
import PromocodeForm from './PromocodeForm';
import { TotalItemsCost } from './TotalItemsCost';
import basketDataAdapter from './basketDataAdapter';
import { BasketEmptyList } from './basketEmptyList';
import { BasketPageList } from './basketPageList';

export function BasketPage(): JSX.Element {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));
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

  return (
    <Stack
      direction={isTablet ? 'row' : 'column'}
      justifyContent={'space-between'}
      spacing={2}
      sx={{ width: '100%' }}
    >
      <Paper sx={{ flexGrow: 1, padding: '20px' }}>
        {data.basketItems.length === 0 ? (
          <BasketEmptyList />
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Cart
            </Typography>
            <BasketPageList listData={data.basketItems} />
          </>
        )}
      </Paper>

      <Paper
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          alignSelf: isTablet ? 'flex-start' : 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          gap: '20px',
        }}
      >
        <PromocodeForm
          basketId={data.basketId}
          basketVersion={data.basketVersion}
          discountCodes={data.discountCodes}
        />
        <TotalItemsCost
          discount={data.discountOnTotalPrice}
          total={data.totalBasketPrice}
          totalBefore={data.totalBeforeDiscount}
        />
      </Paper>
    </Stack>
  );
}
