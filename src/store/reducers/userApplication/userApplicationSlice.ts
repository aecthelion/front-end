import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import userApplicationService from './userApplicationService';
import { IStatus } from '../../../models/IStatus';
import {
  IUserApplicationListParams,
  IUserApplication,
  IUpdateUserApplicationsStatus,
} from '../../../models/IUserApplication';

interface IUserApplicationReducer {
  applications: IUserApplication[] | [];
  applicationStatus: IStatus;
  newApplicationStatus: IStatus;
  updateApplicationStatus: IStatus;
  deleteApplicationStatus: IStatus;
  totalPages: number;
  currentPage: number;
}

const initialState: IUserApplicationReducer = {
  applications: [],
  applicationStatus: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    error: '',
  },
  newApplicationStatus: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    error: '',
  },
  updateApplicationStatus: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    error: '',
  },
  deleteApplicationStatus: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    error: '',
  },
  totalPages: 1,
  currentPage: 1,
};

type StatusKey = 'applicationStatus';

export const addUserApplication = createAsyncThunk(
  'userApplication/addUserApplication',
  async (userApplication: IUserApplication, thunkApi) => {
    try {
      return await userApplicationService.addUserApplication(userApplication);
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

export const getUserApplications = createAsyncThunk(
  'userApplication/get',
  async (userApplicationsList: IUserApplicationListParams, thunkApi) => {
    try {
      return await userApplicationService.getApplications(userApplicationsList);
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

export const updateUserApplicationStatus = createAsyncThunk(
  'userApplication/patch',
  async (applicationData: IUpdateUserApplicationsStatus, thunkApi) => {
    try {
      return await userApplicationService.updateUserApplicationStatus(
        applicationData
      );
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

export const deleteUserApplication = createAsyncThunk(
  'userApplication/delete',
  async (id: string, thunkApi) => {
    try {
      return await userApplicationService.deleteUserApplicationStatus(id);
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

export const userApplicationSlice = createSlice({
  name: 'userApplication',
  initialState,
  reducers: {
    resetUserApplicationStatus: (state, action) => {
      state[action.payload as StatusKey] = {
        isError: false,
        isSuccess: false,
        isLoading: false,
        error: '',
      };
    },
    changeApplicationPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserApplication.pending, (state) => {
        state.newApplicationStatus.isLoading = true;
      })
      .addCase(addUserApplication.fulfilled, (state, action) => {
        state.newApplicationStatus.isLoading = false;
        state.newApplicationStatus.isError = false;
        state.newApplicationStatus.isSuccess = true;
        state.applications = [...state.applications, action.payload];
      })
      .addCase(
        addUserApplication.rejected,
        (state, action: PayloadAction<any>) => {
          state.newApplicationStatus.isLoading = false;
          state.newApplicationStatus.isError = true;
          state.newApplicationStatus.error = action.payload;
        }
      )
      .addCase(updateUserApplicationStatus.pending, (state) => {
        state.updateApplicationStatus.isLoading = true;
      })
      .addCase(updateUserApplicationStatus.fulfilled, (state, action) => {
        state.updateApplicationStatus.isLoading = false;
        state.updateApplicationStatus.isError = false;
        state.updateApplicationStatus.isSuccess = true;
        state.applications = state.applications.map((ap) =>
          ap._id === action.payload.id
            ? { ...ap, status: action.payload.status }
            : ap
        );
      })
      .addCase(
        updateUserApplicationStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.updateApplicationStatus.isLoading = false;
          state.updateApplicationStatus.isError = true;
          state.updateApplicationStatus.error = action.payload;
        }
      )
      .addCase(deleteUserApplication.pending, (state) => {
        state.deleteApplicationStatus.isLoading = true;
      })
      .addCase(deleteUserApplication.fulfilled, (state, action) => {
        state.deleteApplicationStatus.isLoading = false;
        state.deleteApplicationStatus.isError = false;
        state.deleteApplicationStatus.isSuccess = true;
        state.applications = state.applications.filter(
          (ap) => ap._id !== action.payload.id
        );
      })
      .addCase(
        deleteUserApplication.rejected,
        (state, action: PayloadAction<any>) => {
          state.deleteApplicationStatus.isLoading = false;
          state.deleteApplicationStatus.isError = true;
          state.deleteApplicationStatus.error = action.payload;
        }
      )
      .addCase(getUserApplications.pending, (state) => {
        state.applicationStatus.isLoading = true;
      })
      .addCase(getUserApplications.fulfilled, (state, action) => {
        state.applicationStatus.isLoading = false;
        state.applications = action.payload.applications;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(
        getUserApplications.rejected,
        (state, action: PayloadAction<any>) => {
          state.applicationStatus.isLoading = false;
          state.applicationStatus.isError = true;
          state.applicationStatus.error = action.payload;
          state.applications = [];
        }
      );
  },
});

export const { resetUserApplicationStatus, changeApplicationPage } =
  userApplicationSlice.actions;
export default userApplicationSlice.reducer;
