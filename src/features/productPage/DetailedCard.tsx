import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

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
  setIsFullScreen: (isFullScreen: boolean) => void;
};

export default function DetailedCard({
  productProps,
  setIsFullScreen,
}: ProductProperties): JSX.Element {
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
        </List>
      </Box>
      <Typography>{productProps.description}</Typography>
    </>
  );
}
