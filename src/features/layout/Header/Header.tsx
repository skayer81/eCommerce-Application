import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AccountCircle, Close, Menu } from '@mui/icons-material';
import { Box, Drawer, IconButton, List, ListItemButton, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { anonymFlowAuth, existingFlowAuth, getUserInfo } from '@/api/clientService';
import { tokenCache } from '@/api/tokenCache';
import AuthPanel from '@/components/authPanel/AuthPanel';
import NoAuthPanel from '@/components/noAuthPanel/NoAuthPanel';
import { PROJECT_KEY } from '@/config/clientConfig';
import { useCustomerStore } from '@/features/profilePage/Types';
import { useUserStore } from '@/stores/userStore';
import getCookie from '@/utils/helpers/cookies';

import logo from '../../../assets/icons/Logo.svg';
import { buttons, header, ul } from './Styles';

export default function Header(): JSX.Element {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { isLogin, logoutUserInStore } = useUserStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { deleteUserFromStore, saveUserInStore } = useCustomerStore();
  const location = useLocation();

  useEffect(() => {
    if (!isTablet) {
      setDrawerOpen(false);
    }
  }, [isTablet]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const logout = (): void => {
    logoutUserInStore();
    deleteUserFromStore();
    anonymFlowAuth();
    tokenCache.deleteToken();
  };

  const getUser = async (): Promise<void> => {
    const token = getCookie(PROJECT_KEY);
    if (token !== null) {
      const accessToken = 'Bearer ' + token;
      const root = existingFlowAuth(accessToken);
      await getUserInfo(root, saveUserInStore);
    }
  };

  const menuItems = [
    { text: 'Main', path: '/' },
    { text: 'Catalog', path: '/catalog' },
    { text: 'About', path: '/about' },
    { text: 'Cart', path: '/cart' },
  ];

  const DrawerList = (
    <>
      <IconButton
        onClick={toggleDrawer(false)}
        style={{ top: '10px', right: '10px', position: 'absolute' }}
      >
        <Close />
      </IconButton>
      <Box
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
          onClick={toggleDrawer(false)}
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
                color: location.pathname === item.path ? 'primary.main' : 'inherit',
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
            <>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary={'Log in'} primaryTypographyProps={{ fontSize: '25px' }} />
              </ListItemButton>
              <ListItemButton component={Link} to="/registration">
                <ListItemText primary={'Sign up'} primaryTypographyProps={{ fontSize: '25px' }} />
              </ListItemButton>
            </>
          )}
        </List>
      </Box>
    </>
  );

  return (
    <>
      <Box component="header" sx={header}>
        <Link to="/">
          <img alt="logo" src={logo} />
        </Link>
        {!isTablet ? (
          <>
            <Box component="nav" sx={{ maxWidth: '500px', width: '100%' }}>
              <List component="ul" sx={ul}>
                {menuItems.map((item, index) => (
                  <ListItemButton
                    component={Link}
                    key={index}
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'inherit',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                    to={item.path}
                  >
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{ fontSize: '18px', fontWeight: '500' }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
            <Box component="div" sx={buttons}>
              {isLogin ? (
                <AuthPanel
                  getUser={() => {
                    (async () => {
                      await getUser();
                    })().catch(console.error);
                  }}
                  logout={logout}
                />
              ) : (
                <NoAuthPanel />
              )}
            </Box>
          </>
        ) : (
          <Box>
            {isLogin ? (
              <IconButton component={Link} to="/profile">
                <AccountCircle color="primary" fontSize="large" />
              </IconButton>
            ) : (
              ''
            )}
            <IconButton aria-label="menu" color="primary" edge="end" onClick={toggleDrawer(true)}>
              <Menu sx={{ fontSize: '40px' }} />
            </IconButton>
          </Box>
        )}
        <Drawer anchor="right" onClose={toggleDrawer(false)} open={drawerOpen}>
          {DrawerList}
        </Drawer>
      </Box>
    </>
  );
}
