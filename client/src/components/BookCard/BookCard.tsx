import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { CardActionArea, Chip, Tooltip } from '@mui/material';
import { BookCardInfo } from 'src/interface/Book';
export interface BookCardProps {
  item: BookCardInfo;
  /**
   * This props define if the info about position of book need to
   * be rendered
   */
  showPositionInfo?: boolean;
  onCardClick?: (bookSelected: BookCardInfo) => void;
}
const BookCard = ({
  item,
  showPositionInfo = true,
  onCardClick
}: BookCardProps) => {
  const detail = item;

  const bookPositionRender = () => {
    if (detail.shelf && showPositionInfo) {
      return (
        <Typography variant="h6" color="text.primary" component="div">
          {`${item?.library}/${item?.shelf}`}
        </Typography>
      );
    }
  };

  const bookDescriptionRender = (description: string) => {
    return (
      <Tooltip title={description}>
        <Typography
          variant="caption"
          color="text.secondary"
          component="div"
          marginTop={2}
        >
          {description ? `${description.substring(0, 100)}... ` : ''}
        </Typography>
      </Tooltip>
    );
  };

  const handleCardClick = (event) => {
    onCardClick(item);
  };
  return (
    <CardActionArea>
      <Card sx={{ display: 'flex' }} onClick={handleCardClick}>
        <CardMedia
          component="img"
          sx={{ width: 140, height: 210 }}
          image={
            detail.thumbnail
              ? `${detail.thumbnail}?t=${new Date().getTime()}`
              : '/static/images/book-image.png'
          }
          alt="Cover image"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Typography component="div" variant="h5">
                {detail.title}
              </Typography>

              {detail.isRead && (
                <Chip label="Read" color="success" size="small" />
              )}
            </Box>

            <Typography variant="caption" color="text.primary" component="div">
              ISBN: {detail.isbn}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {detail.authors}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              {detail.publisher}
            </Typography>
            {bookPositionRender()}
            {showPositionInfo && item.isBorrow && (
              <Typography
                variant="subtitle1"
                color="text.primary"
                component="div"
              >
                {`(Loan)`}
              </Typography>
            )}
            {detail.description && bookDescriptionRender(detail.description)}
          </CardContent>
        </Box>
      </Card>
    </CardActionArea>
  );
};

export default BookCard;
