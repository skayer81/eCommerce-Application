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
    <Grid alignItems={'center'} container spacing={2} sx={{ width: '100%' }}>
      {discount ? (
        <>
          <Grid item xs={6}>
            <Typography fontWeight={500} lineHeight={1.2}>
              Total price without promocode
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              color={'grey'}
              fontWeight={500}
              sx={{ textDecoration: 'line-through' }}
              textAlign={'right'}
              variant="h5"
            >
              {totalBeforeView}
            </Typography>
          </Grid>
        </>
      ) : (
        <div></div>
      )}

      <Grid item xs={7}>
        <Typography fontWeight={500} lineHeight={1.2}>
          {discount ? `Total price with promocode` : `Total price`}
        </Typography>
      </Grid>
      <Grid item sx={{ padding: 0 }} xs={5}>
        <Typography color={'primary'} fontWeight={500} textAlign={'right'} variant="h5">
          {totalView}
        </Typography>
      </Grid>
    </Grid>
  );
}
