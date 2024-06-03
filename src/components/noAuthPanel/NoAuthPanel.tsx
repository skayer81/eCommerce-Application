import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import { button } from '@/features/layout/Header/Styles';

export default function NoAuthPanel(): JSX.Element {
  return (
    <>
      <Button color="primary" sx={button} variant="contained">
        <Link to="/login">Log in</Link>
      </Button>
      <Button color="primary" sx={button} variant="contained">
        <Link to="/registration">Sign up</Link>
      </Button>
    </>
  );
}
