import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { anonymFlowAuth } from '@/api/clientService';
import AuthPanel from '@/components/authPanel/AuthPanel';
import NoAuthPanel from '@/components/noAuthPanel/NoAuthPanel';
import { useUserStore } from '@/stores/userStore';

import logo from '../../../assets/icons/Logo.svg';
import { buttons, header, li, ul } from './Styles';
// import { PROJECT_KEY } from '@/config/clientConfig';
// import { deleteCookie } from '@/utils/helpers/cookies';
// import { TokenCache } from '@commercetools/sdk-client-v2';
import { tokenCache } from '@/api/tokenCache';

export default function Header(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isLogin, logoutUserInStore } = useUserStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const logout = (): void => {
    console.log('logout');
    logoutUserInStore();
    anonymFlowAuth();
    tokenCache.deleteToken();

    // localStorage.removeItem(PROJECT_KEY);
    // deleteCookie(PROJECT_KEY);
  };

  const menuItems = [
    { text: 'Main', path: '/' },
    { text: 'Login', path: '/login' },
    { text: 'Sign up', path: '/registration' },
  ];

  const DrawerList = (
    <Box
      onClick={toggleDrawer(false)}
      role="presentation"
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {menuItems.map((item, index) => (
          <ListItemButton
            component={Link}
            key={index}
            sx={{
              color: location.pathname === item.path ? '#2e7d32' : 'inherit',
            }}
            to={item.path}
          >
            <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '25px' }} />
          </ListItemButton>
        ))}
        {isLogin ? (
          <ListItemButton component={Link} onClick={logout} to="/">
            <ListItemText primary={'Logout'} primaryTypographyProps={{ fontSize: '25px' }} />
          </ListItemButton>
        ) : (
          ''
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Box component="header" sx={header}>
        <Link to="/">
          <img alt="logo" src={logo} />
        </Link>
        {!isMobile ? (
          <>
            <Box component="nav">
              <List component="ul" sx={ul}>
                <Typography component="li" sx={li}>
                  <Link to="/">Main</Link>
                </Typography>
              </List>
            </Box>
            <Box component="div" sx={buttons}>
              <NoAuthPanel />
              {isLogin ? <AuthPanel logout={logout} /> : ''}
            </Box>
          </>
        ) : (
          <IconButton aria-label="menu" color="inherit" edge="end" onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ fontSize: '40px' }} />
          </IconButton>
        )}
        <Drawer anchor="right" onClose={toggleDrawer(false)} open={drawerOpen}>
          {DrawerList}
        </Drawer>
      </Box>
    </>
  );
}
