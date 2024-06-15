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
    <Grid container height={'200px'} spacing={2} sx={{ width: '40%' }}>
      {discount ? (
        <>
          <Grid height={'100px'} item xs={6}>
            <Typography lineHeight={1.2}>Total price without promocode</Typography>
          </Grid>
          <Grid height={'100px'} item xs={6}>
            <Typography color={'grey'} sx={{ textDecoration: 'line-through' }} variant="h5">
              {totalBeforeView}
            </Typography>
          </Grid>
        </>
      ) : (
        <div></div>
      )}

      <Grid height={'100px'} item xs={6}>
        <Typography lineHeight={1.2}>
          {discount ? `Total price with promocode` : `Total price`}
        </Typography>
      </Grid>
      <Grid height={'100px'} item xs={6}>
        <Typography color={'primary'} variant="h5">
          {totalView}
        </Typography>
      </Grid>
    </Grid>
  );
}
