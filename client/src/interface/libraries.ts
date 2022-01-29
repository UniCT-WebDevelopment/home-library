import { Shelf } from './shelves';

export interface Library {
  _id: string;
  name: string;
  shareable?: boolean;
  creationDate?: string;
  shelvesNumber?: number;
  shelves: Shelf[];
}

export interface NewLibraryForm {
  name: string;
  shareable: boolean;
}

export interface UpdateLibraryForm extends NewLibraryForm {
  id: number;
}
