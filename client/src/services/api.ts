import { ISignupForm } from 'src/pages/Signup';
import { Book } from 'src/interface/Book';
import { NewLibraryForm } from 'src/interface/libraries';
import { Shelf } from 'src/interface/shelves';
import api from './axiosConfig';

export const signupAPI = (body: ISignupForm) => {
  return api.post('/signup', body);
};

export const getLibrariesAPI = () => {
  return api.get('/library/get');
};

export const getLibraryFromIdAPI = (libraryId: string) => {
  return api.get(`library/get/${libraryId}`);
};

export const addNewLibrariesAPI = (body: NewLibraryForm) => {
  return api.post('/library/add', body);
};

export const updateLibraryAPI = (body: NewLibraryForm) => {
  return api.put('library/update', body);
};

export const deleteLibraryAPI = (libraryId: string) => {
  return api.delete(`library/delete/${libraryId}`);
};

/** SHELF */
export const getShelvesAPI = (libraryId: number | string) => {
  return api.get(`library/shelves/${libraryId}`);
};

export const addShelfAPI = (name: string, libraryId: string) => {
  return api.post(`library/${libraryId}/shelf`, { name });
};

export const updateShelfAPI = (libraryId: string, shelf: Shelf) => {
  return api.put(`library/${libraryId}/shelf`, { shelf });
};

export const deleteShelfAPI = (libraryId: string, shelfId: string) => {
  return api.delete(`library/${libraryId}/shelf/${shelfId}`);
};

export const getBookInfoByIsbnAPI = (isbn: string) => {
  return api.get(`book/${isbn}`);
};

export const addBookOnLibraryAPI = (body: FormData) => {
  return api.post(`book`, body);
};
export const addBooksListAPI = (body: Book[]) => {
  return api.post(`book/list`, body);
};

export const updateBookOnLibraryAPI = (body: Book) => {
  return api.put(`book/`, body);
};

export const getAllbooksAPI = () => {
  return api.get(`book`);
};

export const getBooksFromShelfIdAPI = (shelfId: string) => {
  return api.get(`book/list/${shelfId}`);
};

export const getBooksWithoutShelfAPI = () => {
  return api.get('book/list/notshelf');
};

export const deleteBookAPI = (bookId: number) => {
  return api.delete(`book/${bookId}`);
};
export const deleteBookShelfAssociationAPI = (booksIds: string[]) => {
  return api.post(`book/delete/shelf`, booksIds);
};

export const getSharedBooksAPI = (libraryId) => {
  return api.get(`library/shared/${libraryId}`);
};

export const associateBooksToShelf = (booksIds: string[], shelfId: string) => {
  return api.post(`book/associate/${shelfId}`, booksIds);
};

export const uploadImageAPI = (body: FormData) => {
  return api.post(`/upload`, body);
};

export const getImageAPI = (url: string) => {
  return api.get(`book/image/${url}`, { responseType: 'blob' });
};
