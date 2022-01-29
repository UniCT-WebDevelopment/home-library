import { Box, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
`
);
const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        margin-top:2px;
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {
  return (
    <LogoWrapper to="/libraries/books">
      <Hidden smDown>
        <MenuBookIcon></MenuBookIcon>
        <LogoTextWrapper>
          <LogoText>My Home library</LogoText>
        </LogoTextWrapper>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
