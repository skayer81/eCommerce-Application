import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import { button } from '@/features/layout/Styles';
import { useUserStore } from '@/stores/userStore';

export default function NoAuthPanel(): JSX.Element {
  const { logoutUserInStore } = useUserStore();

  return (
    <>
      <Button color="success" onClick={logoutUserInStore} sx={button} variant="contained">
        <Link to="/">Logout</Link>
      </Button>
    </>
  );
}
