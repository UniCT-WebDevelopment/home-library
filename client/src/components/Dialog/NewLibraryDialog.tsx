import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import { NewLibraryForm } from 'src/interface/libraries';

interface NewLibraryDialogProps {
  isDialogOpen: boolean;
  onSave: (body: NewLibraryForm) => void;
  onClose: () => void;
  /**
   * LibraryName and isLibraryVisible will be
   * passed as props only if user is updating this fields
   */
  libraryName?: string;
  isLibraryShared?: boolean;
  /**
   * Help to understand if is an update of library or new library
   */
  isUpdate: boolean;
}

const NewLibraryDialog = ({
  isDialogOpen,
  onSave,
  onClose,
  libraryName = '',
  isLibraryShared = false,
  isUpdate
}: NewLibraryDialogProps) => {
  const [newLibrary, setNewLibraryText] = useState<string>(libraryName);
  const [isLibraryVisible, setIsLibraryVisible] =
    useState<boolean>(isLibraryShared);
  /**
   * Create new library / update  library
   */
  const handleSave = () => {
    onSave({
      name: newLibrary,
      shareable: isLibraryVisible
    });
  };

  /**
   * set library name
   * @param event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLibraryText(event.target.value);
  };

  const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLibraryVisible(event.target.checked);
  };

  const renderDialogTitle = (): string => {
    if (isUpdate) {
      return 'Update library';
    }

    return 'Create new library';
  };

  const renderUpdateDialogTitle = (): string => {
    if (isUpdate) {
      return '';
    }

    return 'To create new libraries, please enter name that you want here';
  };

  return (
    <Dialog open={isDialogOpen} maxWidth="sm" fullWidth>
      <DialogTitle>{renderDialogTitle()}</DialogTitle>

      <DialogContent>
        <DialogContentText>{renderUpdateDialogTitle()}</DialogContentText>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <TextField
              autoFocus
              margin="dense"
              id="library"
              label="Library name"
              type="text"
              fullWidth
              value={newLibrary}
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={12}>
            <FormControlLabel
              control={
                <Switch checked={isLibraryVisible} onChange={onSwitchChange} />
              }
              label="Make this library visible to other users!"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="success"
          disabled={newLibrary.length <= 0}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewLibraryDialog;
