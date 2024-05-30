import InfoIcon from '@mui/icons-material/Info';
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';

type AtribListItem = {
  name: string;
  value: {
    label: string;
  };
};

type ProductProperties = {
  productProps: {
    description: string;
    imgList: Array<string> | undefined;
    listOfAtributes: Array<AtribListItem> | undefined;
    name: string;
  };
};

export default function ProductCard({ productProps }: ProductProperties): JSX.Element {
  return (
    <>
      <Typography align="center" component="h1" sx={{ mt: 5 }} variant="h4">
        {productProps.name}
      </Typography>
      <Box sx={{ flexDirection: 'row', display: 'flex' }}>
        <ImageList sx={{ width: 500, height: 450 }}>
          <ImageListItem cols={2} key="Subheader">
            <ListSubheader component="div">Slider</ListSubheader>
          </ImageListItem>
          {productProps.imgList.map((item, index) => (
            <ImageListItem key={item}>
              <img
                alt={`${productProps.name}${index}`}
                loading="lazy"
                src={`${item}?w=248&fit=crop&auto=format`}
                srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
              />
              <ImageListItemBar
                actionIcon={
                  <IconButton aria-label={`full size`} sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                    <InfoIcon />
                  </IconButton>
                }
                subtitle={`image ${index}`}
                title={productProps.name}
              />
            </ImageListItem>
          ))}
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
