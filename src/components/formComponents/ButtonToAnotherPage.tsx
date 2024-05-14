import { Link as LinkRouter } from 'react-router-dom';

import { Link, Stack, Typography } from '@mui/material';

type ButtonToAnotherPageProps = {
  addressPage: string;
  textOnButton: string;
  title: string;
};

function ButtonToAnotherPage({
  title,
  textOnButton,
  addressPage,
}: ButtonToAnotherPageProps): JSX.Element {
  return (
    <Stack direction="row" spacing={1} sx={{ typography: 'body1' }}>
      <Typography>{title}</Typography>
      <Link component={LinkRouter} to={addressPage}>
        {textOnButton}
      </Link>
    </Stack>
  );
}

export default ButtonToAnotherPage;
