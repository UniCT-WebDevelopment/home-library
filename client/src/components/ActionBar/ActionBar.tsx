import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Breadcumb from '../Breadcumb/Breadcumb';

export interface ActionBarProps {
  leftTitle: string;
  leftSubtitle?: string;
  rightText: string;
  onActionButtonClick: any;
  isButtonDisabled?: boolean;
}

const ActionBar = ({
  leftTitle,
  leftSubtitle = '',
  rightText,
  onActionButtonClick,
  isButtonDisabled = false
}: ActionBarProps) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={12} lg={12} marginBottom={5}>
        <Breadcumb libraryName={leftTitle} />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {leftTitle}
        </Typography>
        <Typography variant="subtitle2">{leftSubtitle}</Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          disabled={isButtonDisabled}
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={onActionButtonClick}
        >
          {rightText}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActionBar;
