import express from "express";
import libraryController from "../controllers/library.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const libraryRoutes = express.Router();

libraryRoutes.get(
  "/get",
  authenticationMiddleware,
  libraryController.getLibraries
);

libraryRoutes.get(
  "/get/:libraryId",
  authenticationMiddleware,
  libraryController.getLibraryFromId
);

libraryRoutes.post(
  "/add",
  authenticationMiddleware,
  libraryController.addLibrary
);

libraryRoutes.put(
  "/update",
  authenticationMiddleware,
  libraryController.updateLibrary
);

libraryRoutes.delete(
  "/delete/:libraryId",
  authenticationMiddleware,
  libraryController.deleteLibrary
);

libraryRoutes.post(
  "/:libraryId/shelf",
  authenticationMiddleware,
  libraryController.addShelf
);
libraryRoutes.put(
  "/:libraryId/shelf",
  authenticationMiddleware,
  libraryController.updateShelf
);

libraryRoutes.delete(
  "/:libraryId/shelf/:shelfId",
  authenticationMiddleware,
  libraryController.deleteShelf
);

libraryRoutes.get(
  "/shelves/:libraryId",
  authenticationMiddleware,
  libraryController.getShelves
);

libraryRoutes.get("/shared/:libraryId", libraryController.sharedBooksList);

export default libraryRoutes;
