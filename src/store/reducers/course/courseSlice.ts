import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserUpdateModal } from '../../../components/modals/userUpdateModal';
import courseService from './courseService';
import { IStatus } from './../../../models/IStatus';
import { ICourseListParams, ICourse } from '../../../models/ICourse';

interface ICourseReducer {
  updateCourse: {
    statuses: IStatus;
  };
  courseList: {
    statuses: IStatus;
    totalPages: number;
    currentPage: number;
    courses: ICourse[] | [];
  };
}

export interface IUpdateCourse {
  course: IUserUpdateModal;
  courseId: string;
}

const initialState: ICourseReducer = {
  courseList: {
    courses: [],
    totalPages: 1,
    currentPage: 1,
    statuses: {
      isError: false,
      isSuccess: false,
      isLoading: false,
      error: '',
    },
  },
  updateCourse: {
    statuses: {
      isError: false,
      isSuccess: false,
      isLoading: false,
      error: '',
    },
  },
};

export const updateCourse = createAsyncThunk(
  'course/update',
  async (data: IUpdateCourse, thunkApi) => {
    try {
      return await courseService.update(data);
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

export const getCourses = createAsyncThunk(
  'course/get',
  async (courseListParams: ICourseListParams, thunkApi) => {
    try {
      return await courseService.get(courseListParams);
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

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    resetCourseList: (state) => {
      state.courseList = {
        totalPages: 1,
        currentPage: 1,
        statuses: {
          isError: false,
          isSuccess: false,
          isLoading: false,
          error: '',
        },
        courses: [],
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
    changeCoursePage: (state, action) => {
      state.courseList.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCourse.pending, (state) => {
        state.updateCourse.statuses.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.updateCourse.statuses.isError = false;
        state.updateCourse.statuses.isSuccess = true;
        state.courseList.courses = [...state.courseList.courses].map((v) => {
          if (v._id === action.payload.user._id) {
            return action.payload.user;
          } else {
            return v;
          }
        });
        state.updateCourse.statuses.isLoading = false;
      })
      .addCase(updateCourse.rejected, (state, action: PayloadAction<any>) => {
        state.updateCourse.statuses.isLoading = false;
        state.updateCourse.statuses.isError = true;
        state.updateCourse.statuses.error = action.payload;
      })
      .addCase(getCourses.pending, (state) => {
        state.courseList.statuses.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.courseList.statuses.isLoading = false;
        state.courseList.courses = action.payload.courses;
        state.courseList.totalPages = action.payload.totalPages;
        state.courseList.currentPage = action.payload.currentPage;
      })
      .addCase(getCourses.rejected, (state, action: PayloadAction<any>) => {
        state.courseList.statuses.isLoading = false;
        state.courseList.statuses.isError = true;
        state.courseList.statuses.error = action.payload;
        state.courseList.courses = [];
      });
  },
});

export const {
  resetCourseList: resetList,
  resetStatus,
  changeCoursePage,
} = courseSlice.actions;
export default courseSlice.reducer;
