import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IVacancy,
  IVacancyUpdatePayload,
  IVacancyListParams,
} from '../../../models/IVacancy';
import vacancyService from './vacancyService';

interface IVacancyReducer {
  vacancies: IVacancy[] | [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: IVacancyReducer = {
  vacancies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: '',
};

export const createVacancy = createAsyncThunk(
  'vacancies/create',
  async (vacancyApplication: IVacancy, thunkApi) => {
    try {
      return await vacancyService.create(vacancyApplication);
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

export const updateVacancy = createAsyncThunk(
  'vacancies/update',
  async (vacancyApplication: IVacancyUpdatePayload, thunkApi) => {
    try {
      return await vacancyService.update(vacancyApplication);
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

export const getVacancies = createAsyncThunk(
  'vacancies/get',
  async (vacancyApplicationListParams: IVacancyListParams, thunkApi) => {
    try {
      return await vacancyService.get(vacancyApplicationListParams);
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

export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = '';
      state.vacancies = [];
    },
    resetStatus: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVacancy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vacancies = [...state.vacancies, action.payload];
      })
      .addCase(createVacancy.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.vacancies = [];
      })
      .addCase(updateVacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVacancy.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.vacancies = [...state.vacancies].map((v) => {
          if (v._id === action.payload._id) {
            return {
              ...v,
              status: action.payload.status,
            };
          } else {
            return v;
          }
        });
        state.isLoading = false;
      })
      .addCase(updateVacancy.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(getVacancies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vacancies = action.payload;
      })
      .addCase(getVacancies.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.vacancies = [];
      });
  },
});

export const { reset, resetStatus } = vacancySlice.actions;
export default vacancySlice.reducer;
