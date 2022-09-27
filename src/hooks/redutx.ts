import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from "../store/store";
import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState<any, any, any>> = useSelector