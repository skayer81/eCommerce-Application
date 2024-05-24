import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import { button } from '@/features/layout/Header/Styles';

interface AuthPanelProps {
  logout: () => void;
}

export default function AuthPanel({ logout }: AuthPanelProps): JSX.Element {
  return (
    <>
      <Button color="success" onClick={logout} sx={button} variant="contained">
        <Link to="/">Logout</Link>
      </Button>
    </>
  );
}
