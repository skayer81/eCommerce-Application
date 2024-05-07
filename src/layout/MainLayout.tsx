import type { JSX } from 'react';
// import { Container } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export default function MainLayout(): JSX.Element {
  return (
    <div>
      <div>
        <Link to="/">Menu</Link>
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/register">Sign in</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
