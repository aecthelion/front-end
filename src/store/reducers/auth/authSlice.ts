import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from './authService';
import { ILogin } from './../../../models/IAuth';
import { IUser } from '../../../models/IUser';
import { IStatus } from './../../../models/IStatus';

const user = JSON.parse(localStorage.getItem('user') || 'null');

interface IAuthReducer {
  user?: IUser | null;
  loginStatus: IStatus;
  registerStatus: IStatus;
}

const initialState: IAuthReducer = {
  user: user ? user : null,
  loginStatus: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    error: '',
  },
  registerStatus: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    error: '',
  },
};

type StatusKey = 'loginStatus' | 'registerStatus';

//register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (user: FormData, thunkApi) => {
    try {
      return await authService.registerUser(user);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSting();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: ILogin, thunkApi) => {
    try {
      return await authService.loginUser(loginData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSting();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthStatus: (state, action) => {
      state[action.payload as StatusKey] = {
        isError: false,
        isSuccess: false,
        isLoading: false,
        error: '',
      };
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerStatus.isLoading = false;
        state.registerStatus.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.registerStatus.isLoading = false;
        state.registerStatus.isError = true;
        state.registerStatus.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginStatus.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus.isLoading = false;
        state.loginStatus.isError = false;
        state.loginStatus.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loginStatus.isLoading = false;
        state.loginStatus.isError = true;
        state.loginStatus.error = action.payload;
        state.user = null;
      });
  },
});

export const { resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
