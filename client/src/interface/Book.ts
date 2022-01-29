export interface Book {
  isbn: string;
  title: string;
  authors: string;
  publishedDate?: string;
  isRead: boolean;
  startedRead?: string | null;
  description?: string;
  thumbnail?: string;
  isBorrow: boolean;
  borrowPerson?: string;
  libraryId?: string;
  shelfId?: string;
}

export interface BookCardInfo {
  _id: string;
  libraryId: number | string;
  library: string;
  shelfId: number | string;
  shelf: string;
  isbn: string;
  title: string;
  authors: string;
  isRead: boolean;
  thumbnail?: string;
  isBorrow: boolean;
  borrowPerson?: string;
  publisher?: string;
  description: string;
}

export interface SharedBook {
  username: string;
  books: BookCardInfo[];
}
