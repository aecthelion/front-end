import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserUpdateModal } from '../../../components/modals/userUpdateModal';
import { IUser, IUserListParams } from '../../../models/IUser';

import usersService from './usersService';
import { IStatus } from './../../../models/IStatus';

interface IUsersReducer {
  updateUser: {
    statuses: IStatus;
  };
  usersList: {
    statuses: IStatus;
    totalPages: number;
    currentPage: number;
    users: IUser[] | [];
  };
}

export interface IUpdateUser {
  user: IUserUpdateModal;
  userId: string;
}

const initialState: IUsersReducer = {
  usersList: {
    users: [],
    totalPages: 1,
    currentPage: 1,
    statuses: {
      isError: false,
      isSuccess: false,
      isLoading: false,
      error: '',
    },
  },
  updateUser: {
    statuses: {
      isError: false,
      isSuccess: false,
      isLoading: false,
      error: '',
    },
  },
};

export const updateUser = createAsyncThunk(
  'users/update',
  async (data: IUpdateUser, thunkApi) => {
    try {
      return await usersService.update(data);
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

export const getUsers = createAsyncThunk(
  'users/get',
  async (userListParams: IUserListParams, thunkApi) => {
    try {
      return await usersService.get(userListParams);
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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetList: (state) => {
      state.usersList = {
        totalPages: 1,
        currentPage: 1,
        statuses: {
          isError: false,
          isSuccess: false,
          isLoading: false,
          error: '',
        },
        users: [],
      };
    },
    resetStatus: (state, action) => {
      state[action.payload as keyof typeof initialState].statuses = {
        isError: false,
        isSuccess: false,
        isLoading: false,
        error: '',
      };
    },
    changeUserPage: (state, action) => {
      state.usersList.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.updateUser.statuses.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUser.statuses.isError = false;
        state.updateUser.statuses.isSuccess = true;
        state.usersList.users = [...state.usersList.users].map((v) => {
          if (v._id === action.payload.user._id) {
            return action.payload.user;
          } else {
            return v;
          }
        });
        state.updateUser.statuses.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.updateUser.statuses.isLoading = false;
        state.updateUser.statuses.isError = true;
        state.updateUser.statuses.error = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.usersList.statuses.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersList.statuses.isLoading = false;
        state.usersList.users = action.payload.users;
        state.usersList.totalPages = action.payload.totalPages;
        state.usersList.currentPage = action.payload.currentPage;
      })
      .addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
        state.usersList.statuses.isLoading = false;
        state.usersList.statuses.isError = true;
        state.usersList.statuses.error = action.payload;
        state.usersList.users = [];
      });
  },
});

export const { resetList, resetStatus, changeUserPage } = usersSlice.actions;
export default usersSlice.reducer;
