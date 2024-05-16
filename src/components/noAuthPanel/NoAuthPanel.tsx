import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import { button } from '@/features/layout/Styles';

export default function NoAuthPanel(): JSX.Element {
  return (
    <>
      <Button color="success" sx={button} variant="contained">
        <Link to="/login">Login</Link>
      </Button>
      <Button color="success" sx={button} variant="contained">
        <Link to="/register">Sign up</Link>
      </Button>
    </>
  );
}
