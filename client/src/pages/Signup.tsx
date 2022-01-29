import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ValidationError } from 'src/interface/Error';
import useForms from 'src/components/hooks/useForms';
import {
  comparePassword,
  isValidEmail,
  moreThenEight
} from 'src/utils/validator';
import { useTheme } from '@emotion/react';
import { signupAPI } from 'src/services/api';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNotification } from 'src/contexts/Notification';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

interface ISignupErrors {
  name: ValidationError;
  email: ValidationError;
  password: ValidationError;
  confirmPassword: ValidationError;
}

export interface ISignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_FORM: ISignupForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const INITIAL_SIGNUP_ERRORS: ISignupErrors = {
  name: {
    isValid: true,
    message: ''
  },
  email: {
    isValid: true,
    message: '',
    validate: (form: ISignupForm) => isValidEmail(form.email)
  },
  password: {
    isValid: true,
    message: '',
    validate: (form: ISignupForm) => moreThenEight(form.password)
  },
  confirmPassword: {
    isValid: true,
    message: '',
    validate: (form: ISignupForm) =>
      comparePassword(form.password, form.confirmPassword)
  }
};

const Signup = () => {
  const { form, errors, handleChange, validationErrors } = useForms(
    INITIAL_FORM,
    INITIAL_SIGNUP_ERRORS
  );

  const theme = useTheme();
  const notify = useNotification();
  const navigate = useNavigate();
  const [isCreationUserLoading, setCreationUserLoading] =
    useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = validationErrors();

    if (isFormValid) {
      createUser(form);
    }
  };

  const createUser = (form: ISignupForm) => {
    setCreationUserLoading(true);
    setServerError('');
    signupAPI(form)
      .then(() => {
        notify.showNotification(
          'User has been successfully created!',
          'success'
        );
        navigate('/signin');
      })
      .catch((error) => {
        setServerError(error.response.data.message);
      })
      .finally(() => {
        setCreationUserLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Sign up</title>
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                error={!errors.name.isValid}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                onChange={handleChange}
                helperText={errors.name.message}
              />
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
                error={!errors.password.isValid}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                helperText={errors.password.message}
              />
              <TextField
                error={!errors.confirmPassword.isValid}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={handleChange}
                helperText={errors.confirmPassword.message}
              />
              <Typography
                //@ts-ignore
                color={theme.colors.error.main}
              >
                {serverError}
              </Typography>

              <LoadingButton
                loading={isCreationUserLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {'Do you have already an account? Sign in'!}
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

export default Signup;
