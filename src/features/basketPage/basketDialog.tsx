import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  isOpen: boolean;
  onClickNOButton: () => void;
  onClickYESButton: () => void;
};

export default function BasketDialog({
  isOpen,
  onClickNOButton,
  onClickYESButton,
}: Props): JSX.Element {
  return (
    <Dialog open={isOpen}>
      <DialogTitle id="alert-dialog-title">{'the basket wants to ask this:'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure that you want to remove from not everything that was added with such
          difficulty?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickNOButton}>no</Button>
        <Button onClick={onClickYESButton}>yes</Button>
      </DialogActions>
    </Dialog>
  );
}
