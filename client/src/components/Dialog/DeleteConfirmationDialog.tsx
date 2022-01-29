import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DeleteConfirmationDialogProps {
  title: string;
  description: string;

  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}

const DeleteConfirmationDialog = ({
  title,
  description,
  onClose,
  onConfirm,
  isOpen
}: DeleteConfirmationDialogProps) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="error"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteConfirmationDialog;
