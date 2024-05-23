import { Link } from 'react-router-dom';

import { Box, Container, List, Typography } from '@mui/material';

import flower from '../../assets/images/flowers.jpg';
import { li, ul } from '../layout/Header/Styles';
import { accent, description, left, linkList, main, right, subtitle, title, topEl } from './Styles';
import { textContent } from './TextContent';

function MainPage(): JSX.Element {
  return (
    <Container component="section" sx={main}>
      <Box component="nav" sx={topEl}>
        <List component="ul" sx={[ul, linkList]}>
          <Typography component="li" sx={li}>
            <Link to="/">Main</Link>
          </Typography>
          <Typography component="li" sx={li}>
            <Link to="/login">Login</Link>
          </Typography>
          <Typography component="li" sx={li}>
            <Link to="/registration">Registration</Link>
          </Typography>
          <Typography component="li" sx={li}>
            <Link to="/profile">Profile</Link>
          </Typography>
          <Typography component="li" sx={li}>
            <Link to="/cart">Cart</Link>
          </Typography>
          <Typography component="li" sx={li}>
            <Link to="/about">About</Link>
          </Typography>
        </List>
      </Box>
      <Box component="div" sx={left}>
        <Typography component="span" sx={subtitle}>
          {textContent.subtitle}
        </Typography>
        <Typography component="h1" sx={title}>
          {textContent.titleOne}
          <Typography component="span" sx={accent}>
            {' '}
            {textContent.titleTwo}
          </Typography>
        </Typography>
        <Typography component="p" sx={description}>
          {textContent.description}
        </Typography>
      </Box>
      <Box component="div" sx={right}>
        <img alt="flowers" src={flower} />
      </Box>
    </Container>
  );
}

export default MainPage;
