import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/api/clientService';
import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import Loader from '@/components/loader/Loader';
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

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['products', categoryId, sortValue, attributes, searchValue],
    queryFn: () => getProducts(categoryId, sortValue, attributes, searchValue),
    select: (data: ClientResponse<ProductProjectionPagedQueryResponse>) => data.body.results,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error(error);
    return <ErrorAlert />;
  }

  return (
    <Grid
      container
      justifyContent={isMobile ? 'center' : 'flex-start'}
      spacing={2}
      sx={{ mb: '50px' }}
    >
      {data?.length === 0 ? (
        <Typography sx={{ p: '10px' }}>Nothing was found</Typography>
      ) : (
        data?.map((item: ProductProjection) => (
          <ProductCard
            description={item.metaDescription?.en}
            discount={item.masterVariant.prices?.[0].discounted?.value.centAmount}
            discountId={item.masterVariant.prices?.[0].discounted?.discount.id}
            imageUrl={item.masterVariant.images?.[0].url}
            key={item.key}
            name={item.name.en}
            price={item.masterVariant.prices?.[0].value.centAmount}
          />
        ))
      )}
    </Grid>
  );
}

export default ProductList;
