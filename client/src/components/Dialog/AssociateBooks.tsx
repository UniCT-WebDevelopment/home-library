import {
  Box,
  Button,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getBooksWithoutShelfAPI } from 'src/services/api';
import { Book } from 'src/interface/Book';
import { Shelf } from 'src/interface/shelves';
import DeleteIcon from '@mui/icons-material/Delete';
interface AssociateBooksProps {
  onSave: (booksIds: string[]) => void;
  shelfSelected: Shelf;
  onDeleteAssociationClick: () => void;
  isDeleteButtonDisabled: boolean;
}

const columns: GridColDef[] = [
  { field: 'isbn', headerName: 'ISBN', width: 200 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'authors', headerName: 'Authors', width: 250 }
];

const AssociateBooks = ({
  onSave,
  shelfSelected,
  onDeleteAssociationClick,
  isDeleteButtonDisabled
}: AssociateBooksProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>();
  const [booksSelected, setBooksSelected] = useState();
  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  useEffect(() => {
    if (isDialogOpen) {
      fetchBooksNotAssociated();
    }
  }, [isDialogOpen]);

  const fetchBooksNotAssociated = () => {
    getBooksWithoutShelfAPI()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSave = () => {
    onSave(booksSelected);
    handleDialog();
  };

  const onSelectionChange = (ids) => {
    setBooksSelected(ids);
  };

  const renderHederBooks = () => {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          sx={{ mt: { xs: 2, md: 0 }, mr: 1 }}
          variant="contained"
          color="error"
          onClick={onDeleteAssociationClick}
          disabled={isDeleteButtonDisabled}
          startIcon={<DeleteIcon fontSize="small" />}
        >
          Remove Books from shelf
        </Button>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleDialog}
        >
          Associate Books
        </Button>
      </Box>
    );
  };

  const renderDialog = () => {
    return (
      <Dialog open={isDialogOpen} maxWidth="lg" fullWidth>
        <DialogTitle>Associate books for {shelfSelected.name}</DialogTitle>
        <DialogContent>
          {books && (
            <div style={{ height: 600, width: '100%' }}>
              <DataGrid
                checkboxSelection
                getRowId={(row) => row._id}
                showCellRightBorder={false}
                onSelectionModelChange={onSelectionChange}
                showColumnRightBorder={false}
                rows={books}
                columns={columns}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="success">
            Associate
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        paddingTop: 2,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end'
      }}
    >
      {renderHederBooks()}
      {isDialogOpen && renderDialog()}
    </Box>
  );
};

export default AssociateBooks;
