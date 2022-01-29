import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { Book } from 'src/interface/Book';
import FormBook from '../Form/Book.form';
import ClearIcon from '@mui/icons-material/Clear';

interface BookDialogProps {
  isDialogOpen: boolean;
  onSave: () => void;
  onClose: () => void;
  title: string;
  bookSelected: Book;
}

const BookDialog = ({
  isDialogOpen,
  onSave,
  onClose,
  title,
  bookSelected
}: BookDialogProps) => {
  const DialogTitleRender = () => {
    return (
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <>{title}</>
          <IconButton onClick={onClose} size="small">
            <ClearIcon></ClearIcon>
          </IconButton>
        </Box>
      </DialogTitle>
    );
  };
  return (
    <Dialog open={isDialogOpen} maxWidth="lg" fullWidth>
      {DialogTitleRender()}
      <DialogContent>
        {bookSelected && (
          <FormBook
            isBookUpdate={true}
            title=""
            isBookFromIsbn={true}
            bookForm={bookSelected}
            onCompleteSaveAction={onSave}
          ></FormBook>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookDialog;
