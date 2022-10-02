import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import courseService from './courseService';
import { IStatus } from './../../../models/IStatus';
import { ICourseListParams, ICourse } from '../../../models/ICourse';

interface ICourseReducer {
  courseUpdate: {
    statuses: IStatus;
  };
  courseCreate: {
    statuses: IStatus;
  };
  courseList: {
    statuses: IStatus;
    totalPages: number;
    currentPage: number;
    courses: ICourse[] | [];
  };
}

export interface IUpdateCourseBody {
  title: string;
  type: string;
}

export interface IUpdateCourse {
  course?: IUpdateCourseBody;
  courseId?: string;
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
  courseUpdate: {
    statuses: {
      isError: false,
      isSuccess: false,
      isLoading: false,
      error: '',
    },
  },
  courseCreate: {
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

export const createCourse = createAsyncThunk(
  'course/create',
  async (data: FormData, thunkApi) => {
    try {
      return await courseService.create(data);
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
    resetCourseStatus: (state, action) => {
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
        state.courseUpdate.statuses.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.courseUpdate.statuses.isError = false;
        state.courseUpdate.statuses.isSuccess = true;
        state.courseList.courses = [...state.courseList.courses].map((v) => {
          if (v._id === action.payload.course._id) {
            return action.payload.course;
          } else {
            return v;
          }
        });
        state.courseUpdate.statuses.isLoading = false;
      })
      .addCase(updateCourse.rejected, (state, action: PayloadAction<any>) => {
        state.courseUpdate.statuses.isLoading = false;
        state.courseUpdate.statuses.isError = true;
        state.courseUpdate.statuses.error = action.payload;
      })

      .addCase(createCourse.pending, (state) => {
        state.courseCreate.statuses.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courseCreate.statuses.isError = false;
        state.courseCreate.statuses.isSuccess = true;
        state.courseList.courses = [
          ...state.courseList.courses,
          action.payload,
        ];
        state.courseCreate.statuses.isLoading = false;
      })
      .addCase(createCourse.rejected, (state, action: PayloadAction<any>) => {
        state.courseCreate.statuses.isLoading = false;
        state.courseCreate.statuses.isError = true;
        state.courseCreate.statuses.error = action.payload;
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

export const { resetCourseList, resetCourseStatus, changeCoursePage } =
  courseSlice.actions;
export default courseSlice.reducer;
