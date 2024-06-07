import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ClientResponse, Product } from '@commercetools/platform-sdk';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getProductByKey } from '../../api/clientService';
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
};

function productAdapter(data: ClientResponse): ProductProperties {
  const product: Product = data.body as Product;
  // console.log(product);
  const prices = product.masterData.current.masterVariant.prices;

  const discount = prices ? prices[0].discounted?.value.centAmount : undefined; //product.masterData.current.masterVariant.
  return {
    description: product.masterData.current.description?.en ?? '',
    imgList: product.masterData.current.masterVariant.images?.map((img) => img.url) ?? [''],
    name: product.masterData.current.name.en,
    listOfAtributes: product.masterData.current.masterVariant.attributes ?? [],
    price: prices ? prices[0]?.value.centAmount : 0,
    discount: discount,
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

  if (isPending) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container> `An error has occurred: ${error.message}`</Container>;
  }

  return (
    <>
      <Container sx={{ border: 1, padding: 2 }}>
        <DetailedCard
          productProps={data}
          setIsFullScreen={setIsFullScreen}
          setSlideNumber={setFullScreenSlideNumber}
        />
        {/* // <DetailedFullScreenSlider/> */}
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
