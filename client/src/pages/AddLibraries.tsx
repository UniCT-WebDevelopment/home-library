import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageTitle from 'src/components/PageTitle';
import { Container, Grid, TextField, Card } from '@mui/material';

const AddLibraries = () => {
  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading="Add new library"
          subHeading="Create your library where you can split your books"
          docs="https://material-ui.com/components/text-fields/"
        />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                id="library-title"
                label="Library name"
              ></TextField>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default AddLibraries;
