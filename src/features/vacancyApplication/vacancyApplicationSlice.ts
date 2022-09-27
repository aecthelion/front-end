import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import vacancyApplicationService from "./vacancyApplicationService";

//get user
const user = JSON.parse(localStorage.getItem("user") || "null");

export interface IVacancyApplication {
    _id?: string
    userId: string
    jobTitle: string
    companyName: string
    vacancyLink: string
    courseType: string
    country: string
    city: string
    status: string
    isRemote: boolean
}


export interface IVacancyApplicationUpdatePayload {
    _id: string,
    status: string,
}

export interface IVacancyApplicationListParams {
    page: number,
    pageSize: number,
    searchParams?: string,
}

export interface IVacancyApplicationReducer {
    vacancyApplications: IVacancyApplication[] | [];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState = {
    vacancyApplications: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

//register user
export const createVacancyApplication = createAsyncThunk(
    "vacancies/create",
    async (vacancyApplication: IVacancyApplication, thunkApi) => {
        try {
            return await vacancyApplicationService.create(vacancyApplication);
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

export const updateVacancyApplication = createAsyncThunk(
    "vacancies/update",
    async (vacancyApplication: IVacancyApplicationUpdatePayload, thunkApi) => {
        try {
            return await vacancyApplicationService.update(vacancyApplication);
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

export const getVacancyApplications = createAsyncThunk(
    "vacancies/get",
    async (vacancyApplicationListParams: IVacancyApplicationListParams, thunkApi) => {
        try {
            return await vacancyApplicationService.get(vacancyApplicationListParams);
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

export const vacancyApplicationSlice = createSlice({
    name: "vacancyApplication",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.vacancyApplications = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createVacancyApplication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createVacancyApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vacancyApplications = action.payload;
            })
            .addCase(createVacancyApplication.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.vacancyApplications = [];
            })
            .addCase(updateVacancyApplication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateVacancyApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                // @ts-ignore
                state.vacancyApplications = state.vacancyApplications.map((v) => v?._id === action.payload._id ? ({
                    // @ts-ignore
                    ...v,
                    status: action.payload.status
                }) : v);


            })
            .addCase(updateVacancyApplication.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getVacancyApplications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVacancyApplications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vacancyApplications = action.payload;
            })
            .addCase(getVacancyApplications.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.vacancyApplications = [];
            })
    },
});

export const {reset} = vacancyApplicationSlice.actions;
export default vacancyApplicationSlice.reducer;
