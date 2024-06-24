import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function ErrorAlert(): JSX.Element {
  const [open, setOpen] = useState(true);

  const handleClose = (): void => {
    setOpen(false);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Something went wrong. Try again later...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
