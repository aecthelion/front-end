import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth/authSlice';
import modal from './reducers/modal/modalSlice';
import users from './reducers/users/usersSlice';
import userApplication from './reducers/userApplication/userApplicationSlice';
import vacancies from './reducers/vacancy/vacancySlice';
import courses from './reducers/course/courseSlice';
import systemNotification from './reducers/systemNotification/systemNotification';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth,
  vacancies,
  modal,
  users,
  courses,
  systemNotification,
  userApplication,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
