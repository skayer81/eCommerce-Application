import { Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import CatalogBreadcrumbs from './CatalogBreadCrumbs';
import Categories from './Categories';
import ControlPanel from './ControlPanel';
import ProductList from './ProductList';
import Search from './Search';

function CatalogPage(): JSX.Element {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Grid container spacing={2}>
        <Search />
        {isTablet && (
          <Grid item sx={{ flexBasis: 200, flexShrink: 0 }}>
            <Paper sx={{ pt: '10px' }}>
              <Categories />
            </Paper>
          </Grid>
        )}
        <Grid item xs>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <CatalogBreadcrumbs />
              <ControlPanel />
            </Grid>
            <Grid item>
              <ProductList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CatalogPage;
