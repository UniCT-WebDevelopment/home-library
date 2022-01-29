import express from "express";
import bookService from "../services/book.service";

export const uploadFile = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const bookId = req.body.data;
  const path = req?.file?.path || "";
  const result = bookService.updateBookThumbnail(bookId, path);
  res.status(200).send("");
};
