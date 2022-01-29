import { Grid, Container, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  addShelfAPI,
  associateBooksToShelf,
  deleteBookAPI,
  deleteBookShelfAssociationAPI,
  deleteShelfAPI,
  getBooksFromShelfIdAPI,
  getLibraryFromIdAPI,
  updateShelfAPI
} from 'src/services/api';
import { Library } from 'src/interface/libraries';
import { Helmet } from 'react-helmet-async';
import { OperationEnum, PaddingBox } from './Libraries';
import ActionBar from 'src/components/ActionBar/ActionBar';
import ShelvesGrid from 'src/components/DataGrid/ShelvesGrid';
import NewShelfDialog from 'src/components/Dialog/NewShelfDialog';
import { Shelf } from 'src/interface/shelves';
import { useNotification } from 'src/contexts/Notification';
import DeleteConfirmationDialog from 'src/components/Dialog/DeleteConfirmationDialog';
import BooksGrid from 'src/components/DataGrid/BooksGrid';
import { Book } from 'src/interface/Book';
import AssociateBooks from 'src/components/Dialog/AssociateBooks';

const Shelves = () => {
  const [libraryInfo, setLibraryInfo] = useState<Library>();
  const [isLibraryInfoLoading, setLibraryInfoLoading] =
    useState<boolean>(false);
  const [shelfSelected, setShelfSelected] = useState<Shelf>();
  const [books, setBooks] = useState<Book>();
  const [booksIdsSelected, setBooksIdsSelected] = useState<string[]>([]);

  const [isNewShelfDialogOpen, setShelfDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const notify = useNotification();

  let params = useParams();

  useEffect(() => {
    fetchLibraryFromId();
  }, []);

  useEffect(() => {
    if (shelfSelected) {
      fetchBooksFromShelfId();
    }
  }, [shelfSelected]);

  const fetchBooksFromShelfId = () => {
    getBooksFromShelfIdAPI(shelfSelected._id).then((response) => {
      setBooks(response.data);
    });
  };

  const fetchLibraryFromId = () => {
    setLibraryInfoLoading(true);
    getLibraryFromIdAPI(params.libraryId)
      .then((response) => {
        setLibraryInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLibraryInfoLoading(false);
      });
  };

  const onShelfSelected = (shelf: Shelf) => {
    setShelfSelected(shelf);
  };

  const handleShelfDialog = () => {
    setShelfDialogOpen(!isNewShelfDialogOpen);
  };
  const handleDeleteDialog = () => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };

  const handleActionDialog = () => {
    setShelfSelected(null);
    handleShelfDialog();
  };

  const onUpdateShelf = (shelfName: string) => {
    const updatedShelf = {
      ...shelfSelected,
      name: shelfName
    };
    updateShelfAPI(libraryInfo?._id, updatedShelf)
      .then(() => {
        notify.showNotification(
          `Shelf ${shelfName} has been updated`,
          'success'
        );
        fetchLibraryFromId();
      })
      .catch((error) => {
        notify.showNotification(error.message, 'error');
      })
      .finally(() => {
        handleShelfDialog();
      });
  };

  /**
   *
   * This method will call the API for adding shelf on library
   * @param newLibrary
   */
  const onSaveNewShelf = (newLibrary: string) => {
    addShelfAPI(newLibrary, libraryInfo?._id)
      .then((response) => {
        notify.showNotification(
          `Shelf ${response.data.name} has been added`,
          'success'
        );
        fetchLibraryFromId();
      })
      .catch((error) => {
        notify.showNotification(error.message, 'error');
      })
      .finally(() => {
        handleShelfDialog();
      });
  };

  /**
   * Call the api responsible for delete shelf from a library
   */
  const onDeleteShelf = () => {
    deleteShelfAPI(libraryInfo._id, shelfSelected._id)
      .then(() => {
        notify.showNotification(
          `Shelf '${shelfSelected.name} has been deleted'`,
          'success'
        );
        fetchLibraryFromId();
      })
      .catch((error) => {
        const errMessage = error?.response?.data?.message;
        notify.showNotification(errMessage, 'error');
      })
      .finally(() => {
        handleDeleteDialog();
      });
  };

  const onDeleteAssociationClick = () => {
    deleteBookShelfAssociationAPI(booksIdsSelected)
      .then((response) => {
        notify.showNotification(
          'books has been removed from this shelf',
          'success'
        );
        fetchBooksFromShelfId();
      })
      .catch((error) => {
        notify.showNotification(error, 'error');
      });
  };

  const onDeleteBook = (bookId: number) => {
    deleteBookAPI(bookId)
      .then(() => {
        notify.showNotification('Book has been deleted', 'success');
        fetchBooksFromShelfId();
      })
      .catch(() => {
        notify.showNotification('Something went wrong', 'error');
      });
  };

  const onUpdateBook = () => {
    fetchBooksFromShelfId();
  };

  const onBooksIdsSelected = (ids: string[]) => {
    setBooksIdsSelected(ids);
  };

  const onOpenFromDialog = (operationType: OperationEnum) => {
    switch (operationType) {
      case OperationEnum.DELETE:
        handleDeleteDialog();
        break;
      case OperationEnum.UPDATE:
        handleShelfDialog();
        break;
    }
  };

  const associateBooks = (booksIds: string[]) => {
    associateBooksToShelf(booksIds, shelfSelected._id)
      .then((response) => {
        fetchBooksFromShelfId();
        notify.showNotification(response.data, 'success');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {isLibraryInfoLoading || !libraryInfo ? (
        <CircularProgress />
      ) : (
        <>
          <Helmet>
            <title>{libraryInfo?.name}</title>
          </Helmet>
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12}>
                <PaddingBox>
                  <ActionBar
                    leftTitle={`${libraryInfo?.name}`}
                    leftSubtitle="This page allow you handling of shelf present in your library"
                    rightText={`Add shelf in "${libraryInfo?.name}"`}
                    onActionButtonClick={handleActionDialog}
                  ></ActionBar>
                </PaddingBox>
              </Grid>
              <Grid item xs={12}>
                <ShelvesGrid
                  isShelvesLoading={false}
                  shelves={libraryInfo?.shelves}
                  shelfSelected={shelfSelected}
                  onShelfSelected={onShelfSelected}
                  onOpenFromDialog={onOpenFromDialog}
                ></ShelvesGrid>
              </Grid>
              {shelfSelected && (
                <>
                  <AssociateBooks
                    isDeleteButtonDisabled={
                      booksIdsSelected && booksIdsSelected.length <= 0
                    }
                    onDeleteAssociationClick={onDeleteAssociationClick}
                    onSave={associateBooks}
                    shelfSelected={shelfSelected}
                  />
                  <Grid item xs={12}>
                    <BooksGrid
                      checkboxSelection={true}
                      booksRows={books}
                      onDeleteBookAction={onDeleteBook}
                      title={`Books List`}
                      onUpdateBookAction={onUpdateBook}
                      onCheckboxSelected={onBooksIdsSelected}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Container>
          {isNewShelfDialogOpen && (
            <NewShelfDialog
              isDialogOpen={isNewShelfDialogOpen}
              onSave={shelfSelected ? onUpdateShelf : onSaveNewShelf}
              onClose={() => handleShelfDialog()}
              isUpdate={shelfSelected !== null}
              shelfNameToUpdate={shelfSelected ? shelfSelected.name : ''}
            ></NewShelfDialog>
          )}{' '}
          <DeleteConfirmationDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleDeleteDialog}
            onConfirm={onDeleteShelf}
            description={`If you choose to delete  you will lose all your data stored on it`}
            title="Do you want delete this Shelf?"
          ></DeleteConfirmationDialog>{' '}
        </>
      )}
    </>
  );
};

export default Shelves;
