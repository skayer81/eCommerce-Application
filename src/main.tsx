import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { anonymFlowAuth, existingFlowAuth, getCustomer } from './api/clientService';
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
import getCookie from './utils/helpers/cookies.ts';

import './assets/fonts/stylesheet.css';
import './index.css';

const token = getCookie(PROJECT_KEY);
if (token !== null) {
  const accessToken = 'Bearer ' + token;
  const root = existingFlowAuth(accessToken);
  await getCustomer(root);
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
