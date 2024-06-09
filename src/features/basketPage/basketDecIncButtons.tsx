import { useState } from 'react';

import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import ButtonAddToBasket from '@/components/buttonsForBasket/ButtonAddToBasket';
import ButtonChangeQuantity from '@/components/buttonsForBasket/ButtonChangeQuantity';

export function BasketDecIncButtons({
  quantity,
  sku,
}: {
  quantity: number;
  sku: string;
}): JSX.Element {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  console.log('quantity', quantity);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', padding: 0 }}>
      <Typography component="div" gutterBottom sx={{ lineHeight: '1.3' }} variant="h6">
        quantity:
      </Typography>
      <ButtonChangeQuantity
        callback={() => {
          setCurrentQuantity(currentQuantity - 1);
        }}
        disabled={currentQuantity === 0}
        quantity={currentQuantity - 1}
        sku={sku}
      >
        {<IndeterminateCheckBox />}
      </ButtonChangeQuantity>
      <Typography component="div" gutterBottom sx={{ lineHeight: '1.3' }} variant="h6">
        {currentQuantity}
      </Typography>
      {currentQuantity > 0 ? (
        <ButtonChangeQuantity
          callback={() => {
            setCurrentQuantity(currentQuantity + 1);
          }}
          disabled={false}
          quantity={currentQuantity + 1}
          sku={sku}
        >
          {<AddBox />}
        </ButtonChangeQuantity>
      ) : (
        <ButtonAddToBasket
          callback={() => {
            setCurrentQuantity(currentQuantity + 1);
          }}
          disabled={false}
          sku={sku}
        >
          {<AddBox />}
        </ButtonAddToBasket>
      )}
    </Box>
  );
}
