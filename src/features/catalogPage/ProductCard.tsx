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

interface ProductCardProps {
  description?: string;
  discount?: number;
  discountId?: string;
  imageUrl?: string;
  name: string;
  price?: number;
}

function ProductCard({
  name,
  imageUrl,
  description,
  price,
  discount,
  discountId,
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
    <Grid item md={3} sm={6} xs={12}>
      <Card sx={{ cursor: 'pointer', maxHeight: '450px', position: 'relative' }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={imageUrl ?? 'https://placehold.co/1000x1000?text=No+Image'}
            sx={{ objectFit: 'contain' }}
            title={name}
          />
          {discount && (
            <Chip
              color="success"
              label={discountName}
              sx={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                zIndex: 1,
                height: '25px',
                borderRadius: '10px',
              }}
            />
          )}
        </Box>

        <CardContent>
          <Typography component="div" gutterBottom sx={{ lineHeight: '1.3' }} variant="h6">
            {name}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            variant="body2"
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography sx={{ color: discount ? 'red' : 'inherit' }} variant="h5">
            {formattedPrice}
          </Typography>
          {discount && (
            <Typography
              sx={{ textDecoration: 'line-through', ml: '10px', color: 'grey' }}
              variant="h6"
            >
              {priceBeforeDiscount}
            </Typography>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductCard;
