import axios, { AxiosRequestConfig } from 'axios';
import { setLogout } from 'src/redux/slice/userSlice';
import { getToken } from 'src/utils/token';
import { store } from '../redux/store';

export const baseURL = 'http://localhost:5000/';

const api = axios.create({
  baseURL,
  responseType: 'json'
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (401 === error.response.status) {
      store.dispatch(store.dispatch(setLogout()));

      // handle error: inform user, go to login, etc
    }

    return Promise.reject(error);
  }
);

export default api;
