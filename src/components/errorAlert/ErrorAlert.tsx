import { Container } from '@mui/material';
import Alert from '@mui/material/Alert';

export default function ErrorAlert(): JSX.Element {
  return (
    <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Alert severity="error" sx={{ width: '300px', mt: '100px' }}>
        Something went wrong. Try again later...
      </Alert>
    </Container>
  );
}
