import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// import AuthLayout from './layout/AuthLayout.tsx';
import MainLayout from './layout/MainLayout.tsx';
// import Cart from './pages/Cart.tsx';
import Error from './pages/Error.tsx';
// import Login from './pages/Login.tsx';
import LoginPage from './pages/LoginPage.tsx';
import Main from './pages/Main.tsx';
import Register from './pages/Register.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/',
        element: <Main />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);

// import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
