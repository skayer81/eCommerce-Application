import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import ButtonChangeQuantity from '@/components/buttonsForBasket/ButtonChangeQuantity';

export function BasketDecIncButtons({
  ID,
  currentQuantity,
}: {
  ID: string;
  currentQuantity: number;
}): JSX.Element {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', padding: 0 }}>
      <Typography component="div" gutterBottom sx={{ lineHeight: '1.3' }} variant="h6">
        quantity:
      </Typography>
      <ButtonChangeQuantity ID={ID} disabled={currentQuantity === 1} quantity={currentQuantity - 1}>
        {<IndeterminateCheckBox />}
      </ButtonChangeQuantity>
      <Typography component="div" gutterBottom sx={{ lineHeight: '1.3' }} variant="h6">
        {currentQuantity}
      </Typography>
      <ButtonChangeQuantity ID={ID} disabled={false} quantity={currentQuantity + 1}>
        {<AddBox />}
      </ButtonChangeQuantity>
    </Box>
  );
}
