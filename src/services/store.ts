/*import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { reducer, RootState } from './reducers';
//import {customMiddleware} from "./middleware/custom-middleware.ts";
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import { TDispatchActionsTotal } from '../utils/types';

type AppActions = TDispatchActionsTotal;

export const store = configureStore({
	reducer,
});

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AppActions
>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
*/
