import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export interface BookCardProps {
  item: any;
}
const AddBookCard = ({ item }: BookCardProps) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.thumbnail}
        alt=""
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
              {item.title}
            </Typography>
            <Typography component="div" variant="h6">
              {item.publishedDate}
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {item.authors}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {item.categories}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default AddBookCard;
