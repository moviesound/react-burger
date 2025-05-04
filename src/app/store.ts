import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth';
import profileReducer from '../features/profile';
import modalReducer from '../features/modal';
import constructorReducer from '../features/constructor';
import orderReducer from '../features/order';
import { apiSlice } from '../features/api/api-slice';
import { apiDefendedSlice } from '../features/api/api-defended-slice';
import ingredientsReducer from '../features/ingredients';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		profile: profileReducer,
		modal: modalReducer,
		burgerConstructor: constructorReducer,
		order: orderReducer,
		ingredients: ingredientsReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[apiDefendedSlice.reducerPath]: apiDefendedSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		//getDefaultMiddleware({ thunk: { extraArgument }}).concat(apiSlice.middleware),
		getDefaultMiddleware()
			.concat(apiSlice.middleware)
			.concat(apiDefendedSlice.middleware),
});
