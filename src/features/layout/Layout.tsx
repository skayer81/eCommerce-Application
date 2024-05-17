import type { JSX } from 'react';
import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

import AuthPanel from '@/components/authPanel/AuthPanel';
import NoAuthPanel from '@/components/noAuthPanel/NoAuthPanel';
import { useUserStore } from '@/stores/userStore';

import logo from '../../assets/icons/Logo.svg';
import { buttons, header, li, main, ul } from './Styles';

export default function Layout(): JSX.Element {
  const { isLogin } = useUserStore();

  return (
    <>
      <Box component="header" sx={header}>
        <Link to="/">
          <img alt="logo" src={logo} />
        </Link>
        <Box component="nav">
          <Stack component="ul" sx={ul}>
            <Typography component="li" sx={li}>
              <Link to="/">Main</Link>
            </Typography>
          </Stack>
        </Box>
        <Box component="div" sx={buttons}>
          {isLogin ? <AuthPanel /> : <NoAuthPanel />}
        </Box>
      </Box>
      <Box component="main" sx={main}>
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <Outlet />
        </Suspense>
      </Box>
    </>
  );
}
