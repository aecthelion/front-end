import axios from "axios";
import {ILogin} from "../../../models/IAuth";
import {createAsyncThunk} from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/auth";

/*
export const loginUser = (userData: ILogin) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.loginFetching())
        const response = await axios.post(`${API_URL}/login`, userData);
        dispatch(authSlice.actions.loginFetchingSuccess(response.data))
    } catch (e) {
        dispatch(authSlice.actions.loginFetchingError(e.message))
    }
}
*/

export const loginUser = createAsyncThunk('auth/login', async (userData: ILogin, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data
    } catch (e) {
        console.log(e)
        return thunkAPI.rejectWithValue(e.response.data.message)
    }
})