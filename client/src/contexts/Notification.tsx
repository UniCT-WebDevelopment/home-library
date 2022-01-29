import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { createContext, useContext } from 'react';

type NotificationContextActions = {
  showNotification: (text: string, typeColor: AlertColor) => void;
};

const NotificationContext = createContext<NotificationContextActions | null>(
  null
);

interface SnackBarContextProviderProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<SnackBarContextProviderProps> = ({
  children
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [alertColor, setAlertcolor] = React.useState<AlertColor>();

  const showNotification = (text: string, color: AlertColor) => {
    setMessage(text);
    setAlertcolor(color);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alertColor || 'success'}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = (): NotificationContextActions => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within an NotificationProvider'
    );
  }

  return context;
};

export { NotificationProvider, useNotification };
