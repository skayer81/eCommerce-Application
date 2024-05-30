import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { Grid, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/api/clientService';
import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import { useCatalogStore } from '@/stores/catalogStore';

import ControlPanel from './ControlPanel';
import ProductCard from './ProductCard';

function CatalogPage(): JSX.Element {
  const { categoryId, sortValue } = useCatalogStore((state) => ({
    categoryId: state.categoryId,
    sortValue: state.sortValue,
  }));

  console.log('sortVAlue=', sortValue);

  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ['products', categoryId, sortValue],
    queryFn: () => getProducts(categoryId, sortValue),
    select: (data: ClientResponse<ProductProjectionPagedQueryResponse>) => data.body.results,
  });

  if (isSuccess) {
    console.log('products=', data);
  }

  if (isError) {
    console.error(error);
    return <ErrorAlert />;
  }

  return (
    <>
      <Grid container spacing={2}>
        {/* Первая колонка */}
        <Grid item xs={2}>
          <Paper>
            <Typography variant="h6">Первая колонка</Typography>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
          </Paper>
        </Grid>
        {/* Вторая колонка */}
        <Grid item xs={10}>
          <Grid container direction="column" spacing={2}>
            {/* Первый ряд второй колонки */}
            <ControlPanel />
            {/* Второй ряд второй колонки */}
            <Grid item>
              <Grid container spacing={2}>
                {data?.map((item: ProductProjection) => (
                  <ProductCard
                    description={item.metaDescription?.en}
                    discount={item.masterVariant.prices?.[0].discounted?.value.centAmount}
                    discountId={item.masterVariant.prices?.[0].discounted?.discount.id}
                    imageUrl={item.masterVariant.images?.[0].url}
                    key={item.key}
                    name={item.name.en}
                    price={item.masterVariant.prices?.[0].value.centAmount}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CatalogPage;
