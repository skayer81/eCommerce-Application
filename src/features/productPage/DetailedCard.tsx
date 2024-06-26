import { Box, CardActions, List, ListItem, ListItemText, Typography } from '@mui/material';

import ButtonAddToBasket from '@/components/buttonsForBasket/ButtonAddToBasket';
import ButtonChangeQuantity from '@/components/buttonsForBasket/ButtonChangeQuantity';

import DetailedCardSlider from './productCardSlider/DetailedCardSlider';

type AtribListItem = {
  name: string;
  value: {
    label: string;
  };
};

type ProductProperties = {
  IDItemInBasket: string;
  productProps: {
    description: string;
    discount: number | undefined;
    imgList: Array<string>;
    listOfAtributes: Array<AtribListItem> | undefined;
    name: string;
    price: number;
    sku: string;
  };
  setIsFullScreen: (isFullScreen: boolean) => void;
  setSlideNumber: (slideNumber: number) => void;
};

export default function DetailedCard({
  IDItemInBasket,
  productProps,
  setIsFullScreen,
  setSlideNumber,
}: ProductProperties): JSX.Element {
  const finalPrice = productProps.discount ? productProps.discount : productProps.price;
  const formattedPrice = finalPrice ? (finalPrice / 1000).toFixed(2) + '$' : '';
  const priceBeforeDiscount = productProps.price
    ? (productProps.price / 1000).toFixed(2) + '$'
    : '';
  return (
    <>
      <Typography align="center" component="h1" variant="h4">
        {productProps.name}
      </Typography>
      <Box sx={{ flexDirection: 'row', display: 'flex' }}>
        {/* <ImageList sx={{ width: '40%', height: 'auto' }} > */}
        <DetailedCardSlider
          imgList={productProps.imgList}
          name={productProps.name}
          setIsFullScreen={setIsFullScreen}
          setSlideNumber={setSlideNumber}
        />
        {/* </ImageList> */}
        <List sx={{ width: '60%', height: 'auto' }}>
          {productProps.listOfAtributes === undefined
            ? ''
            : productProps.listOfAtributes.map((elem, index) => {
                console.log(elem);
                return (
                  <ListItem key={index}>
                    {' '}
                    <ListItemText>
                      {' '}
                      {elem.name}: {elem.value.label}
                    </ListItemText>{' '}
                  </ListItem>
                );
              })}
          <CardActions sx={{ mt: 'auto' }}>
            <Typography
              sx={{ color: productProps.discount ? 'red' : 'primary.main', fontWeight: '500' }}
              variant="h5"
            >
              {formattedPrice}
            </Typography>
            {productProps.discount && (
              <Typography
                sx={{ textDecoration: 'line-through', ml: '10px', color: 'grey' }}
                variant="h6"
              >
                {priceBeforeDiscount}
              </Typography>
            )}
          </CardActions>
          <CardActions sx={{ mt: 'auto' }}>
            <ButtonAddToBasket disabled={!!IDItemInBasket} sku={productProps.sku}>
              {'add to basket'}
            </ButtonAddToBasket>
            <ButtonChangeQuantity ID={IDItemInBasket} disabled={!IDItemInBasket} quantity={0}>
              {'Remove from Cart'}
            </ButtonChangeQuantity>
          </CardActions>
        </List>
      </Box>
      <Typography>{productProps.description}</Typography>
    </>
  );
}

//{useUserStore().userId}
