import express, { NextFunction } from "express";
import libraryService from "../services/library.service";

const getLibraries = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const libraries = await libraryService.getLibraries(user);

    response.send(libraries);
  } catch (error) {
    next(error);
  }
};

const getLibraryFromId = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const { libraryId } = req.params;
    const library = await libraryService.getLibraryFromId(user, libraryId);
    response.send(library);
  } catch (error) {
    next(error);
  }
};

const addLibrary = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const newLibrary = req.body;
    const library = await libraryService.addLibrary(user, newLibrary);
    response.send(library);
  } catch (error) {
    next(error);
  }
};

const updateLibrary = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const newLibrary = req.body;
    const library = await libraryService.updateLibrary(user, newLibrary);
    response.send(library);
  } catch (error) {
    next(error);
  }
};

const deleteLibrary = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const library = await libraryService.deleteLibrary(
      user,
      req.params.libraryId
    );
    response.send(library);
  } catch (error) {
    next(error);
  }
};

// ---- Shelf  controllers --- //
const addShelf = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { user } = req.locals;
    const libraryId = req.params.libraryId;
    const shelf = await libraryService.addShelf(libraryId, req.body);
    response.send(shelf);
  } catch (error) {
    next(error);
  }
};

const updateShelf = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.locals;
    const libraryId = req.params.libraryId;
    const shelfBody = req.body;
    const shelf = await libraryService.updateShelf(
      user,
      libraryId,
      shelfBody.shelf
    );
    response.send(shelf);
  } catch (error) {
    next(error);
  }
};

const deleteShelf = async (
  req: express.Request,
  response: express.Response,
  next: NextFunction
) => {
  try {
    const { user } = req.locals;
    const libraryId = req.params.libraryId;
    const shelfId = req.params.shelfId;
    const libraries = await libraryService.deleteShelf(
      user,
      libraryId,
      shelfId
    );
    response.send(libraries);
  } catch (error) {
    next(error);
  }
};

export const getShelves = async (
  req: express.Request,
  response: express.Response,
  next: NextFunction
) => {
  try {
    const { user } = req.locals;
    const libraryId = req.params.libraryId;
    const shelves = await libraryService.getShelves(user, libraryId);
    response.send(shelves);
  } catch (error) {
    next(error);
  }
};

export const sharedBooksList = async (
  req: express.Request,
  response: express.Response,
  next: NextFunction
) => {
  try {
    const libraryId = req.params.libraryId;
    const booksSharedList = await libraryService.sharedBooksList(libraryId);
    response.send(booksSharedList);
  } catch (error) {
    next(error);
  }
};

export default {
  getLibraries,
  getLibraryFromId,
  addLibrary,
  updateLibrary,
  deleteLibrary,
  addShelf,
  updateShelf,
  deleteShelf,
  getShelves,
  sharedBooksList,
};
