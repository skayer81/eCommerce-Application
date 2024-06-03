import { Link as RouterLink } from 'react-router-dom';

import { ClientResponse, ProductDiscount } from '@commercetools/platform-sdk';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDiscountById } from '@/api/clientService';

import { boxStyle, cardStyle, chipStyle, descriptionStyle, startPriceStyle } from './Styles.tsx';

interface ProductCardProps {
  description?: string;
  discount?: number;
  discountId?: string;
  imageUrl?: string;
  name: string;
  price?: number;
  productKey?: string;
}

function ProductCard({
  name,
  imageUrl,
  description,
  price,
  discount,
  discountId,
  productKey,
}: ProductCardProps): JSX.Element {
  const finalPrice = discount ? discount : price;
  const formattedPrice = finalPrice ? (finalPrice / 1000).toFixed(2) + '$' : '';
  const priceBeforeDiscount = price ? (price / 1000).toFixed(2) + '$' : '';
  const prodDiscountId = discountId ? discountId : '';

  const { data: discountName } = useQuery({
    queryKey: ['discount', prodDiscountId],
    queryFn: () => getDiscountById(prodDiscountId),
    select: (data: ClientResponse<ProductDiscount>) => data.body.name.en,
    enabled: !!prodDiscountId,
  });

  return (
    <Grid item lg={3} md={4} md1={4} sm={6} sm1={8} xs={12}>
      <Card component={RouterLink} sx={cardStyle} to={`/product/${productKey}`}>
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
        <CardActions sx={{ mt: 'auto' }}>
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
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductCard;
