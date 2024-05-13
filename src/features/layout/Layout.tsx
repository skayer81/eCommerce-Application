import type { JSX } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Box, Button, Stack, Typography } from '@mui/material';

import logo from '../../assets/icons/Logo.svg';
import { button, buttons, header, li, main, ul } from './Styles';

export default function Layout(): JSX.Element {
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
          <Button color="success" sx={button} variant="contained">
            <Link to="/login">Login</Link>
          </Button>
          <Button color="success" sx={button} variant="contained">
            <Link to="/register">Sign up</Link>
          </Button>
        </Box>
      </Box>
      <Box component="main" sx={main}>
        <Outlet />
      </Box>
    </>
  );
}
