import { Box, ImageList, List, ListItem, ListItemText, Typography } from '@mui/material';

import DetailedCardSlider from './productCardSlider/DetailedCardSlider';

type AtribListItem = {
  name: string;
  value: {
    label: string;
  };
};

type ProductProperties = {
  productProps: {
    description: string;
    imgList: Array<string>;
    listOfAtributes: Array<AtribListItem> | undefined;
    name: string;
  };
};

export default function DetailedCard({ productProps }: ProductProperties): JSX.Element {
  return (
    <>
      <Typography align="center" component="h1" sx={{ mt: 5 }} variant="h4">
        {productProps.name}
      </Typography>
      <Box sx={{ flexDirection: 'row', display: 'flex' }}>
        <ImageList sx={{ width: 500, height: 450 }}>
          <DetailedCardSlider imgList={productProps.imgList} name={productProps.name} />
        </ImageList>
        <List>
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
        </List>
      </Box>
      <Typography>{productProps.description}</Typography>
    </>
  );
}
