import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Button } from '@mui/material';
import BookCard from 'src/components/BookCard/BookCard';
import { useEffect, useState } from 'react';
import PageHeader from 'src/components/PageHeader/PageHeader';
import { deleteBookAPI, getAllbooksAPI } from 'src/services/api';
import { BookCardInfo } from 'src/interface/Book';

import CustomTabs from 'src/components/Tabs/CustomTabs';
import BooksGrid from 'src/components/DataGrid/BooksGrid';
import { useNotification } from 'src/contexts/Notification';
import { Helmet } from 'react-helmet-async';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import BookDialog from 'src/components/Dialog/BookDialog';

const Books = () => {
  const [books, setBooks] = useState<BookCardInfo[]>([]);
  const [bookSelected, setBookSelected] = useState<BookCardInfo>();
  const [isUpdateBookDialogOpen, setIsUpdateBookDialogOpen] =
    useState<boolean>(false);
  const [isBooksLoading, setIsBooksLoading] = useState<boolean>(false);
  const notify = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBooks();
  }, []);
  const fetchAllBooks = () => {
    setIsBooksLoading(true);
    setBooks([]);
    getAllbooksAPI()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsBooksLoading(false);
      });
  };

  const onDeleteBook = (bookId: number) => {
    deleteBookAPI(bookId)
      .then(() => {
        notify.showNotification('Book has been deleted', 'success');
        fetchAllBooks();
      })
      .catch((error) => {
        console.error(error);
        notify.showNotification('Something went wrong', 'error');
      });
  };

  const onUpdateBook = () => {
    fetchAllBooks();
  };

  const onUpdateBookFromCard = () => {
    fetchAllBooks();
    handleUpdateDialog();
  };

  const renderBooksCards = () => {
    return books.map((book: BookCardInfo) => {
      return (
        <Grid item lg={6} xs={12} md={6} key={book._id}>
          {book && <BookCard item={book} onCardClick={onCardClick}></BookCard>}
        </Grid>
      );
    });
  };

  const onCardClick = (book: BookCardInfo) => {
    setBookSelected(book);
    handleUpdateDialog();
  };

  const renderCardsList = () => {
    return (
      <Grid
        container
        direction="row"
        justifyContent="start"
        alignItems="stretch"
        spacing={3}
      >
        {books && renderBooksCards()}
      </Grid>
    );
  };

  const onAddNewBookClick = () => {
    navigate('/libraries/add/book');
  };

  const handleUpdateDialog = () => {
    setIsUpdateBookDialogOpen(!isUpdateBookDialogOpen);
  };

  const renderGridList = () => {
    return books.length > 0 ? (
      <BooksGrid
        booksRows={books}
        title="All books"
        onDeleteBookAction={onDeleteBook}
        onUpdateBookAction={onUpdateBook}
        otherColumns={[
          {
            field: 'library',
            headerName: 'Library',
            width: 100
          },
          {
            field: 'shelf',
            headerName: 'Shelf',
            width: 200
          }
        ]}
      ></BooksGrid>
    ) : (
      <div></div>
    );
  };

  return (
    <>
      <Helmet>
        <title> Books List</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flex: 'wrap',
            paddingTop: 5
          }}
        >
          <PageHeader title="All you books are here" description="" />
          <Button
            variant="contained"
            size="medium"
            style={{ width: '20%' }}
            onClick={onAddNewBookClick}
            startIcon={<AddIcon />}
          >
            Add book
          </Button>
        </Box>{' '}
        <CustomTabs
          tabs={[
            { label: 'Grid', component: renderGridList() },
            { label: 'Cards', component: renderCardsList() }
          ]}
        ></CustomTabs>
        <BookDialog
          title="Update Book"
          isDialogOpen={isUpdateBookDialogOpen}
          onClose={handleUpdateDialog}
          onSave={onUpdateBookFromCard}
          //@ts-ignore
          bookSelected={bookSelected}
        ></BookDialog>
      </Container>
    </>
  );
};

export default Books;
