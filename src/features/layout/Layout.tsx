import type { JSX } from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

// import { anonymFlowAuth, createAnonymBasket, existingFlowAuth } from '@/api/clientService';
// import { PROJECT_KEY } from '@/config/clientConfig';
// import getCookie from '@/utils/helpers/cookies';

import Header from './Header/Header';
import { main } from './Header/Styles';
// import { useMutation } from '@tanstack/react-query';
// import { ByProjectKeyRequestBuilder, Cart } from '@commercetools/platform-sdk';

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
