import { Link as RouterLink } from 'react-router-dom';

import { Cart, ClientResponse, ProductDiscount } from '@commercetools/platform-sdk';
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
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDiscountById } from '@/api/clientService';
import ButtonAddToBasket from '@/components/buttonsForBasket/ButtonAddToBasket.tsx';
import { CENTS_IN_UNIT } from '@/utils/constants.ts';

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
  const finalPrice = discount ? discount : price;
  const formattedPrice = finalPrice ? (finalPrice / CENTS_IN_UNIT).toFixed(2) + '$' : '';
  const priceBeforeDiscount = price ? (price / CENTS_IN_UNIT).toFixed(2) + '$' : '';
  const prodDiscountId = discountId ? discountId : '';
  const isItemInBasket = !!basket?.lineItems.find((item) => item.variant.sku === sku);

  const { data: discountName } = useQuery({
    queryKey: ['discount', prodDiscountId],
    queryFn: () => getDiscountById(prodDiscountId),
    select: (data: ClientResponse<ProductDiscount>) => data.body.name.en,
    enabled: !!prodDiscountId,
  });

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

          <ButtonAddToBasket disabled={isItemInBasket} sku={sku}>
            <>
              <ShoppingCartOutlinedIcon fontSize="medium" fontWeight="400" />
              {isItemInBasket && (
                <Typography sx={{ textTransform: 'capitalize' }} variant="body2">
                  In Cart
                </Typography>
              )}
            </>
          </ButtonAddToBasket>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductCard;
