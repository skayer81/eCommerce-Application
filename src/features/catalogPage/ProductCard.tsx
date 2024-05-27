import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

interface ProductCardProps {
  description?: string;
  imageUrl?: string;
  name: string;
  price?: number;
}

function ProductCard({ name, imageUrl, description, price }: ProductCardProps): JSX.Element {
  return (
    <Grid item md={3} sm={6} xs={12}>
      <Card sx={{ cursor: 'pointer', maxHeight: '450px' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl ?? 'default-image-url.jpg'}
          sx={{ objectFit: 'contain' }}
          title={name}
        />
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
          <Typography variant="h5">{price ? (price / 1000).toFixed(2) + '$' : ''}</Typography>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductCard;