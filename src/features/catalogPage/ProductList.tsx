import {
  Cart,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { /*  useQuery, */ useQueries } from '@tanstack/react-query';

import { getProducts, getUserBasket } from '@/api/clientService';
import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import Loader from '@/components/loader/Loader';
import { useBasketStore } from '@/stores/basketStore';
import { useCatalogStore } from '@/stores/catalogStore';

import ProductCard from './ProductCard/ProductCard';

function ProductList(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { categoryId, sortValue, attributes, searchValue } = useCatalogStore((state) => ({
    categoryId: state.categoryId,
    sortValue: state.sortValue,
    attributes: state.attributes,
    searchValue: state.searchValue,
  }));

  const { basketId } = useBasketStore((state) => ({
    basketId: state.basketId,
  }));

  // const { data, isError, error, isLoading } = useQuery({
  //   queryKey: ['products', categoryId, sortValue, attributes, searchValue],
  //   queryFn: () => getProducts(categoryId, sortValue, attributes, searchValue),
  //   select: (data: ClientResponse<ProductProjectionPagedQueryResponse>) => data.body.results,
  // });

  const queries = useQueries({
    queries: [
      {
        queryKey: ['products', categoryId, sortValue, attributes, searchValue],
        queryFn: () => getProducts(categoryId, sortValue, attributes, searchValue),
        select: (data: ClientResponse<ProductProjectionPagedQueryResponse>) => data.body.results,
      },
      {
        queryKey: ['cart', basketId],
        queryFn: () => getUserBasket(basketId),
        select: (data: ClientResponse<Cart>) => data.body,
      },
    ],
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    // console.error(error);
    return <ErrorAlert />;
  }

  const data1 = queries[0].data;
  const data2 = queries[1].data;
  console.log('products=', data1);
  console.log('cart=', data2);

  return (
    <Grid
      container
      justifyContent={isMobile ? 'center' : 'flex-start'}
      spacing={2}
      sx={{ mb: '50px' }}
    >
      {data1?.length === 0 ? (
        <Typography sx={{ p: '10px' }}>Nothing was found</Typography>
      ) : (
        data1?.map((item: ProductProjection) => (
          <ProductCard
            description={item.metaDescription?.en}
            discount={item.masterVariant.prices?.[0].discounted?.value.centAmount}
            discountId={item.masterVariant.prices?.[0].discounted?.discount.id}
            imageUrl={item.masterVariant.images?.[0].url}
            key={item.key}
            name={item.name.en}
            price={item.masterVariant.prices?.[0].value.centAmount}
            productKey={item.key}
            sku={item.masterVariant.sku}
          />
        ))
      )}
    </Grid>
  );
}

export default ProductList;
