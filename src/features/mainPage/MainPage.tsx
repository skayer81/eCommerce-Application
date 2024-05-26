import { Box, Container, Typography } from '@mui/material';

import flower from '../../assets/images/flowers.jpg';
import { accent, description, left, main, right, subtitle, title } from './Styles';
import { textContent } from './TextContent';

function MainPage(): JSX.Element {
  return (
    <Container component="section" sx={main}>
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
