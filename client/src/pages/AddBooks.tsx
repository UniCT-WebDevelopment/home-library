import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Container, Grid, TextField } from '@mui/material';
import PageHeader from 'src/components/PageHeader/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { getBookInfoByIsbnAPI } from 'src/services/api';
import { useState } from 'react';
import AddBookCard from 'src/components/BookCard/AddBookCard';
import { mapBooksInformation } from 'src/utils/book';
import { useNotification } from 'src/contexts/Notification';
import { LoadingButton } from '@mui/lab';
import CustomTabs from 'src/components/Tabs/CustomTabs';
import { Helmet } from 'react-helmet-async';
import FormBook from '../components/Form/Book.form';
import AddBookExcel from './AddBooksFromExcel';
const AddBooks = () => {
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  const [isbn, setIsbn] = useState<string>('');
  const [newBookInfo, setBookInfo] = useState<any>();

  const notify = useNotification();

  /**
   * This method allow to retrieve books info via its ISBN
   */
  const onSearchLibraryViaISBN = () => {
    setIsSearchLoading(true);

    if (newBookInfo) {
      setBookInfo(null);
    }
    getBookInfoByIsbnAPI(isbn)
      .then((response) => {
        setBookInfo(mapBooksInformation(response.data[0].volumeInfo));
      })
      .catch((error) => {
        const errMessage = error?.response?.data?.message;
        notify.showNotification(errMessage, 'error');
        console.error(error);
      })
      .finally(() => {
        setIsSearchLoading(false);
      });
  };

  const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.target.value);
  };

  const resetFields = () => {
    setIsbn('');
    setBookInfo(null);
  };

  const renderWithIsbn = () => {
    return (
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item lg={12} xs={12}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <TextField
                  style={{ marginRight: 10 }}
                  fullWidth
                  size="small"
                  required
                  onChange={handleIsbnChange}
                  value={isbn}
                  placeholder="Put here ISBN of book that you want to find"
                  label="ISBN"
                  defaultValue=""
                />
                <LoadingButton
                  loading={isSearchLoading}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={onSearchLibraryViaISBN}
                >
                  Search
                </LoadingButton>{' '}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {newBookInfo && (
          <>
            <Grid item lg={12} xs={12}>
              <AddBookCard item={newBookInfo} />
            </Grid>
            <Grid item lg={12} xs={12}>
              <FormBook
                title="Complete Book's information"
                isBookFromIsbn={true}
                onCompleteSaveAction={resetFields}
                bookForm={{
                  isbn: isbn,
                  title: newBookInfo.title,
                  authors: newBookInfo.authors,
                  thumbnail: newBookInfo.thumbnail,
                  isRead: false,
                  isBorrow: false,
                  borrowPerson: ''
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
    );
  };

  const renderManually = () => {
    return <FormBook title="Add new Book" />;
  };

  const renderAddFromExcel = () => {
    return <AddBookExcel />;
  };

  return (
    <>
      <Helmet>
        <title> Add new book</title>
      </Helmet>
      <Container
        sx={{
          marginBottom: 10
        }}
      >
        <PageTitleWrapper>
          <PageHeader
            title="Add Book"
            description="Types ISBN of books and add book into your library"
          />
        </PageTitleWrapper>
        <CustomTabs
          tabs={[
            {
              label: 'Add with ISBN',
              component: renderWithIsbn()
            },
            {
              label: 'Add manually',
              component: renderManually()
            },
            {
              label: 'Import excel',
              component: renderAddFromExcel()
            }
          ]}
        ></CustomTabs>
      </Container>
    </>
  );
};

export default AddBooks;
