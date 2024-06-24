import { Link } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

export function BasketEmptyList(): JSX.Element {
  return (
    <>
      <Typography align="center" component="p" variant="h5">
        this message indicating that the cart is empty
      </Typography>
      <Button
        component={Link}
        sx={{
          display: 'block',
          margin: '0 auto',

          color: 'primary.main',
          textAlign: 'center',
        }}
        to={'/catalog'}
      >
        <Typography align="center" component="span" variant="h5">
          How about buying a beautiful flower?
        </Typography>
      </Button>
    </>
  );
}
