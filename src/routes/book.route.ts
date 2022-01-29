import express from "express";

import bookController from "../controllers/book.controller";

const bookRoutes = express.Router();

bookRoutes.get("/image", bookController.getBookImage);

bookRoutes.get("/:isbn", bookController.getBookInformation);
bookRoutes.post("/", bookController.addBook);
bookRoutes.post("/list", bookController.addListOfBooks);
bookRoutes.put("/", bookController.updateBook);
bookRoutes.get("/", bookController.getAllBook);
bookRoutes.get("/list/notshelf", bookController.getBooksWithoutShelf);
bookRoutes.post("/associate/:shelfId", bookController.associateBookToShelf);

bookRoutes.get("/list/:shelfId", bookController.getBookFromShelfId);

bookRoutes.delete("/:bookId", bookController.deleteBook);
bookRoutes.post("/delete/shelf", bookController.deleteShelfAssociation);
bookRoutes.get("/image/:url", bookController.getBookImage);

export default bookRoutes;
