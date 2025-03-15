import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';
import { modalReducer } from './modal';

export const rootReducer = combineReducers({
	constructorReducer: constructorReducer,
	ingredientsReducer: ingredientsReducer,
	ingredientReducer: ingredientReducer,
	orderReducer: orderReducer,
	modalReducer: modalReducer,
});
