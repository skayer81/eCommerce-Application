import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { Box, Container } from '@mui/material';

//mport ButtonAddToBasket from '@/components/buttonsForBasket/ButtonAddToBasket';
import ButtonChangeQuantity from '@/components/buttonsForBasket/ButtonChangeQuantity';

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
      <ButtonChangeQuantity disabled={disabledDec} quantity={quantity - 1} sku={sku}>
        {<AddBox />}
      </ButtonChangeQuantity>
      <Box>{quantity}</Box>
      <ButtonChangeQuantity disabled={disabledInc} quantity={quantity + 1} sku={sku}>
        {<IndeterminateCheckBox />}
      </ButtonChangeQuantity>
    </Container>
  );
}
