// import { useBasketStore } from '@/stores/basketStore.ts';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Cart,
  ClientResponse,
  /* MyCartUpdate, */ ProductDiscount,
} from '@commercetools/platform-sdk';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
  /* Button, */
} from '@mui/material';
import { useQuery /* useMutation, */ /* useQueryClient  */ } from '@tanstack/react-query';

import { getDiscountById /* changeNumberItemInBasket  */ } from '@/api/clientService';
import ButtonAddToBasket from '@/components/buttonsForBasket/ButtonAddToBasket.tsx';

import { boxStyle, cardStyle, chipStyle, descriptionStyle, startPriceStyle } from './Styles.tsx';

interface ProductCardProps {
  basket?: Cart;
  description?: string;
  discount?: number;
  discountId?: string;
  imageUrl?: string;
  name: string;
  price?: number;
  productKey?: string;
  sku?: string;
}

function ProductCard({
  name,
  imageUrl,
  description,
  price,
  discount,
  discountId,
  productKey,
  sku,
  basket,
}: ProductCardProps): JSX.Element {
  // const queryClient = useQueryClient();

  // const { updateCurrentVersion, addBasketIDInStore } = useBasketStore((state) => ({
  //   updateCurrentVersion: state.updateCurrentVersion,
  //   addBasketIDInStore: state.addBasketIDInStore,
  // }));

  const finalPrice = discount ? discount : price;
  const formattedPrice = finalPrice ? (finalPrice / 1000).toFixed(2) + '$' : '';
  const priceBeforeDiscount = price ? (price / 1000).toFixed(2) + '$' : '';
  const prodDiscountId = discountId ? discountId : '';
  // const basketId = basket?.id as string;
  const basketVersion = basket?.version as number;
  const isItemInBasketStart = !!basket?.lineItems.find((item) => item.variant.sku === sku);

  const [isItemInBasket, setStateInBasket] = useState(isItemInBasketStart);

  const { data: discountName } = useQuery({
    queryKey: ['discount', prodDiscountId],
    queryFn: () => getDiscountById(prodDiscountId),
    select: (data: ClientResponse<ProductDiscount>) => data.body.name.en,
    enabled: !!prodDiscountId,
  });
  console.log('sku=', sku);
  console.log('basketversion=', basketVersion);
  // const { mutate, error, isError } = useMutation<ClientResponse, Error, MyCartUpdate>({
  //   mutationFn: (itemBody) => changeNumberItemInBasket(itemBody, basketId),
  //   onSuccess: async ({ body }) => {
  //     console.log('lastBasket=', body);
  //     updateCurrentVersion(body.version);
  //     addBasketIDInStore(body.id);
  //     await queryClient.invalidateQueries({ queryKey: ['cart'] });
  //   },
  // });

  // const handleClick = (): void => {
  //   const body: MyCartUpdate = {
  //     version: basketVersion,
  //     actions: [{ action: 'addLineItem', sku: sku, quantity: 1 }],
  //   };

  //   mutate(body);

  //   console.log('click');
  // };

  return (
    <Grid item lg={3} md={4} md1={4} sm={6} sm1={8} xs={12}>
      <Card sx={cardStyle}>
        <Box
          component={RouterLink}
          sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
          to={`/product/${productKey}`}
        >
          <Box sx={boxStyle}>
            <CardMedia
              component="img"
              height="200"
              image={imageUrl ?? 'https://placehold.co/1000x1000?text=No+Image'}
              sx={{ objectFit: 'contain' }}
              title={name}
            />
            {discount && <Chip color="success" label={discountName} sx={chipStyle} />}
          </Box>
          <CardContent sx={{ flexGrow: '1' }}>
            <Typography component="div" gutterBottom sx={{ lineHeight: '1.3' }} variant="h6">
              {name}
            </Typography>
            <Typography color="text.secondary" sx={descriptionStyle} variant="body2">
              {description}
            </Typography>
          </CardContent>
        </Box>
        <CardActions sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row">
            <Typography
              sx={{ color: discount ? 'red' : 'primary.main', fontWeight: '500' }}
              variant="h5"
            >
              {formattedPrice}
            </Typography>
            {discount && (
              <Typography sx={startPriceStyle} variant="h6">
                {priceBeforeDiscount}
              </Typography>
            )}
          </Stack>
          <ButtonAddToBasket
            callback={() => setStateInBasket(true)}
            disabled={isItemInBasket}
            sku={sku}
          >
            <ShoppingCartOutlinedIcon fontSize="medium" fontWeight="400" />
          </ButtonAddToBasket>
          {/* <Button onClick={handleClick} disabled={isItemInBasketStart}>
            <ShoppingCartOutlinedIcon fontSize="medium" fontWeight="400" />
          </Button> */}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductCard;
