import {
  Box,
  Card,
  CardContent,
  CardMedia,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import ButtonChangeQuantity from '@/components/buttonsForBasket/ButtonChangeQuantity';

import { BasketDecIncButtons } from './basketDecIncButtons';
import { BasketDataItem } from './basketTypes';

export function BasketPageListItem({ listItem }: { listItem: BasketDataItem }): JSX.Element {
  const price = (listItem.price / 1000).toFixed(2) + '$';
  const discountedPrice = (listItem.discountedPrice / 1000).toFixed(2) + '$';
  const totalItem = (listItem.totalItem / 1000).toFixed(2) + '$';
  const totalItemBeforeDiscount = ((listItem.price * listItem.quantity) / 1000).toFixed(2) + '$';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ListItem sx={{ display: 'flex', pl: 0, pr: 0 }}>
      <Card sx={{ flex: 'none', alignSelf: 'flex-start' }}>
        <Box sx={{ width: '100%' }}>
          <CardMedia
            component="img"
            image={listItem.img ?? 'https://placehold.co/1000x1000?text=No+Image'}
            sx={{
              objectFit: 'contain',
              width: isMobile ? '100px' : '150px',
              height: isMobile ? '100px' : '150px',
            }}
            title={listItem.name}
          />
        </Box>
      </Card>
      <CardContent sx={{ pr: 0, pt: 0 }}>
        <Typography
          component="div"
          gutterBottom
          sx={{ lineHeight: '1.3' }}
          variant={isMobile ? 'body1' : 'h6'}
        >
          {listItem.name}
        </Typography>

        <Stack alignItems={'center'} direction={'row'} spacing={1}>
          <Typography
            component="div"
            sx={{ lineHeight: '1.3' }}
            variant={isMobile ? 'body2' : 'body1'}
          >
            Price:
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

        <Stack alignItems={'center'} direction={'row'} spacing={1} sx={{ mb: '5px' }}>
          <Typography
            component="div"
            sx={{ lineHeight: '1.3' }}
            variant={isMobile ? 'body2' : 'body1'}
          >
            Total:
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
        <ButtonChangeQuantity ID={listItem.ID} disabled={false} quantity={0} variant={'outlined'}>
          {'Remove from Cart'}
        </ButtonChangeQuantity>
      </CardContent>
    </ListItem>
  );
}
