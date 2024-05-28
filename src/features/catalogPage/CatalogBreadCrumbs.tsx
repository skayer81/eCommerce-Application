import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CatalogBreadcrumbs(): JSX.Element {
  return (
    <div onClick={handleClick} role="presentation" style={{ marginBottom: '10px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" underline="hover">
          MUI
        </Link>
        <Link color="inherit" href="/material-ui/getting-started/installation/" underline="hover">
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
  );
}
