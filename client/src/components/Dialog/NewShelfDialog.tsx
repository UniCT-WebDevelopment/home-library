import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

interface NewShelfDialogProps {
  isDialogOpen: boolean;
  onSave: (shelfName: string) => void;
  onClose: () => void;
  shelfNameToUpdate: string;
  isUpdate: boolean;
}

const NewShelfDialog = ({
  isDialogOpen,
  onSave,
  onClose,
  shelfNameToUpdate,
  isUpdate
}: NewShelfDialogProps) => {
  const [shelfName, setShelfText] = useState<string>(shelfNameToUpdate);
  /**
   * Create new Shelf
   */
  const handleSave = () => {
    onSave(shelfName);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelfText(event.target.value);
  };

  const renderDialogTitle = (): string => {
    if (isUpdate) {
      return 'Update Shelf';
    }

    return 'Create new shelf';
  };

  const renderUpdateDialogTitle = (): string => {
    if (isUpdate) {
      return '';
    }

    return 'To create new shelf, please enter name that you want here';
  };

  return (
    <Dialog open={isDialogOpen} maxWidth="sm" fullWidth>
      <DialogTitle>{renderDialogTitle()}</DialogTitle>

      <DialogContent>
        <DialogContentText>{renderUpdateDialogTitle()}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="shelf"
          label="Shelf name"
          type="text"
          fullWidth
          value={shelfName}
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="success"
          disabled={shelfName && shelfName.length <= 0}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewShelfDialog;
