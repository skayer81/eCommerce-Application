import { List, ListItem, ListItemText, Typography } from '@mui/material';
//import { useEffect, useState } from 'react';

//import {getProductByKey} from "../../api/clientService"
import { AddBoxOutlined, ImageAspectRatioOutlined } from '@mui/icons-material';

type AtribListItem = {
  name: string;
  value: {
    label: string;
  };
};

type ProductProperties = {
  productProps: {
    listOfAtributes: Array<AtribListItem> | undefined;
    name: string;
  };
};

export default function ProductCard({ productProps }: ProductProperties): JSX.Element {
  return (
    <>
      <Typography component="h1" variant="h5">
        имя:{productProps.name}
      </Typography>
      <AddBoxOutlined>
        <ImageAspectRatioOutlined>картинка</ImageAspectRatioOutlined>
      </AddBoxOutlined>
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

      <Typography>описание</Typography>
    </>
  );
}
