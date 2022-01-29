import axios from "axios";
import express from "express";
import bookService from "../services/book.service";

const getBookInformation = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const isbn = req.params.isbn;
    const book = await bookService.getBookInfo(isbn);
    response.send(book);
  } catch (error) {
    next(error);
  }
};

const getBooksWithoutShelf = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const books = await bookService.getBooksWithoutShelfAssociated(user);
    response.send(books);
  } catch (error) {
    next(error);
  }
};

const getAllBook = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const books = await bookService.getAllBooks(user);
    response.send(books);
  } catch (error) {
    next(error);
  }
};

const getBookFromShelfId = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const { shelfId } = req.params;
    const books = await bookService.getBooksFromShelfId(shelfId);
    response.send(books);
  } catch (error) {
    next(error);
  }
};

const addBook = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const bookBody = req.body;
    const book = await bookService.addBookOnLibrary(user, bookBody);

    response.send(book);
  } catch (error) {
    next(error);
  }
};

const addListOfBooks = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const booksList = req.body;
    const books = await bookService.addListOfBooks(user, booksList);
    response.send(books);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const book = req.body;
    const bookUpdated = await bookService.updateBook(user, book);
    response.send(bookUpdated);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const bookId = req.params.bookId;
    await bookService.deleteBook(user, bookId);
    response.send("Book has been deleted");
  } catch (error) {
    next(error);
  }
};

export const deleteShelfAssociation = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const booksIds = req.body;
    await bookService.deleteShelfAssociation(user, booksIds);
    response.send("Book association has been removed");
  } catch (error) {
    next(error);
  }
};

export const associateBookToShelf = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const { shelfId } = req.params;
    const booksIds = req.body;
    await bookService.associateBooksToShelf(booksIds, shelfId);
    response.send("Book has been associated");
  } catch (error) {
    next(error);
  }
};

export const getBookImage = async (
  req: express.Request,
  response: express.Response
) => {
  const url = req.params.url;
  const myFile = await axios.get(url, { responseType: "arraybuffer" });
  response.set("content-type", "blob");
  const buffer = Buffer.from(myFile.data);
  response.status(200).send(buffer);
};

export default {
  getBookInformation,
  getBookImage,
  getBookFromShelfId,
  getBooksWithoutShelf,
  associateBookToShelf,
  addBook,
  addListOfBooks,
  updateBook,
  getAllBook,
  deleteBook,
  deleteShelfAssociation,
};
