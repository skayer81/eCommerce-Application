import { useParams } from 'react-router-dom';

import { ClientResponse, Product } from '@commercetools/platform-sdk';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getProductByKey } from '../../api/clientService';
import DetailedCard from './DetailedCard';

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

export default function ProductPage(): JSX.Element {
  const { key } = useParams();

  const { data, error, isPending } = useQuery({
    queryKey: ['product', key],
    queryFn: () => getProductByKey(key),
    select: productAdapter,
    enabled: !!key && key.trim() !== '',
  });

  if (isPending) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container> `An error has occurred: ${error.message}`</Container>;
  }

  return (
    <Container sx={{ border: 1 }}>
      <DetailedCard productProps={data} />
    </Container>
  );
}
