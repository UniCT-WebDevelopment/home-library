import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Switch,
  CardActions,
  CardMedia,
  FormHelperText
} from '@mui/material';

import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { Library } from 'src/interface/libraries';
import { useEffect, useState } from 'react';
import { Shelf } from 'src/interface/shelves';
import {
  addBookOnLibraryAPI,
  getLibrariesAPI,
  updateBookOnLibraryAPI,
  uploadImageAPI
} from 'src/services/api';
import { Book } from 'src/interface/Book';
import useForms from 'src/components/hooks/useForms';
import { isLibraryPresent, isNotEmpty } from 'src/utils/validator';
import { useNotification } from 'src/contexts/Notification';
import { getShelvesFromLibrary } from 'src/utils/book';
import ImageUpload from '../Upload/ImageUpload';

const INITIAL_BOOK_ERROR = {
  isbn: {
    isValid: true,
    message: '',
    validate: (form: Book) => isNotEmpty(form.isbn)
  },
  title: {
    isValid: true,
    message: '',
    validate: (form: Book) => isNotEmpty(form.title)
  },
  authors: {
    isValid: true,
    message: '',
    validate: (form: Book) => isNotEmpty(form.authors)
  },
  borrowPerson: {
    isValid: true,
    message: '',
    validate: (form: Book) => form.isBorrow && isNotEmpty(form.borrowPerson)
  },

  libraryId: {
    isValid: true,
    message: ''
  },

  shelfId: {
    isValid: true,
    message: '',
    validate: (form: Book) => isLibraryPresent(form.libraryId, form.shelfId)
  }
};

const INITIAL_BOOK_FORM: Book = {
  isbn: '',
  title: '',
  authors: '',
  libraryId: '',
  shelfId: '',
  isRead: false,
  isBorrow: false,
  borrowPerson: '',
  description: ''
};

interface FormBookProps {
  title: string;
  isBookFromIsbn?: boolean;
  bookForm?: Book;
  onCompleteSaveAction?: () => void;
  isBookUpdate?: boolean;
}

const FormBook = ({
  isBookFromIsbn = false,
  bookForm,
  title,
  isBookUpdate = false,

  onCompleteSaveAction
}: FormBookProps) => {
  const { form, errors, handleChange, validationErrors, resetForm } = useForms(
    bookForm || INITIAL_BOOK_FORM,
    INITIAL_BOOK_ERROR
  );

  const [librariesList, setLibrariesList] = useState<Library[]>();
  const [shelvesList, setShelvesList] = useState<Shelf[]>();
  const [imageFile, setImageFile] = useState<any>();
  const [isCreationNewBookLoading, setIsCreationNewBookLoading] =
    useState<boolean>(false);

  const notify = useNotification();
  useEffect(() => {
    fetchLibraries();
  }, []);

  const fetchLibraries = () => {
    getLibrariesAPI()
      .then((response) => {
        setLibrariesList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (form && form.libraryId && librariesList) {
      const library = getShelvesFromLibrary(librariesList, form.libraryId);
      setShelvesList(library.shelves);
    }
  }, [form.libraryId, librariesList]);

  const librariesListRender = () => {
    return librariesList?.map((library: Library) => {
      return (
        <MenuItem key={library._id} value={library._id}>
          {library.name}
        </MenuItem>
      );
    });
  };

  const shelvesListRender = () => {
    if (shelvesList) {
      return shelvesList.map((shelf: Shelf) => {
        return (
          <MenuItem key={shelf._id} value={shelf._id}>
            {shelf.name}
          </MenuItem>
        );
      });
    }
  };

  const onAddBook = () => {
    const isFormValid = validationErrors();

    if (isFormValid) {
      setIsCreationNewBookLoading(true);
      addBookOnLibraryAPI(form)
        .then((response) => {
          notify.showNotification(`${form.title} has been added`, 'success');

          if (onCompleteSaveAction) onCompleteSaveAction();

          if (imageFile) {
            uploadFile(response.data._id);
          }
          resetForm();
          setImageFile('');
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsCreationNewBookLoading(false);
        });
    }
  };

  const uploadFile = async (image_id: string) => {
    const formData = new FormData();

    // Allow to rename file with id of books just created
    const newFile = new File([imageFile], image_id);
    formData.append('myImage', newFile);
    formData.append('data', JSON.stringify(image_id));
    await uploadImageAPI(formData);
  };

  const onUpdateBook = () => {
    const isFormValid = validationErrors();

    if (isFormValid) {
      setIsCreationNewBookLoading(true);
      updateBookOnLibraryAPI(form)
        .then(() => {
          notify.showNotification(`${form.title} has been updated`, 'success');
          if (onCompleteSaveAction) onCompleteSaveAction();
          uploadFile(form._id);

          resetForm();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsCreationNewBookLoading(false);
        });
    }
  };

  const onSetFile = (file: any) => {
    setImageFile(file);
  };

  const renderForm = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <ImageUpload
            isBookFromIsbn={isBookFromIsbn}
            imageUrl={form.thumbnail || imageFile}
            onSetFile={onSetFile}
          />
        </Grid>
        <Grid item xs={12} lg={12}></Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <TextField
              value={form?.isbn}
              fullWidth
              required
              disabled={isBookFromIsbn}
              id="isbn"
              label="ISBN"
              onChange={handleChange}
              error={!errors.isbn.isValid}
              helperText={errors.isbn.message}
            />
          </FormControl>
        </Grid>
        <Grid item lg={3} xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Select Library</InputLabel>
            <Select
              name="libraryId"
              label="Select Library"
              value={form.libraryId || ''}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {librariesListRender()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3} xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Select Shelf</InputLabel>
            <Select
              name="shelfId"
              label="Select Shelf"
              value={form.shelfId || ''}
              onChange={handleChange}
              error={!errors.shelfId.isValid}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {shelvesListRender()}
            </Select>
            <FormHelperText error>{errors.shelfId.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <TextField
              value={form?.authors}
              fullWidth
              required
              id="authors"
              label="Authors"
              onChange={handleChange}
              error={!errors.authors.isValid}
              helperText={errors.authors.message}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <TextField
              value={form?.title}
              fullWidth
              required
              id="title"
              label="Title"
              onChange={handleChange}
              error={!errors.title.isValid}
              helperText={errors.title.message}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={12}>
          <FormControl fullWidth>
            <TextField
              maxRows={4}
              value={form?.description}
              fullWidth
              required={false}
              id="description"
              label="Description"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item lg={3} md={12} xs={12}>
          <FormControlLabel
            control={
              <Switch
                id="isRead"
                checked={form.isRead}
                onChange={(event) => handleChange(event, 'switch')}
              />
            }
            label="Have you already read this book?"
          />
        </Grid>
        <Grid item lg={3} md={12} xs={12}>
          <FormControlLabel
            control={
              <Switch
                id="isBorrow"
                checked={form.isBorrow}
                onChange={(event) => handleChange(event, 'switch')}
              />
            }
            label="Have you borrow this book?"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <TextField
              value={form?.borrowPerson}
              fullWidth
              required={false}
              id="borrowPerson"
              label="Who did you lend the book to? (fill just if you borrow book to someone)"
              onChange={handleChange}
              error={form.isBorrow && !errors.borrowPerson.isValid}
              helperText={form.isBorrow ? errors.borrowPerson.message : ''}
              disabled={!form?.isBorrow}
            />
          </FormControl>
        </Grid>
      </Grid>
    );
  };

  return (
    <Card elevation={isBookUpdate ? 0 : 2}>
      <CardHeader title={title}></CardHeader>
      <Divider />
      <CardContent>{renderForm()}</CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <LoadingButton
          loading={isCreationNewBookLoading}
          size="small"
          variant="contained"
          onClick={isBookUpdate ? onUpdateBook : onAddBook}
        >
          {isBookUpdate ? 'Update book' : 'Add book'}
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default FormBook;
