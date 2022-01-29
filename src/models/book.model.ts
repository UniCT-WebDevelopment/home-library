import mongoose, { Schema } from "mongoose";

export interface IBook extends mongoose.Document {
  isbn: string;
  title: string;
  // libraryId: Schema.Types.ObjectId;
  shelfId: Schema.Types.ObjectId | null | string;
  userId: Schema.Types.ObjectId;
  authors: string;
  publishedDate: string;
  /**
   * Info that describe if this book has been read from user
   */
  isRead: boolean;
  startedRead: string | null;
  endRead: string | null;
  thumbnail?: string;
  /**
   * Field that describe if i borrow my book to someone.
   */
  isBorrow?: boolean;
  /**
   * describe who has the book.
   */
  borrowPerson?: string;
  description: string;
}

export const bookSchema = new mongoose.Schema<IBook>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  shelfId: {
    type: Schema.Types.ObjectId || null || String,
    ref: "Shelf",
  },

  isbn: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  authors: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: false,
  },
  startedRead: {
    type: String,
  },
  endRead: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  isBorrow: {
    type: Boolean,
  },
  borrowPerson: {
    type: String,
    required: function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return this.isBorrow;
    },
  },

  description: {
    type: String,
  },
});

const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
