import Library, { ILibrary } from "../models/library.model";
import { IShelf } from "../models/shelf.model";
import User, { IUser } from "../models/user.model";
import { Types } from "mongoose";
import moment from "moment";
import CustomError from "../utils/CustomError.util";
import Book from "../models/book.model";
import { thumbnailBooksMapping } from "../utils/utils";

const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";
const imagePath = `http://${HOST}:${PORT}/`;

/**
 * Get libraries list for specific user.
 * @param user
 * @returns
 */
const getLibraries = async (user: IUser) => {
  const userId = user._id;
  const userObjectId = new Types.ObjectId(userId);
  const filters: any = [
    {
      $match: {
        userId: userObjectId,
      },
    },
    {
      $project: {
        id: 1,
        creationDate: 1,
        name: 1,
        shelves: 1,
        shareable: 1,
        shelvesNumber: {
          $size: "$shelves",
        },
      },
    },
  ];
  return await Library.aggregate(filters);
};

/**
 * This method allow user to create new library
 */

const getLibraryFromId = async (user: IUser, libraryId: string) => {
  const userId = user._id;
  return await Library.findOne({ userId: userId, _id: libraryId });
};

/**
 * This method allow user to create new library
 */

const addLibrary = async (user: IUser, library: ILibrary) => {
  const userId = user._id;

  const newLibrary = {
    ...library,
    userId: userId,
    creationDate: moment().format("DD/MM/YYYY").toString(),
  };

  return await Library.create(newLibrary);
};

/**
 * This method allow user to update library
 * @param user
 * @param library
 * @returns
 */
const updateLibrary = async (user: IUser, library: ILibrary) => {
  const userId = user._id;

  const filter = { _id: library._id, userId: userId };
  return await Library.findOneAndUpdate(filter, library);
};

/**
 * Remove library from database
 * @param user
 * @param libraryId
 * @returns
 */
const deleteLibrary = async (user: IUser, libraryId: string) => {
  const userId = user._id;

  const library = await Library.findOne({ _id: libraryId, userId: userId });

  if (library && library.shelves.length > 0) {
    const error = `there are ${library.shelves.length} shelves associated yet, Remove before delete this library`;
    throw new CustomError(error, 500);
  } else {
    return await Library.deleteOne({ _id: libraryId, userId: userId });
  }
};

// --- SHELF --- //
/**
 * This service allow user to add new shelf in his library
 * @param user
 * @param libraryId
 * @param shelf
 * @returns
 */
const addShelf = async (libraryId: string, shelf: IShelf) => {
  const library = await Library.findById(libraryId);
  if (library) {
    library.shelves.push(shelf);
    return await library.save();
  }
};

const getShelves = async (user: IUser, libraryId: number | string) => {
  const userId = user._id;

  const userObjectId = new Types.ObjectId(userId);
  const libraryObjectId = new Types.ObjectId(libraryId);

  const shelves = User.aggregate([
    {
      $match: {
        _id: userObjectId,
      },
    },
    {
      $unwind: {
        path: "$libraries",
      },
    },
    {
      $match: {
        "libraries._id": libraryObjectId,
      },
    },
    {
      $unwind: {
        path: "$libraries.shelves",
      },
    },
    {
      $project: {
        _id: 0,
        id: "$libraries.shelves._id",
        name: "$libraries.shelves.name",
        libraryId: "$libraries._id",
        booksNumber: {
          $size: "$libraries.shelves.books",
        },
        books: "$libraries.shelves.books",
      },
    },
    {
      $addFields: {
        books: {
          shelfId: "$id",
          libraryId: "$libraryId",
        },
      },
    },
  ]);

  return shelves;
};

/**
 * This service allow user to update shelf.
 * @param user
 * @param libraryId
 * @param shelf
 * @returns
 */
const updateShelf = async (user: IUser, libraryId: string, shelf: IShelf) => {
  const userId = user._id;

  const library = await Library.findById({ _id: libraryId, userId: userId });

  if (library) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const shelfSelected = library.shelves.id(shelf._id);
    const shelfUpdated = shelfSelected.set(shelf);
    library.save();
    return shelfUpdated;
  }
};

const deleteShelf = async (user: IUser, libraryId: string, shelfId: string) => {
  const userId = user._id;

  const booksAssociated = await Book.find({ shelfId: shelfId });
  if (booksAssociated.length > 0) {
    const error = `there are ${booksAssociated.length} books associated on this shelf, move or remove them before to proceed`;
    throw new CustomError(error, 500);
  }

  const library = await Library.findById({ _id: libraryId, userId: userId });

  if (library) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const shelfSelected = library.shelves.id(shelfId);
    shelfSelected.remove();
    library.save();
    return shelfId;
  }
};

const sharedBooksList = async (libraryId: number | string) => {
  const library = await Library.findOne({ _id: libraryId });

  library;

  if (library && library.shareable) {
    const filters: any = [
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
          userId: 1,
          _id: 1,
          isbn: 1,
          title: 1,
          authors: 1,
          shelfId: 1,
          thumbnail: 1,
          description: 1,
          library: "$info.name",
          libraryId: "$info._id",
          shareable: "$info.shareable",
          shelf: "$info.shelves.name",
        },
      },
      {
        $match: {
          libraryId: library._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
    ];

    const booksList = await Book.aggregate(filters);

    const response = {
      username: booksList[0].userInfo.name,
      books: thumbnailBooksMapping(booksList, imagePath),
    };
    return response;
  }

  return {
    username: "",
    books: [],
  };
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
