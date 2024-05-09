import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// import ErrorPage from './features/errorPage/ErrorPage';
import Layout from './features/layout/Layout';
import LoginPage from './features/loginPage/LoginPage';
import MainPage from './features/mainPage/MainPage';
import RegistrationPage from './features/registrationPage/RegistrationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegistrationPage />,
      },
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
  // {
  //   path: '*',
  //   element: <ErrorPage />,
  // },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
