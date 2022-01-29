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
  CardHeader,
  Box,
  CircularProgress
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Shelf } from 'src/interface/shelves';
import { OperationEnum } from 'src/pages/Libraries';

interface ShelvesGridProps {
  /**
   * This field describe data which will be rendered from table
   */
  shelves: Shelf[];

  isShelvesLoading: boolean;
  shelfSelected: Shelf;
  onShelfSelected: (shelf: Shelf) => void;
  onOpenFromDialog: (operationType: OperationEnum) => void;
}

const ShelvesGrid = ({
  shelves,
  onShelfSelected,
  isShelvesLoading,
  shelfSelected,
  onOpenFromDialog
}: ShelvesGridProps) => {
  const theme = useTheme();

  const handleShelfSelected = (e: any, shelf: Shelf): void => {
    onShelfSelected(shelf);
  };

  /**
   * Rendering of datasource
   */
  const rowRender = () => {
    return shelves.map((shelf: Shelf) => {
      return (
        <TableRow
          selected={shelfSelected?._id === shelf._id}
          key={shelf._id}
          onClick={(event) => handleShelfSelected(event, shelf)}
        >
          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {shelf.name}
            </Typography>
          </TableCell>

          <TableCell align="right">
            <Tooltip title="Update Shelf" arrow>
              <IconButton
                onClick={() => {
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
            <Tooltip title="Delete Shelf" arrow>
              <IconButton
                onClick={() => {
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
    <Card style={{ marginTop: 20 }}>
      <CardHeader title="Shelves" />
      <TableContainer>
        {isShelvesLoading ? (
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rowRender()}</TableBody>
          </Table>
        )}
      </TableContainer>
    </Card>
  );
};

export default ShelvesGrid;
