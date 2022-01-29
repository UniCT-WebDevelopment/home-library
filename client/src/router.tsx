import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import Libraries from 'src/pages/Libraries';
// import Shelves from 'src/pages/Shelves1';
import Signin from 'src/pages/Signin';
import Signup from 'src/pages/Signup';
import AddBooks from 'src/pages/AddBooks';
import Status404 from './pages/Status/Status404';
import Status500 from './pages/Status/Status500';
import Books from './pages/Books';
import SharedLibraries from './pages/SharedLibraries';
import Shelves from './pages/Shelves';

const routes = (isAuthenticated: boolean) => [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: isAuthenticated ? <SidebarLayout /> : <Navigate to="/signin" />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
      {
        path: 'signin',
        element:
          isAuthenticated === false ? (
            <Signin />
          ) : (
            <Navigate to="/libraries/books" />
          )
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  },

  {
    path: 'Libraries',
    element: isAuthenticated ? <SidebarLayout /> : <Navigate to="/signin" />,
    children: [
      {
        path: 'Books',
        element: <Books />
      },
      {
        path: '/list',
        element: <Libraries />
      },
      {
        path: '/list/:libraryId',
        element: <Shelves />
      },
      {
        path: 'add/book',
        element: <AddBooks />
      }
    ]
  },
  {
    path: 'shared/:libraryId',
    element: <SharedLibraries />
  }
];

export default routes;
