import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Close, Menu } from '@mui/icons-material';
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
import { tokenCache } from '@/api/tokenCache';
import AuthPanel from '@/components/authPanel/AuthPanel';
import NoAuthPanel from '@/components/noAuthPanel/NoAuthPanel';
import { useUserStore } from '@/stores/userStore';

import logo from '../../../assets/icons/Logo.svg';
import { buttons, header, li, ul } from './Styles';

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
    logoutUserInStore();
    anonymFlowAuth();
    tokenCache.deleteToken();
  };

  const menuItems = [
    { text: 'Main', path: '/' },
    { text: 'Catalog', path: '/catalog' },
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
        {!isMobile ? (
          <>
            <Box component="nav">
              <List component="ul" sx={ul}>
                <Typography component="li" sx={li}>
                  <Link to="/">Main</Link>
                </Typography>
                <Typography component="li" sx={li}>
                  <Link to="/catalog">Catalog</Link>
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
            <Menu sx={{ fontSize: '40px' }} />
          </IconButton>
        )}
        <Drawer anchor="right" onClose={toggleDrawer(false)} open={drawerOpen}>
          {DrawerList}
        </Drawer>
      </Box>
    </>
  );
}
