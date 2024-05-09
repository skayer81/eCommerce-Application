import type { JSX } from 'react';
// import { Container } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export default function MainLayout(): JSX.Element {
  return (
    <div>
      <div>
        <Link to="/">Main</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign in</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
