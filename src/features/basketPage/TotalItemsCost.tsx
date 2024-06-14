import { Grid, Typography } from '@mui/material';

interface TotalPrice {
  discount: number;
  total: number;
  totalBefore: number;
}

export function TotalItemsCost({ total, totalBefore, discount }: TotalPrice): JSX.Element {
  const totalView = (total / 1000).toFixed(2) + '$';
  const totalBeforeView = (totalBefore / 1000).toFixed(2) + '$';

  return (
    // <Container>
    //   <Typography component="div" sx={{ lineHeight: '1.3' }} textAlign="right" variant="h4">
    //     total basket price:{(totalCost / 1000).toFixed(2) + '$'}
    //   </Typography>
    // </Container>
    <Grid container spacing={2} sx={{ width: '40%' }}>
      {discount ? (
        <>
          <Grid item xs={6}>
            <Typography lineHeight={1.2}>Total price without promocode</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color={'grey'} sx={{ textDecoration: 'line-through' }} variant="h5">
              {totalBeforeView}
            </Typography>
          </Grid>
        </>
      ) : (
        <div></div>
      )}

      <Grid item xs={6}>
        <Typography lineHeight={1.2}>
          {discount ? `Total price with promocode` : `Total price`}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography color={'primary'} variant="h5">
          {totalView}
        </Typography>
      </Grid>
    </Grid>
  );
}
