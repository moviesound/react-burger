import {
	LOAD_INGREDIENT,
	CLEAR_INGREDIENT,
	DOWNLOAD_INGREDIENT_SUCCESS,
	DOWNLOAD_INGREDIENT_FAILED,
	DOWNLOAD_INGREDIENT_IS_IN_PROCESS,
} from '../actions/ingredient';
import { TIngredientInitialState, TIngredientActions } from '@utils/types';

const ingredientInitialState: TIngredientInitialState = {
	ingredient: null,
	requestProcess: false,
	requestFailed: false,
};

export const ingredientReducer = (
	state = ingredientInitialState,
	action: TIngredientActions
): TIngredientInitialState => {
	switch (action.type) {
		case DOWNLOAD_INGREDIENT_IS_IN_PROCESS: {
			return {
				...state,
				requestProcess: true,
				requestFailed: false,
			};
		}
		case DOWNLOAD_INGREDIENT_FAILED: {
			return {
				...state,
				requestFailed: true,
				requestProcess: false,
			};
		}
		case DOWNLOAD_INGREDIENT_SUCCESS: {
			return {
				...state,
				requestProcess: false,
				requestFailed: false,
				ingredient: action.ingredient,
			};
		}
		case LOAD_INGREDIENT: {
			return {
				...state,
				ingredient: action.ingredient,
			};
		}
		case CLEAR_INGREDIENT: {
			return {
				...state,
				ingredient: null,
			};
		}
		default:
			return state;
	}
};
