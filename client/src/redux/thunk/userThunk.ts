import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeToken, setToken } from '../../utils/token';
import axiosApi from '../../services/axiosConfig';
import jwtDecode from 'jwt-decode';

export const signIn = createAsyncThunk('auth/signin', async (payload: any) => {
  try {
    const response = await axiosApi.post('/signin', payload);
    const jwtDecoded = jwtDecode(response.data?.token);
    setToken(response.data?.token);
    return {
      //@ts-ignore
      user: jwtDecoded?.user,
      token: response.data?.token
    };
  } catch (error) {
    throw error.response.data;
  }
});

export const signOut = createAsyncThunk('auth/signout', async () => {
  removeToken();
});
