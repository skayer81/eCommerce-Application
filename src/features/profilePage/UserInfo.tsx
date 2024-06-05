import { Box } from '@mui/material';

import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import UserData from './UserData';

function UserInfo({ ...props }): JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 2 }}>
      <UserData {...props} />
      <UpdateEmail {...props} />
      <UpdatePassword {...props} />
    </Box>
  );
}

export default UserInfo;
