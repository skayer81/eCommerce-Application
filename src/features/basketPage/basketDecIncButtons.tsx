import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { Box, Container } from '@mui/material';

import ButtonAddToBasket from '../productPage/ButtonAddToBasket';
import ButtonDelFromBasket from '../productPage/ButtonDelFromBasket';

export function BasketDecIncButtons({
  disabledDec,
  disabledInc,
  quantity,
  sku,
}: {
  disabledDec: boolean;
  disabledInc: boolean;
  quantity: number;
  sku: string;
}): JSX.Element {
  return (
    <Container>
      <ButtonDelFromBasket disabled={disabledDec} sku={sku}></ButtonDelFromBasket>
      <AddBox></AddBox>
      <Box>{quantity}</Box>
      <IndeterminateCheckBox></IndeterminateCheckBox>
      <ButtonAddToBasket disabled={disabledInc} sku={sku}></ButtonAddToBasket>
    </Container>
  );
}
