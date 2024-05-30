import { Container } from '@mui/material';
//import { useEffect, useState } from 'react';

import { getProductByKey } from '../../api/clientService';
//import { AddBoxOutlined, BorderAll, ImageAspectRatioOutlined, Title } from "@mui/icons-material";
import ProductCard from './ProductCard';
//import { useQuery } from "@tanstack/react-query";

// import {
//   ClientResponse,
//   ProductProjection,
//   ProductProjectionPagedQueryResponse,
// } from '@commercetools/platform-sdk';
// import { Paper, } from '@mui/material';
import { ClientResponse, Product } from '@commercetools/platform-sdk';
import { useQuery } from '@tanstack/react-query';

// import { useState } from 'react';

//import { getProducts } from '@/api/clientService';
//import  ErrorAlert from '@/components/errorAlert/ErrorAlert';

//import ProductCard from './ProductCard';

type Props = {
  productKey: string;
};

// type getProductByKeyBody = {
//   masterData:{
//     current:{
//       name:{
//         en:string
//       }
//     }
//   }
// }

// type CurrentProperties = {
//   name:{
//     en:string
//   }
// }
type AtribListItem = {
  name: string;
  value: {
    label: string;
  };
};

type ProductProperties = {
  description: string;
  imgList: Array<string>;
  listOfAtributes: Array<AtribListItem>;
  name: string;
};

function productAdapter(data: ClientResponse): ProductProperties {
  const product: Product = data.body as Product;
  return {
    description: product.masterData.current.description?.en ?? '',
    imgList: product.masterData.current.masterVariant.images?.map((img) => img.url) ?? [''],
    name: product.masterData.current.name.en,
    listOfAtributes: product.masterData.current.masterVariant.attributes ?? [],
  };
}

export default function ProductPage({ productKey = 'ficus-elastica5' }: Props): JSX.Element {
  // const [productProperty, setProductProperty] =  useState();
  // const product = getProductByKey('ficus-elastica5').then((value) =>{
  // //  console.log('свойства' ,value.body)//?.masterData?.current)
  //   let test:CurrentProperties = value.body?.masterData?.current;
  //   console.log('test', test);
  //  // setProductProperty(test);
  //  // setProductProperty(value);
  // }).catch(() => {

  // }) ;
  // console.log(product);
  //https://api.europe-west1.gcp.commercetools.com/fun-code-shop/products/key=ficus-elastica5

  const item = 'ficus-elastica5';
  const { data, isSuccess, error, isPending } = useQuery({
    queryKey: ['products', { key: productKey }],
    queryFn: () => getProductByKey(item),
  }); // https://api.europe-west1.gcp.commercetools.com/fun-code-shop/products/key=%5Bobject%20Object%5D
  //let product: Product;
  if (isSuccess) {
    // //    product  = data?.body
    console.log('isSuccess products=', data);
  }

  if (isPending) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container> `An error has occurred: ${error.message}`</Container>;
  }

  //if (data !== undefined){

  return (
    <Container sx={{ border: 1 }}>
      <ProductCard productProps={productAdapter(data)} />

      {/* <ProductCard list={е}></ProductCard> */}
    </Container>
  );
  // }
}

// list={data?.body.masterData.current?.masterVariant?.attributes} name={data?.body.masterData.current.name.en}
