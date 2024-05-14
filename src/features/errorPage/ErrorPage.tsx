import { Box, Container, Typography } from '@mui/material';

import img404 from '../../assets/images/image-404.jpg';
import { imgContainer, main, title } from './Styles';

export default function ErrorPage(): JSX.Element {
  return (
    <Container component="section" sx={main}>
      <Typography sx={title}>Page not found</Typography>
      <Box component="div" sx={imgContainer}>
        <img alt="flowers" src={img404} />
      </Box>
    </Container>
  );
}
