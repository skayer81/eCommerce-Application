import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { anonymFlowAuth } from './api/clientService';
import RequireMain from './components/requireMain/RequireMain';
import Layout from './features/layout/Layout';

import './assets/fonts/stylesheet.css';
import './index.css';

const LoginPage = lazy(() => import('./features/loginPage/LoginPage'));
const RegistrationPage = lazy(() => import('./features/registrationPage/RegistrationPage'));
const MainPage = lazy(() => import('./features/mainPage/MainPage'));
const ErrorPage = lazy(() => import('./features/errorPage/ErrorPage'));

anonymFlowAuth();

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
        path: '/register',
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
