import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CatalogBreadcrumbs(): JSX.Element {
  return (
    <div onClick={handleClick} role="presentation" style={{ marginBottom: '10px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Catalog
        </Typography>
        <Typography
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Core
        </Typography>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
  );
}
