import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  anonymFlowAuth,
  createAnonymBasket,
  existingFlowAuth,
  getActiveBasket,
} from './api/clientService';
import RequireMain from './components/requireMain/RequireMain';
import { PROJECT_KEY } from './config/clientConfig.ts';
import theme from './config/theme.ts';
import { AboutPageLazy as AboutPage } from './features/aboutPage/AboutPageLazy.tsx';
import { BasketPage } from './features/basketPage/basketPage.tsx';
import { CatalogPageLazy as CatalogPage } from './features/catalogPage/CatalogPageLazy.tsx';
import { ErrorPageLazy as ErrorPage } from './features/errorPage/ErrorPageLazy.tsx';
import Layout from './features/layout/Layout';
import { LoginPageLazy as LoginPage } from './features/loginPage/LoginPageLazy.tsx';
import { MainPageLazy as MainPage } from './features/mainPage/MainPageLazy.tsx';
import ProductPage from './features/productPage/ProductPage.tsx';
import ProfilePage from './features/profilePage/ProfilePage.tsx';
import RedirectToMain from './features/profilePage/RedirectToMain.tsx';
import { RegistrationPageLazy as RegistrationPage } from './features/registrationPage/RegistrationPageLazy.tsx';
import {
  addBasketIDInStore,
  updateCurrentVersion,
  updateNumbOfItems,
} from './stores/basketStore.ts';
import { logoutUserInStore } from './stores/userStore.ts';
import getCookie from './utils/helpers/cookies.ts';

import './assets/fonts/stylesheet.css';
import './index.css';

const token = getCookie(PROJECT_KEY);
if (token !== null) {
  const accessToken = 'Bearer ' + token;
  const root = existingFlowAuth(accessToken);
  getActiveBasket(root)
    .then(({ body }) => {
      addBasketIDInStore(body.id);
      updateCurrentVersion(body.version);
      if (body.totalLineItemQuantity) {
        updateNumbOfItems(body.totalLineItemQuantity);
      }
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  logoutUserInStore();
  const root = anonymFlowAuth();
  createAnonymBasket(root)
    .then((data) => {
      addBasketIDInStore(data.body.id);
      updateCurrentVersion(data.body.version);
    })
    .catch((error) => {
      console.error(error);
    });
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: (
          <RequireMain>
            <LoginPage />
          </RequireMain>
        ),
      },
      {
        path: '/registration',
        element: (
          <RequireMain>
            <RegistrationPage />
          </RequireMain>
        ),
      },
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/catalog',
        element: <CatalogPage />,
      },
      {
        path: '/profile',
        element: (
          <RedirectToMain>
            <ProfilePage />
          </RedirectToMain>
        ),
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/product/:key',
        element: <ProductPage />,
      },
      {
        path: '/basket',
        element: <BasketPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
