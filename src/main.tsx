import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { passwordTokenCache } from './api/TokenCache';
import { anonymFlowAuth, getCustomer, refreshFlowAuth } from './api/clientService';
import RequireMain from './components/requireMain/RequireMain';
import ErrorPage from './features/errorPage/ErrorPage';
import Layout from './features/layout/Layout';
import LoginPage from './features/loginPage/LoginPage';
import MainPage from './features/mainPage/MainPage';
import RegistrationPage from './features/registrationPage/RegistrationPage';

import './assets/fonts/stylesheet.css';
import './index.css';

export interface LoginState {
  state: {
    isLogin: boolean;
    userId: string;
  };
  version: number;
}

const state: LoginState = JSON.parse(localStorage.getItem('green-shop')!) as LoginState;
const isLogin = state.state.isLogin;

if (isLogin) {
  const { refreshToken } = passwordTokenCache.get();
  if (refreshToken) {
    const root = refreshFlowAuth(refreshToken, passwordTokenCache);
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
