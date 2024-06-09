import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ClientResponse, Product } from '@commercetools/platform-sdk';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { findItemInBasket } from '@/components/findItemInBasket/findItemInBasket';
import { useUserStore } from '@/stores/userStore';

import { getProductByKey } from '../../api/clientService';
import ButtonAddToBasket from './ButtonAddToBasket';
import ButtonDelFromBasket from './ButtonDelFromBasket';
import DetailedCard from './DetailedCard';
import DetailedFullScreenSlider from './detailedFullScreenSlider/detailedFullScreenSlider';

type AtribListItem = {
  name: string;
  value: {
    label: string;
  };
};

type ProductProperties = {
  description: string;
  discount: number | undefined;
  imgList: Array<string>;
  listOfAtributes: Array<AtribListItem>;
  name: string;
  price: number;
  sku: string;
};

function productAdapter(data: ClientResponse<Product>): ProductProperties {
  const product: Product = data.body;
  console.log('product', product);
  const prices = product.masterData.current.masterVariant.prices;

  const discount = prices ? prices[0].discounted?.value.centAmount : undefined; //product.masterData.current.masterVariant.
  return {
    description: product.masterData.current.description?.en ?? '',
    imgList: product.masterData.current.masterVariant.images?.map((img) => img.url) ?? [''],
    name: product.masterData.current.name.en,
    listOfAtributes: product.masterData.current.masterVariant.attributes ?? [],
    price: prices ? prices[0]?.value.centAmount : 0,
    discount: discount,
    sku: product.masterData.current.masterVariant.sku ?? '',
  };
}

export default function ProductPage(): JSX.Element {
  const { key } = useParams();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenSlideNumber, setFullScreenSlideNumber] = useState(0);

  const { data, error, isPending } = useQuery({
    queryKey: ['product', key],
    queryFn: () => getProductByKey(key),
    select: productAdapter,
  });

  const [isItemInBasket, setIsItemInBasket] = useState(false);

  const userID = useUserStore().userId;

  if (isPending) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container> `An error has occurred: ${error.message}`</Container>;
  }

  findItemInBasket(data.sku, userID)
    .then((item) => {
      if (item) {
        setIsItemInBasket(true);
        return;
      }
      setIsItemInBasket(false);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <Container sx={{ border: 1, padding: 2 }}>
        <DetailedCard
          isItemInBasket={isItemInBasket}
          productProps={data}
          setIsFullScreen={setIsFullScreen}
          setIsItemInBasket={setIsItemInBasket}
          setSlideNumber={setFullScreenSlideNumber}
        />
      </Container>
      {isFullScreen ? (
        <DetailedFullScreenSlider
          firstSlideNumber={fullScreenSlideNumber}
          imgList={data.imgList}
          name={data.name}
          setIsFullScreen={setIsFullScreen}
        />
      ) : (
        <div style={{ display: 'none' }}></div>
      )}
      <ButtonAddToBasket disabled={isItemInBasket} sku={data.sku} />
      <ButtonDelFromBasket disabled={!isItemInBasket} sku={data.sku} />
    </>
  );
}
