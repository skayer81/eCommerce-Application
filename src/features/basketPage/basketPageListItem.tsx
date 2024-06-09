import { Box, Card, CardContent, CardMedia, ListItem, Typography } from '@mui/material';

import ButtonDelFromBasket from '../productPage/ButtonDelFromBasket';
import { BasketDataList } from './basketTypes';

export function BasketPageListItem({ listItem }: { listItem: BasketDataList }): JSX.Element {
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
        <Typography component="div" sx={{ lineHeight: '1.3' }} variant="h6">
          price: {(listItem.price / 1000).toFixed(2) + '$'}
        </Typography>
        <Typography component="div" sx={{ lineHeight: '1.3' }} variant="h6">
          quantity:{listItem.quantity}
        </Typography>
        <Typography component="div" sx={{ lineHeight: '1.3' }} variant="h6">
          total price:{((listItem.quantity * listItem.price) / 1000).toFixed(2) + '$'}
        </Typography>
        <ButtonDelFromBasket disabled={false} sku={''} />
        {/* //<Button onClick={}>Remove from Cart</Button> */}
      </CardContent>
    </ListItem>
  );
}
