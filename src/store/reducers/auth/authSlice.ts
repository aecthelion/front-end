import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";
import {loginUser} from "./actionCreators";

const user = JSON.parse(localStorage.getItem("user") || "null");


export interface IAuthState {
    user?: IUser;
    error: string;
    isLoading: boolean;
}

const initialState: IAuthState = {
    user: user ? user : null,
    error: '',
    isLoading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [loginUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false
            state.error = ''
            state.user = action.payload
        },
        [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    }

});
export default authSlice.reducer;
