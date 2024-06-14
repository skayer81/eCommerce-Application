import { Box, Grid, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import promoCodes from '@/config/promocodes';

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
          {promoCodes.map((promo) => (
            <Grid item key={promo.code} md={4} sm={6} xs={12}>
              <Stack alignItems="center" justifyContent="center" sx={{ mt: '20px' }}>
                <Typography
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                  textAlign="center"
                  variant={isMobile ? 'h5' : 'h4'}
                >
                  {promo.code}
                </Typography>
                <Typography
                  sx={{ mt: '5px' }}
                  textAlign="center"
                  variant={isMobile ? 'body1' : 'h6'}
                >
                  {promo.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

export default Promocodes;
