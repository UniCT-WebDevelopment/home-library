import {
  Tooltip,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CircularProgress,
  Box
} from '@mui/material';

import { Library } from 'src/interface/libraries';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { OperationEnum } from 'src/pages/Libraries';
import ShareIcon from '@mui/icons-material/Share';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
interface TableProps {
  /**
   * This field describe data which will be rendered from table
   */
  librariesList: Library[];
  isLoading: boolean;
  onSelected: (library: Library) => void;
  onOpenFromDialog: (operationType: OperationEnum) => void;
  onCopyOnClipboard: (library: Library) => void;
  onArrowRightClick: (libraryId: string) => void;
}

const LibrariesGrid = ({
  librariesList,
  onSelected,
  onOpenFromDialog,
  isLoading,
  onCopyOnClipboard,
  onArrowRightClick
}: TableProps) => {
  const theme = useTheme();

  /**
   * Rendering of datasource
   */
  const rowRender = () => {
    return librariesList.map((library: Library) => {
      return (
        <TableRow key={library._id}>
          <TableCell>
            <Box
              sx={{
                display: 'flex'
              }}
            >
              <Typography
                alignSelf="end"
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {library.name}
              </Typography>
              <Tooltip title="Go to details" arrow>
                <IconButton
                  onClick={() => {
                    onArrowRightClick(library._id);
                  }}
                  sx={{
                    '&:hover': { background: theme.colors.primary.lighter },
                    color: theme.palette.primary.main
                  }}
                  color="inherit"
                  size="small"
                >
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </TableCell>
          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {library.creationDate}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {library.shelvesNumber}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {library.shareable ? 'Yes' : 'No'}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Tooltip title="Share library" arrow>
              <span>
                <IconButton
                  disabled={!library.shareable}
                  onClick={() => {
                    onCopyOnClipboard(library);
                  }}
                  sx={{
                    '&:hover': {
                      background: theme.colors.primary.lighter
                    },
                    color: theme.palette.primary.main
                  }}
                  color="inherit"
                  size="small"
                >
                  <ShareIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Update library" arrow>
              <IconButton
                onClick={() => {
                  onSelected(library);
                  onOpenFromDialog(OperationEnum.UPDATE);
                }}
                sx={{
                  '&:hover': {
                    background: theme.colors.primary.lighter
                  },
                  color: theme.palette.primary.main
                }}
                color="inherit"
                size="small"
              >
                <EditTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete library" arrow>
              <IconButton
                onClick={() => {
                  onSelected(library);
                  onOpenFromDialog(OperationEnum.DELETE);
                }}
                sx={{
                  '&:hover': { background: theme.colors.error.lighter },
                  color: theme.palette.error.main
                }}
                color="inherit"
                size="small"
              >
                <DeleteTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Card style={{ marginTop: 20, alignSelf: 'center' }}>
      {isLoading ? (
        <Box
          sx={{
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Creation date</TableCell>
                <TableCell>N° Shelves</TableCell>
                <TableCell>Is shared</TableCell>

                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rowRender()}</TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

export default LibrariesGrid;
