import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardHeader,
  Divider,
  CardContent,
  IconButton,
  Link
} from '@mui/material';
import { Input } from '../components/Input/Input';
import { read, utils } from 'xlsx';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { addBooksListAPI } from 'src/services/api';
import { useNotification } from 'src/contexts/Notification';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseURL } from 'src/services/axiosConfig';

const AddBookExcel = () => {
  const isActionRender = (params: GridRenderCellParams<any, any, any>) => {
    return (
      <>
        <IconButton
          onClick={() => onDeleteClick(params.row)}
          color="inherit"
          size="small"
        >
          <DeleteIcon color="error" fontSize="small" />{' '}
        </IconButton>
      </>
    );
  };

  const columns: GridColDef[] = [
    { field: 'ISBN', headerName: 'ISBN', width: 180 },
    { field: 'Title', headerName: 'Title', width: 250 },
    { field: 'Authors', headerName: 'Authors', width: 300 },
    {
      field: 'Description',
      headerName: 'Description',
      width: 350
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 100,
      renderCell: isActionRender
    }
  ];

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const notify = useNotification();

  const onDeleteClick = (row: any) => {
    const index = books.findIndex((item) => item.__rowNum__ == row.__rowNum__);
    setBooks([...books.slice(0, index), ...books.slice(index + 1)]);
  };

  const onUploadExcelFile = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      // A handler for the FileReader.load_event event.
      //  This event is triggered each time the reading operation is successfully completed.
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonBooks = utils.sheet_to_json(worksheet);
        setBooks(jsonBooks);
      };
    }
  };

  const onInsertBookClick = () => {
    setIsLoading(true);
    addBooksListAPI(books)
      .then(() => {
        notify.showNotification('Books has been added', 'success');
        setBooks(null);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const renderExcelHeader = () => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Import excel
          </Typography>
          <Typography variant="subtitle2">
            Import your books through excel file (you can downoload template
            from{' '}
            <Link href={`${baseURL}templates/home_library_template.xlsx`}>
              Here
            </Link>
            )
          </Typography>
        </Grid>
        <Grid item>
          <label htmlFor="contained-button-file">
            <Input
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              id="contained-button-file"
              type="file"
              //@ts-ignore
              onChange={onUploadExcelFile}
              onClick={(event: any) => {
                event.target.value = null;
              }}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
            <LoadingButton
              disabled={books && books.length <= 0}
              loading={isLoading}
              sx={{ marginLeft: 2 }}
              variant="contained"
              onClick={onInsertBookClick}
            >
              Confirm and insert books
            </LoadingButton>
          </label>
        </Grid>
      </Grid>
    );
  };
  return (
    <Box>
      {renderExcelHeader()}
      <Box
        sx={{
          marginTop: 2
        }}
      >
        {books && books.length > 0 && (
          <Card>
            <CardHeader title="Books imported from excel" />
            <Divider />
            <CardContent>
              <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                  getRowId={(row) => row.__rowNum__}
                  rows={books}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default AddBookExcel;
