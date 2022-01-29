import mongoose from "mongoose";
import { bookSchema, IBook } from "./book.model";

export interface IShelf extends mongoose.Document {
  name: string;

  /**
   * this key describe books allocated within shelf.
   */
  books: IBook;
}

export const shelfSchema = new mongoose.Schema<IShelf>({
  name: {
    type: String,
    required: true,
  },

  books: [bookSchema],
});

const Shelf = mongoose.model<IShelf>("Shelf", shelfSchema);
export default Shelf;
