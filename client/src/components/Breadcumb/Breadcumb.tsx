import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation, matchPath, useNavigate } from 'react-router';

interface BreadcumbProps {
  libraryName?: string;
}

const Breadcumb = ({ libraryName = '' }: BreadcumbProps) => {
  const handleClick = (event: any, link: string) => {
    event.preventDefault();
    navigate(link);
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const libraryMatches = matchPath('/libraries/*', pathname);
  const detailsMatches = matchPath('/libraries/list/:librariesId', pathname);

  return (
    <>
      <Breadcrumbs>
        {libraryMatches && (
          <Link
            fontSize={15}
            underline="hover"
            className="cursor-pointer"
            onClick={(event) => handleClick(event, '/libraries/list')}
          >
            Libraries
          </Link>
        )}
        {detailsMatches && <Link fontSize={15}>{libraryName}</Link>}
      </Breadcrumbs>
    </>
  );
};

export default Breadcumb;
