import type { JSX } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AuthLayout(): JSX.Element {
  return (
    <div>
      <div>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
