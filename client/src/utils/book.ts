import { Library } from 'src/interface/libraries';

export const mapBooksInformation = (book: any) => {
  return {
    thumbnail: book.imageLinks.smallThumbnail,
    title: book.title,
    authors: book.authors && book.authors.join(','),
    categories: book.categories ? book.categories.join(',') : '',
    publishedDate: book.publishedDate ? book.publishedDate : ''
  };
};

export const getShelvesFromLibrary = (
  libraries: Library[],
  libraryId: string
): Library => {
  const library = libraries.find((library: Library) => {
    return library._id === libraryId;
  });
  return library;
};
