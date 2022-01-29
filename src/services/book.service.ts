import axios from "axios";
import { IUser } from "../models/user.model";
import Book, { IBook } from "../models/book.model";
import { Types } from "mongoose";
import { existsSync } from "fs";
import { thumbnailBooksMapping } from "../utils/utils";
import { unlinkSync } from "fs";
import CustomError from "../utils/CustomError.util";

const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";
const imagePath = `http://${HOST}:${PORT}/`;

/**
 * Get book information via Google Books API
 * @param isbn
 * @returns
 */
const getBookInfo = async (isbn: number | string) => {
  const url = `${process.env.GOOGLE_BOOK_ENDPOINT}${isbn} ` || "";
  const bookInfo = await axios.get(url);

  if (!bookInfo.data.items) {
    throw new CustomError("Book has not found", 500);
  }
  return bookInfo.data.items;
};

const addBookOnLibrary = async (user: IUser, book: IBook) => {
  const newBook = {
    ...book,
    userId: user._id,
    shelfId: book.shelfId === "" ? null : book.shelfId,
  };
  return await Book.create(newBook);
};

/**
 * Alllow to insert more books togheter
 * @param user
 * @param books
 * @returns
 */
const addListOfBooks = async (user: IUser, books: IBook[]) => {
  const mappingBooks = books.map((book: IBook) => {
    return {
      //@ts-ignore
      isbn: book.ISBN,
      //@ts-ignore
      authors: book.Authors,
      //@ts-ignore
      title: book.Title,
      //@ts-ignore
      description: book.Description,
      userId: user._id,
      shelfId: null,
    };
  });

  return await Book.insertMany(mappingBooks);
};

const deleteBook = async (user: IUser, bookId: number | string) => {
  const book = await Book.findOne({ _id: bookId });

  if (book?.thumbnail && existsSync(book.thumbnail)) {
    unlinkSync(book.thumbnail);
  }

  return await Book.deleteOne({ _id: bookId });
};

const deleteShelfAssociation = async (user: IUser, bookIds: string[]) => {
  const books = await Book.updateMany(
    { _id: { $in: bookIds } },
    { $set: { shelfId: null } },
    { multi: true }
  );
  return books;
};

const updateBook = async (
  user: IUser,
  book: IBook & {
    libraryId: string;
    shelfId: string;
  }
) => {
  const updateBook = {
    ...book,
    userId: user._id,
    shelfId: book.shelfId === "" ? null : book.shelfId,
  };

  return await Book.findByIdAndUpdate({ _id: book._id }, updateBook);
};

const updateBookThumbnail = async (bookId: string, thumbnail: string) => {
  const bookObjectId = new Types.ObjectId(JSON.parse(bookId));

  return await Book.findByIdAndUpdate(
    { _id: bookObjectId },
    {
      thumbnail: thumbnail,
    }
  );
};

const getAllBooks = async (user: IUser) => {
  const userId = user._id;
  const objectUserId = new Types.ObjectId(userId);

  const filter: any = [
    {
      $match: {
        userId: objectUserId,
      },
    },
    {
      $lookup: {
        from: "libraries",
        localField: "shelfId",
        foreignField: "shelves._id",
        as: "info",
      },
    },
    {
      $unwind: {
        path: "$info",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$info.shelves",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        $expr: {
          $or: [
            {
              $eq: ["$shelfId", "$info.shelves._id"],
            },
            {
              $eq: ["$shelfId", null],
            },
          ],
        },
      },
    },
    {
      $project: {
        _id: 1,
        isbn: 1,
        title: 1,
        authors: 1,
        shelfId: 1,
        thumbnail: 1,
        description: 1,
        isRead: 1,
        isBorrow: 1,
        borrowPerson: 1,
        library: "$info.name",
        libraryId: "$info._id",
        shelf: "$info.shelves.name",
      },
    },
  ];

  const books = await Book.aggregate(filter);

  return thumbnailBooksMapping(books, imagePath);
};

const getBooksWithoutShelfAssociated = async (user: IUser) => {
  const userId = user._id;

  const books = await Book.find({ userId: userId, shelfId: null });
  return books;
};

const getBooksFromShelfId = async (shelfId: string) => {
  const objectShelfId = new Types.ObjectId(shelfId);

  const filter: any = [
    {
      $match: {
        shelfId: objectShelfId,
      },
    },
    {
      $lookup: {
        from: "libraries",
        localField: "shelfId",
        foreignField: "shelves._id",
        as: "info",
      },
    },
    {
      $unwind: {
        path: "$info",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$info.shelves",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        $expr: {
          $eq: ["$shelfId", "$info.shelves._id"],
        },
      },
    },
    {
      $project: {
        _id: 1,
        isbn: 1,
        title: 1,
        authors: 1,
        shelfId: 1,
        thumbnail: 1,
        description: 1,
        isRead: 1,
        isBorrow: 1,
        borrowPerson: 1,
        libraryId: "$info._id",
        library: "$info.name",
        shelf: "$info.shelves.name",
      },
    },
  ];

  const books = await Book.aggregate(filter);
  return thumbnailBooksMapping(books, imagePath);
};

export const associateBooksToShelf = async (
  bookIds: string[],
  shelfId: string
) => {
  const objectShelfId = new Types.ObjectId(shelfId);

  return await Book.updateMany(
    { _id: { $in: bookIds } },
    { $set: { shelfId: objectShelfId } },
    { multi: true }
  );
};

export default {
  getBookInfo,
  getBooksFromShelfId,
  getBooksWithoutShelfAssociated,
  addBookOnLibrary,
  addListOfBooks,
  updateBook,
  associateBooksToShelf,
  getAllBooks,
  deleteBook,
  deleteShelfAssociation,
  updateBookThumbnail,
};
