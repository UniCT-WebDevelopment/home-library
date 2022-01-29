import { createSlice } from '@reduxjs/toolkit';
import { removeToken } from 'src/utils/token';
import { signIn, signOut } from '../thunk/userThunk';

export interface UserSliceState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  error: string;
  token: string;
}

const initialState: UserSliceState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  token: '',
  error: '' // Backend error
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogout(state) {
      state.isAuthenticated = false;
      state.user = {};
      removeToken();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = null;
        state.error = '';
      })
      .addCase(signIn.pending, (state, action) => {
        state.isLoading = true;
        state.user = {};
        state.error = '';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.user = {};
        state.isAuthenticated = false;
      });
  }
});

const { reducer, actions } = userSlice;

export const { setLogout } = actions;

export default reducer;
