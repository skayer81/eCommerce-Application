import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserStore } from '@/stores/userStore';

export default function RequireMain({ children }: { children: JSX.Element }): JSX.Element {
  const { isLogin } = useUserStore();
  if (isLogin) {
    return <Navigate replace to="/" />;
  }
  return children;
}
