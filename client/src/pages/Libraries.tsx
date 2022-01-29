import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import ActionBar from 'src/components/ActionBar/ActionBar';
import LibrariesGrid from 'src/components/DataGrid/LibrariesGrid';
import {
  Library,
  NewLibraryForm,
  UpdateLibraryForm
} from 'src/interface/libraries';
import NewLibraryDialog from 'src/components/Dialog/NewLibraryDialog';
import { useEffect, useState } from 'react';
import {
  addNewLibrariesAPI,
  deleteLibraryAPI,
  getLibrariesAPI,
  updateLibraryAPI
} from 'src/services/api';
import { useNotification } from 'src/contexts/Notification';
import DeleteConfirmationDialog from 'src/components/Dialog/DeleteConfirmationDialog';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import Breadcumb from 'src/components/Breadcumb/Breadcumb';

export const PaddingBox = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2, 0)};
`
);

export enum OperationEnum {
  DELETE,
  UPDATE
}

const Libraries = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLibrariesLoading, setIsLibrariesLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Library>();
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState<boolean>(false);

  const [librariesList, setLibrariesList] = useState<Library[]>([]);
  const notify = useNotification();
  let navigate = useNavigate();

  useEffect(() => {
    fetchLibraries();
  }, []);

  const handleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  /**
   * this method call API which retrieve libraries defined
   * for user that is logged
   */
  const fetchLibraries = () => {
    setIsLibrariesLoading(true);
    getLibrariesAPI()
      .then((response) => {
        setLibrariesList(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLibrariesLoading(false);
      });
  };

  const addNewLibrary = (body: NewLibraryForm) => {
    addNewLibrariesAPI(body)
      .then((response) => {
        notify.showNotification(
          `Library "${response.data.name}" has been added`,
          'success'
        );
        fetchLibraries();
      })
      .catch((error) => {
        console.error(error);
        notify.showNotification(error.message, 'error');
      })
      .finally(() => {
        onCloseDialog();
      });
  };

  const onSaveNewLibrary = (body: NewLibraryForm) => {
    addNewLibrary(body);
  };

  /**
   * This method call the api which will delete library selected
   * @param libraryId
   */
  const onDeleteLibrary = (libraryId: string) => {
    deleteLibraryAPI(libraryId)
      .then(() => {
        notify.showNotification('Operation has been successfully', 'success');
        fetchLibraries();
      })
      .catch((error) => {
        const errMessage = error?.response?.data?.message;
        notify.showNotification(errMessage, 'error');
      })
      .finally(() => {
        onCloseDeleteDialog();
      });
  };

  /**
   * Function which calls API for library's update.
   * @param body
   */
  const onUpdateLibrary = (body: NewLibraryForm) => {
    const library = {
      ...selected,
      ...body
    };

    updateLibraryAPI(library)
      .then(() => {
        notify.showNotification(
          `Library "${library.name}" has been updated`,
          'success'
        );
        fetchLibraries();
      })
      .catch((error) => {
        console.error(error);
        notify.showNotification(error.description, 'error');
      })
      .finally(() => {
        setSelected(null);
        handleDialog();
      });
  };

  /**
   * Method that allow to select library for specific action like 'update' or 'delete'
   * @param library
   */
  const onSelected = (library: Library) => {
    setSelected(library);
  };
  const onCloseDialog = () => {
    handleDialog();
  };

  /**
   * Based on operationType this method decide if show Delete Dialog or
   * new/update Dialog
   * @param operationType
   */
  const onOpenFromDialog = (operationType: OperationEnum) => {
    switch (operationType) {
      case OperationEnum.DELETE:
        onOpenDeleteDialog();
        break;
      case OperationEnum.UPDATE:
        handleDialog();
        break;
    }
  };

  const onOpenDeleteDialog = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const onCloseDeleteDialog = () => {
    setSelected(null);
    setIsDeleteConfirmationOpen(false);
  };

  const onConfirmDeleteLibray = () => {
    onDeleteLibrary(selected?._id);
  };

  const copyText = (entryText) => {
    navigator.clipboard.writeText(entryText);
  };

  const onCopyOnClipboard = (library: Library) => {
    const base_url = window.location.origin;
    const shared_url = `${base_url}/shared/${library._id}`;
    copyText(shared_url);
    notify.showNotification(
      `Link for "${library.name}" library has been copied`,
      'success'
    );
  };

  const onOpenDialogFromActionBar = () => {
    setSelected(null);
    handleDialog();
  };

  /**
   * This action allow user to go into another page
   */
  const onArrowRightClick = (libraryId: string) => {
    navigate(`/libraries/list/${libraryId}`);
  };
  return (
    <>
      <Helmet>
        <title> Libraries List</title>
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
                leftTitle="Libraries"
                leftSubtitle="Here you can handle your library and create new one"
                rightText="Create Library"
                onActionButtonClick={onOpenDialogFromActionBar}
              ></ActionBar>
            </PaddingBox>
          </Grid>
          <Grid item xs={12}>
            <LibrariesGrid
              onCopyOnClipboard={onCopyOnClipboard}
              isLoading={isLibrariesLoading}
              onSelected={onSelected}
              librariesList={librariesList}
              onOpenFromDialog={onOpenFromDialog}
              onArrowRightClick={onArrowRightClick}
            ></LibrariesGrid>
          </Grid>

          {isDialogOpen && (
            <NewLibraryDialog
              isDialogOpen={isDialogOpen}
              onSave={selected ? onUpdateLibrary : onSaveNewLibrary}
              onClose={onCloseDialog}
              isUpdate={selected !== null}
              libraryName={selected?.name}
              isLibraryShared={selected?.shareable}
            ></NewLibraryDialog>
          )}

          <DeleteConfirmationDialog
            isOpen={isDeleteConfirmationOpen}
            onClose={onCloseDeleteDialog}
            onConfirm={onConfirmDeleteLibray}
            description={`If you choose to delete "${selected?.name}" you will lose all your data stored in it`}
            title="Do you want delete this library?"
          ></DeleteConfirmationDialog>
        </Grid>
      </Container>
    </>
  );
};

export default Libraries;
