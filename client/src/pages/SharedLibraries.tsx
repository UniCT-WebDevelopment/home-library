import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { BookCardInfo, SharedBook } from 'src/interface/Book';
import BookCard from 'src/components/BookCard/BookCard';
import PageHeader from 'src/components/PageHeader/PageHeader';
import { useParams } from 'react-router';
import { getSharedBooksAPI } from 'src/services/api';
import { Box } from '@mui/system';

const SharedLibraries = () => {
  const [libraryInfo, setLibraryInfo] = useState<SharedBook>();
  const [isBookListLoading, setIsBookLoading] = useState<boolean>(false);
  const { libraryId } = useParams();

  useEffect(() => {
    fetchSharedBooks();
  }, []);

  const fetchSharedBooks = () => {
    setIsBookLoading(true);
    getSharedBooksAPI(libraryId)
      .then((response) => {
        setLibraryInfo(response.data);
      })
      .catch((error) => {
        setLibraryInfo(null);
        console.error(error);
      })
      .finally(() => {
        setIsBookLoading(false);
      });
  };

  const sharedLibraryRender = () => {
    return (
      <Grid container padding={2} spacing={2} rowSpacing={2}>
        <Grid item lg={12} xs={12} md={12}>
          <PageTitleWrapper>
            <PageHeader
              title="Books"
              description={`Here there are books of ${libraryInfo?.username}  `}
            />
          </PageTitleWrapper>{' '}
        </Grid>
        {booksListRender()}
      </Grid>
    );
  };
  const booksListRender = () => {
    return libraryInfo?.books?.map((book: BookCardInfo, index: number) => {
      return (
        <Grid item lg={4} xs={12} md={6} key={index}>
          <BookCard item={book} showPositionInfo={false} />
        </Grid>
      );
    });
  };

  const loadingRender = () => {
    return (
      <Box
        sx={{
          padding: 10,
          display: 'flex',
          width: '100%',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  const libraryErrorRender = () => {
    return (
      <Box textAlign="center" padding={10}>
        <img alt="404" height={180} src="/static/images/shared-books.png" />
        <Typography variant="h2" sx={{ my: 2 }}>
          The Library you were looking for could not be shared or there are not
          books yet
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          fontWeight="normal"
          sx={{ mb: 4 }}
        >
          Maybe who shared this link with you has not put book yet or has
          changed his idea and don't want share his book's collection.
        </Typography>
      </Box>
    );
  };

  return (
    <Container>
      {isBookListLoading
        ? loadingRender()
        : libraryInfo?.books.length > 0
        ? sharedLibraryRender()
        : libraryErrorRender()}
    </Container>
  );
};

export default SharedLibraries;
