import { Container, Typography } from '@mui/material';

export function TotalItemsCost({ totalCost }: { totalCost: number }): JSX.Element {
  return (
    <Container>
      <Typography component="div" sx={{ lineHeight: '1.3' }} textAlign="right" variant="h4">
        total basket price:{(totalCost / 1000).toFixed(2) + '$'}
      </Typography>
    </Container>
  );
}
