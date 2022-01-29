import { Typography, Grid } from '@mui/material';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1">{description}</Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
