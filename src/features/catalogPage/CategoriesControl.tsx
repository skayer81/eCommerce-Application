import { useState } from 'react';

import { Button, Container, Drawer } from '@mui/material';

import Categories from './Categories';

function CategoriesControl(): JSX.Element {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (openState: boolean) => () => {
    setOpen(openState);
  };

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          fontSize: '16px',
          textTransform: 'capitalize',
          backgroundColor: 'bgButtons.light',
          borderRadius: '10px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
        variant="outlined"
      >
        Categories
      </Button>
      <Drawer anchor="left" onClose={toggleDrawer(false)} open={open}>
        <Container onClick={toggleDrawer(false)} sx={{ height: '100%', pt: '15px' }}>
          <Categories />
        </Container>
      </Drawer>
    </div>
  );
}

export default CategoriesControl;
