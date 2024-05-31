import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { Grid, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/api/clientService';
import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import Loader from '@/components/loader/Loader';
import { useCatalogStore } from '@/stores/catalogStore';

import CatalogBreadcrumbs from './CatalogBreadCrumbs';
import Categories from './Categories';
import ControlPanel from './ControlPanel';
import ProductCard from './ProductCard/ProductCard';
import Search from './Search';

function CatalogPage(): JSX.Element {
  const { categoryId, sortValue } = useCatalogStore((state) => ({
    categoryId: state.categoryId,
    sortValue: state.sortValue,
  }));

  console.log('sortVAlue=', sortValue);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['products', categoryId, sortValue],
    queryFn: () => getProducts(categoryId, sortValue),
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
    <>
      <Grid container spacing={2}>
        {/* Строка с поиском */}
        <Search />
        {/* Первая колонка */}
        <Grid item xs={2}>
          <Paper sx={{ pt: '10px' }}>
            <Typography align="center" variant="h6">
              Categories
            </Typography>
            <Categories />
          </Paper>
        </Grid>
        {/* Вторая колонка */}
        <Grid item xs={10}>
          <Grid container direction="column" spacing={2}>
            {/* Первый ряд второй колонки */}

            <Grid item>
              <CatalogBreadcrumbs />
              <ControlPanel />
            </Grid>
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
