import { Box, Card, CardContent, CardMedia, ListItem, Stack, Typography } from '@mui/material';

import ButtonChangeQuantity from '@/components/buttonsForBasket/ButtonChangeQuantity';

import { BasketDecIncButtons } from './basketDecIncButtons';
import { BasketDataItem } from './basketTypes';

export function BasketPageListItem({ listItem }: { listItem: BasketDataItem }): JSX.Element {
  const price = (listItem.price / 1000).toFixed(2) + '$';
  const discountedPrice = (listItem.discountedPrice / 1000).toFixed(2) + '$';
  const totalItem = (listItem.totalItem / 1000).toFixed(2) + '$';
  const totalItemBeforeDiscount = ((listItem.price * listItem.quantity) / 1000).toFixed(2) + '$';

  return (
    <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        <Box sx={{ width: '100%' }}>
          <CardMedia
            component="img"
            height="200"
            image={listItem.img ?? 'https://placehold.co/1000x1000?text=No+Image'}
            sx={{ objectFit: 'contain' }}
            title={listItem.name}
          />
        </Box>
      </Card>
      <CardContent>
        <Typography component="div" gutterBottom sx={{ lineHeight: '1.3' }} variant="h6">
          name: {listItem.name}
        </Typography>
        <Stack direction={'row'} spacing={1}>
          <Typography component="div" sx={{ lineHeight: '1.3' }} variant="h6">
            price:
          </Typography>
          {listItem.discountedPrice ? (
            <>
              <Typography color={'primary'} component="div" sx={{ lineHeight: '1.3' }} variant="h6">
                {discountedPrice}
              </Typography>
              <Typography
                component="div"
                sx={{ lineHeight: '1.3', textDecoration: 'line-through', color: 'grey' }}
                variant="h6"
              >
                {price}
              </Typography>
            </>
          ) : (
            <Typography color={'primary'} component="div" sx={{ lineHeight: '1.3' }} variant="h6">
              {price}
            </Typography>
          )}
        </Stack>
        <BasketDecIncButtons
          ID={listItem.ID}
          currentQuantity={listItem.quantity}
        ></BasketDecIncButtons>

        <Stack direction={'row'} spacing={1}>
          <Typography component="div" sx={{ lineHeight: '1.3' }} variant="h6">
            total price:
          </Typography>
          {listItem.discountedPrice ? (
            <>
              <Typography color={'primary'} component="div" sx={{ lineHeight: '1.3' }} variant="h6">
                {totalItem}
              </Typography>
              <Typography
                component="div"
                sx={{ lineHeight: '1.3', textDecoration: 'line-through', color: 'grey' }}
                variant="h6"
              >
                {totalItemBeforeDiscount}
              </Typography>
            </>
          ) : (
            <Typography color={'primary'} component="div" sx={{ lineHeight: '1.3' }} variant="h6">
              {totalItem}
            </Typography>
          )}
        </Stack>
        <ButtonChangeQuantity ID={listItem.ID} disabled={false} quantity={0}>
          {'Remove from Cart'}
        </ButtonChangeQuantity>
      </CardContent>
    </ListItem>
  );
}
