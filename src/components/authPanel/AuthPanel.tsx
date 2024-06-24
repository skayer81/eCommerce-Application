import { Link } from 'react-router-dom';

import { AccountCircle } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import { button } from '@/features/layout/Header/Styles';

interface AuthPanelProps {
  logout: () => void;
}

export default function AuthPanel({ logout }: AuthPanelProps): JSX.Element {
  return (
    <>
      <IconButton component={Link} to="/profile">
        <AccountCircle color="primary" fontSize="large" />
      </IconButton>
      <Button color="primary" onClick={logout} sx={button} variant="contained">
        <Link to="/">Log out</Link>
      </Button>
    </>
  );
}
