import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

// import { anonymFlowAuth } from '@/api/clientService';
import { button } from '@/features/layout/Header/Styles';
// import { useUserStore } from '@/stores/userStore';

interface AuthPanelProps {
  logout: () => void;
}

export default function AuthPanel({ logout }: AuthPanelProps): JSX.Element {
  // const { logoutUserInStore } = useUserStore();

  // const logout = (): void => {
  //   logoutUserInStore();
  //   anonymFlowAuth();
  // };

  return (
    <>
      <Button color="success" onClick={logout} sx={button} variant="contained">
        <Link to="/">Logout</Link>
      </Button>
    </>
  );
}
