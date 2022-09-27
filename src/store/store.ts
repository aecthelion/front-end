import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import vacancyApplicationReducer from "../features/vacancyApplication/vacancyApplicationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vacancyApplications: vacancyApplicationReducer
  },
});

export type AppDispatch = typeof store.dispatch;
