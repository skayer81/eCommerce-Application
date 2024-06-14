import { Box, Grid, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

function Promocodes(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
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
        alignSelf="stretch"
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item md={4} sm={6} xs={12}>
            <Stack alignItems="center" justifyContent="center" sx={{ mt: '20px' }}>
              <Typography
                color="primary"
                sx={{ fontWeight: 'bold' }}
                variant={isMobile ? 'h5' : 'h4'}
              >
                SUNNY-VIBES-5
              </Typography>
              <Typography sx={{ mt: '5px' }} textAlign="center" variant={isMobile ? 'body1' : 'h6'}>
                Enjoy summer savings 5% on plants!
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Stack alignItems="center" justifyContent="center" sx={{ mt: '20px' }}>
              <Typography
                color="primary"
                sx={{ fontWeight: 'bold' }}
                textAlign="center"
                variant={isMobile ? 'h5' : 'h4'}
              >
                SUMMER-BLOOM-10
              </Typography>
              <Typography sx={{ mt: '5px' }} textAlign="center" variant={isMobile ? 'body1' : 'h6'}>
                Summer Plant Sale 10%: Enjoy the Blooms!
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Stack alignItems="center" justifyContent="center" sx={{ mt: '20px' }}>
              <Typography
                color="primary"
                sx={{ fontWeight: 'bold' }}
                variant={isMobile ? 'h5' : 'h4'}
              >
                ALOE-20-OFF
              </Typography>
              <Typography sx={{ mt: '5px' }} textAlign="center" variant={isMobile ? 'body1' : 'h6'}>
                Get 20% off Aloe plants!
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default Promocodes;
