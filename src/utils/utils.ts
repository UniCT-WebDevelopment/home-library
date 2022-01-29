import { IBook } from "../models/book.model";

export const thumbnailBooksMapping = (
  booksList: IBook[],
  imagePath: string
) => {
  const booksMapping = booksList.map((book: IBook) => {
    return {
      ...book,
      thumbnail: book.thumbnail ? new URL(book?.thumbnail, imagePath).href : "",
    };
  });

  return booksMapping;
};
