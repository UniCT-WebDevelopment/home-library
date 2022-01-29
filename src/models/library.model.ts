import mongoose, { Mongoose, Schema } from "mongoose";
import { IShelf, shelfSchema } from "./shelf.model";

export interface ILibrary extends mongoose.Document {
  name: string;

  creationDate: string;
  /**
   * Describe if this Library can be shared with
   * other people.
   */
  shareable: boolean;
  shelves: IShelf[];
  userId: any;
}

export const librarySchema = new mongoose.Schema<ILibrary>({
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
  shareable: {
    type: Boolean,
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  shelves: [shelfSchema],
});

const Library = mongoose.model<ILibrary>("Libraries", librarySchema);
export default Library;
