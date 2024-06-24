import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ClientResponse, Product } from '@commercetools/platform-sdk';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { findIDItemInBasket } from '@/components/findItemInBasket/findItemInBasket';
import { useBasketStore } from '@/stores/basketStore';

import { getProductByKey, getUserBasket } from '../../api/clientService';
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
  const discount = prices ? prices[0].discounted?.value.centAmount : undefined;

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

  const { basketId } = useBasketStore();
  const basketQuery = useQuery({
    queryKey: ['productInCart', basketId],
    queryFn: () => getUserBasket(basketId),
    enabled: !!basketId,
  });

  if (isPending || basketQuery.isPending) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container> `An error has occurred: ${error.message}`</Container>;
  }

  if (basketQuery.error) {
    return <Container> `An error has occurred: ${basketQuery.error.message}`</Container>;
  }

  const IDItemInBasket = findIDItemInBasket(basketQuery.data?.body.lineItems, data.sku);
  //const lineItemID = basketQuery.data.body.lineItems.

  return (
    <>
      <Container sx={{ border: 1, padding: 2 }}>
        <DetailedCard
          IDItemInBasket={IDItemInBasket}
          productProps={data}
          setIsFullScreen={setIsFullScreen}
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
    </>
  );
}
