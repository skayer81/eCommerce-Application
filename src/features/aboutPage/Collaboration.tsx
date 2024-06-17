import { Box, Typography } from '@mui/material';

function Collaboration(): JSX.Element {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2, mb: 6 }}
    >
      <Typography sx={{ fontSize: '36px', color: 'primary.main' }}>About us</Typography>
      <Typography sx={{ fontSize: '20px' }}>
        Through collaborative efforts, the team successfully developed an online store, highlighting
        their adeptness in overcoming technical challenges, implementing creative solutions, and
        achieving project goals. Our effective communication and shared vision were instrumental in
        navigating complexities and delivering a remarkable final project.
      </Typography>
    </Box>
  );
}

export default Collaboration;
