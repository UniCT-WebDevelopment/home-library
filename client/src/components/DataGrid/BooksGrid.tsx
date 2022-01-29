import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationDialog from '../Dialog/DeleteConfirmationDialog';
import { useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import BookDialog from '../Dialog/BookDialog';
import './Booksgrid.scss';

export interface BooksGridProps {
  booksRows: any;
  title: string;
  otherColumns?: GridColDef[];
  onDeleteBookAction?: (bookId: number) => void;
  onUpdateBookAction?: () => void;
  // Indicate elements can be selected
  checkboxSelection?: boolean;
  onCheckboxSelected?: (ids: string[]) => void;
}

const BooksGrid = ({
  booksRows,
  title,
  otherColumns = [],
  onDeleteBookAction,
  onUpdateBookAction,
  checkboxSelection = false,
  onCheckboxSelected = null
}: BooksGridProps) => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [isUpdateBookOpen, setIsUpdateBookOpen] = useState<boolean>(false);

  const [rowSelected, setRowSelected] = useState<any>();

  const handleDialog = () => {
    setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen);
  };

  const handleUpdateDialog = () => {
    setIsUpdateBookOpen(!isUpdateBookOpen);
  };
  const isReadedCellRender = (params: GridRenderCellParams<any, any, any>) => {
    return (
      <Chip
        size="small"
        label={params.value ? 'Read' : ' To read'}
        color={params.value ? 'success' : 'error'}
      />
    );
  };

  const isBorrowCellRender = (params: GridRenderCellParams<any, any, any>) => {
    {
      return params.value && <Chip size="small" label="On loan" color="info" />;
    }
  };

  const isActionRender = (params: GridRenderCellParams<any, any, any>) => {
    return (
      <>
        <IconButton
          onClick={() => onRowClick(params)}
          color="primary"
          size="small"
        >
          <EditTwoToneIcon color="primary" fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => onDeleteIconClick(params)}
          color="inherit"
          size="small"
        >
          <DeleteIcon color="error" fontSize="small" />{' '}
        </IconButton>
      </>
    );
  };

  const onRowClick = (params: GridRenderCellParams<any, any, any>) => {
    setRowSelected(params.row);
    handleUpdateDialog();
  };
  const onDeleteIconClick = (params: GridRenderCellParams<any, any, any>) => {
    setRowSelected(params.row);
    handleDialog();
  };

  const onDeleteBook = () => {
    onDeleteBookAction(rowSelected._id);
    handleDialog();
  };

  const onUpdateBook = () => {
    if (onUpdateBookAction) {
      onUpdateBookAction();
      handleUpdateDialog();
    }
  };
  const columns: GridColDef[] = [
    { field: 'isbn', headerName: 'ISBN', width: 150 },
    { field: 'title', headerName: 'Title', width: 320 },
    { field: 'authors', headerName: 'Authors', width: 200 },
    {
      field: 'isRead',
      headerName: 'Read',
      width: 100,
      renderCell: isReadedCellRender
    },
    {
      field: 'isBorrow',
      headerName: 'Loan',
      width: 100,
      renderCell: isBorrowCellRender,
      hide: otherColumns && otherColumns.length > 0 ? true : false
    },
    {
      field: 'borrowPerson',
      headerName: 'Loan to',
      width: 100,
      hide: otherColumns && otherColumns.length > 0 ? true : false
    },

    ...otherColumns,
    {
      field: 'update',
      headerName: 'Actions',
      width: 130,
      headerAlign: 'center',
      renderCell: isActionRender
    }
  ];

  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        <div style={{ height: 600, width: '100%' }}>
          {booksRows && (
            <DataGrid
              checkboxSelection={checkboxSelection}
              getRowId={(row) => row._id}
              showCellRightBorder={false}
              showColumnRightBorder={false}
              onSelectionModelChange={onCheckboxSelected}
              rows={booksRows}
              columns={columns}
              components={{
                Toolbar: GridToolbar
              }}
            />
          )}
        </div>
      </CardContent>
      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmationOpen}
        onClose={handleDialog}
        onConfirm={onDeleteBook}
        title="Do you want to delete this book?"
        description={`This action will be delete "${rowSelected?.title}"  this book from your collection`}
      />
      <BookDialog
        title="Update Book"
        isDialogOpen={isUpdateBookOpen}
        onClose={handleUpdateDialog}
        onSave={onUpdateBook}
        bookSelected={rowSelected}
      ></BookDialog>
    </Card>
  );
};

export default BooksGrid;
