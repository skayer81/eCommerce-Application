import { CircularProgress } from '@mui/material';

function Loader(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default Loader;
