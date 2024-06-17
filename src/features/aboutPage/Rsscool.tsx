import { Box, Link } from '@mui/material';

import rsschoolLogo from '../../assets/icons/rsschool.svg';
const RSSCHOOL_LINK = 'https://rs.school/';

function Rsschool(): JSX.Element {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2, mb: 1 }}
    >
      <Box>
        <Link href={RSSCHOOL_LINK} target="_blank">
          <img alt="github" src={rsschoolLogo} />
        </Link>
      </Box>
    </Box>
  );
}

export default Rsschool;
