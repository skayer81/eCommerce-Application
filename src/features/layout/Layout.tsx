import type { JSX } from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import Header from './Header/Header';
import { main } from './Header/Styles';

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <Box component="main" sx={main}>
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <Outlet />
        </Suspense>
      </Box>
    </>
  );
}
