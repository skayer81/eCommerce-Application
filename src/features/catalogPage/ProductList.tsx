import { useEffect, useState } from 'react';

import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/api/clientService';
import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import Loader from '@/components/loader/Loader';
import { useCatalogStore } from '@/stores/catalogStore';

import CatalogPagination from './Pagination';
import ProductCard from './ProductCard/ProductCard';

function ProductList(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = useState<number>(1);

  const { categoryId, sortValue, attributes, searchValue } = useCatalogStore((state) => ({
    categoryId: state.categoryId,
    sortValue: state.sortValue,
    attributes: state.attributes,
    searchValue: state.searchValue,
  }));

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['products', categoryId, sortValue, attributes, searchValue, page],
    queryFn: () => getProducts(categoryId, sortValue, attributes, searchValue, page),
    select: (data: ClientResponse<ProductProjectionPagedQueryResponse>) => data.body,
  });

  useEffect(() => {
    setPage(1);
  }, [categoryId, sortValue, attributes, searchValue]);

  // useEffect(() => {
  //   queryClient.invalidateQueries({
  //     queryKey: ['products', categoryId, sortValue, attributes, searchValue, page],
  //   });
  // }, [page]);

  console.log('products=', data);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error(error);
    return <ErrorAlert />;
  }

  return (
    <>
      <Grid container justifyContent={isMobile ? 'center' : 'flex-start'} spacing={2}>
        {data?.results.length === 0 ? (
          <Typography sx={{ p: '10px' }}>Nothing was found</Typography>
        ) : (
          data?.results.map((item: ProductProjection) => (
            <ProductCard
              description={item.metaDescription?.en}
              discount={item.masterVariant.prices?.[0].discounted?.value.centAmount}
              discountId={item.masterVariant.prices?.[0].discounted?.discount.id}
              imageUrl={item.masterVariant.images?.[0].url}
              key={item.key}
              name={item.name.en}
              price={item.masterVariant.prices?.[0].value.centAmount}
              productKey={item.key}
            />
          ))
        )}
      </Grid>
      {data?.total ? (
        <Stack>
          <CatalogPagination page={page} setPage={setPage} total={data.total} />
        </Stack>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ProductList;
