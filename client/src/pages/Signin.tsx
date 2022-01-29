import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { isValidEmail } from 'src/utils/validator';
import useForms from 'src/components/hooks/useForms';
import { signIn } from 'src/redux/thunk/userThunk';
import { useTheme } from '@emotion/react';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';

interface ISigninForm {
  email: string;
  password: string;
}

const INITIAL_FORM: ISigninForm = {
  email: '',
  password: ''
};

const INITIAL_SIGNIN_ERROR = {
  email: {
    isValid: true,
    message: '',
    validate: (form: ISigninForm) => isValidEmail(form.email)
  }
};

const Signin = () => {
  const { form, errors, handleChange, validationErrors } = useForms(
    INITIAL_FORM,
    INITIAL_SIGNIN_ERROR
  );

  const theme = useTheme();

  const { error, isLoading } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = validationErrors();

    if (isFormValid) {
      dispatch(signIn({ email: form.email, password: form.password }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/static/images/book-library.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          padding={2}
        >
          <Box
            sx={{
              my: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                error={!errors.email.isValid}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                helperText={errors.email.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                autoComplete="current-password"
              />

              <Typography
                //@ts-ignore
                color={theme.colors.error.main}
              >
                {error}{' '}
              </Typography>
              <LoadingButton
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signin;
