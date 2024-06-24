//import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  handleClose: () => void;
  hasError: boolean;
  message: string;
  open: boolean;
};

export default function ModalMessage({ message, handleClose, open, hasError }: Props): JSX.Element {
  return (
    <Modal onClose={handleClose} open={open}>
      <Box sx={style}>
        <Typography component="h2" id="modal-modal-title" variant="h6">
          {hasError ? 'Error' : 'congratulations'}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {`${message} ${hasError ? 'click to continue' : ''}`}
        </Typography>
      </Box>
    </Modal>
  );
}
