import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { TokenStore } from '@commercetools/sdk-client-v2';

import { anonymFlowAuth, getCustomer, refreshFlowAuth } from './api/clientService';
import { tokenCache } from './api/tokenCache.ts';
import RequireMain from './components/requireMain/RequireMain';
import { PROJECT_KEY } from './config/clientConfig.ts';
import AboutPage from './features/aboutPage/AboutPage.tsx';
import CartPage from './features/cartPage/CartPage.tsx';
import { ErrorPageLazy as ErrorPage } from './features/errorPage/ErrorPageLazy.tsx';
import Layout from './features/layout/Layout';
import { LoginPageLazy as LoginPage } from './features/loginPage/LoginPageLazy.tsx';
import { MainPageLazy as MainPage } from './features/mainPage/MainPageLazy.tsx';
import ProfilePage from './features/profilePage/ProfilePage.tsx';
import { RegistrationPageLazy as RegistrationPage } from './features/registrationPage/RegistrationPageLazy.tsx';

import './assets/fonts/stylesheet.css';
import './index.css';

const tokenData = localStorage.getItem(PROJECT_KEY);
if (tokenData) {
  const tokenStore = JSON.parse(tokenData) as TokenStore;
  if (tokenStore.refreshToken) {
    console.log('time=', tokenStore.expirationTime);
    console.log('refreshtoken=', tokenStore.refreshToken);
    const root = refreshFlowAuth(tokenStore.refreshToken, tokenCache);
    await getCustomer(root);
  }
} else {
  anonymFlowAuth();
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
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
