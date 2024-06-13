import { Box, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import flower from '../../assets/images/flowers.jpg';
import { accent, description, left, main, right, subtitle, title } from './Styles';
import { textContent } from './TextContent';

function MainPage(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Paper component="section" sx={main}>
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
      </Paper>
      <Paper
        sx={{
          mt: '10px',
          p: '15px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
        }}
      >
        <Typography
          alignSelf={'center'}
          sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#3D3D3D' }}
          variant={isMobile ? 'h4' : 'h3'}
        >
          Promocodes
        </Typography>
        <Box
          alignSelf={'stretch'}
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}
        >
          <Stack alignItems={'center'} sx={{ mt: '20px' }}>
            <Typography
              color={'primary'}
              sx={{ fontWeight: 'bold' }}
              variant={isMobile ? 'h5' : 'h4'}
            >
              SUNNY-VIBES-5
            </Typography>
            <Typography sx={{ mt: '5px' }} variant={isMobile ? 'body1' : 'h6'}>
              Enjoy summer savings 5% on indoor plants!
            </Typography>
          </Stack>
          <Stack alignItems={'center'} sx={{ mt: '20px' }}>
            <Typography
              color={'primary'}
              sx={{ fontWeight: 'bold' }}
              variant={isMobile ? 'h5' : 'h4'}
            >
              SUMMER-BLOOM-10
            </Typography>
            <Typography sx={{ mt: '5px' }} variant={isMobile ? 'body1' : 'h6'}>
              Summer Plant Sale 10%: Enjoy the Blooms!
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </>
  );
}

export default MainPage;
