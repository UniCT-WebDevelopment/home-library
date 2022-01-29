import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { RootState, useAppSelector } from './redux/store';
import { NotificationProvider } from './contexts/Notification';

// Use LocalizationProvider to change the date-engine locale that is used to render the time picker
const App = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.user);
  const content = useRoutes(routes(isAuthenticated));

  return (
    <ThemeProvider>
      <NotificationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
export default App;
