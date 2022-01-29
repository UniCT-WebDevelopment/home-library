import App from './App';
import ReactDOM from 'react-dom';
import 'src/utils/chart';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';

import 'nprogress/nprogress.css';
import { SidebarProvider } from './contexts/SidebarContext';
import { Provider } from 'react-redux';

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
