import { ReactNode } from 'react';

import BookIcon from '@mui/icons-material/Book';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Libraries',
    items: [
      {
        name: 'Books',
        link: '/libraries/books',
        icon: MenuBookIcon
      },
      {
        name: 'Libraries',
        link: '/libraries/list',
        icon: CollectionsBookmarkIcon
      },
      {
        name: 'Add Book',
        link: '/libraries/add/book',
        icon: BookIcon
      }
    ]
  }
];

export default menuItems;
