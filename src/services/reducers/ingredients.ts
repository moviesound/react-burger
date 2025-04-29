/*import {
	DOWNLOAD_INGREDIENTS_FAILED,
	DOWNLOAD_INGREDIENTS_IS_IN_PROCESS,
	DOWNLOAD_INGREDIENTS_SUCCESS,
	ADD_BUN,
	REMOVE_BUN,
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
} from '../actions/ingredients';
import {
	TIngredient,
	TIngredientsActions,
	TIngredientsInitialState,
} from '@utils/types';

const ingredientsInitialState: TIngredientsInitialState = {
	ingredients: [],
	bunIds: [],
	requestProcess: false,
	requestFailed: false,
};

export const ingredientsReducer = (
	state = ingredientsInitialState,
	action: TIngredientsActions
): TIngredientsInitialState => {
	switch (action.type) {
		case DOWNLOAD_INGREDIENTS_IS_IN_PROCESS: {
			return {
				...state,
				requestProcess: true,
				requestFailed: false,
			};
		}
		case DOWNLOAD_INGREDIENTS_FAILED: {
			return {
				...state,
				requestFailed: true,
				requestProcess: false,
			};
		}
		case DOWNLOAD_INGREDIENTS_SUCCESS: {
			return {
				...state,
				requestProcess: false,
				requestFailed: false,
				ingredients: action.ingredients,
				bunIds: action.ingredients
					.filter((item) => item.type === 'bun')
					.map((item) => item._id),
			};
		}
		case REMOVE_BUN: {
			return {
				...state,
				ingredients: [
					...state.ingredients.slice(0, action.key),
					Object.assign({}, action.ingredient, { count: 0 }),
					...state.ingredients.slice(action.key + 1),
				],
			};
		}
		case ADD_INGREDIENT:
		case ADD_BUN: {
			return {
				...state,
				ingredients: [
					...state.ingredients.slice(0, action.key),
					Object.assign({}, action.ingredient, { count: action.count }),
					...state.ingredients.slice(action.key + 1),
				],
			};
		}
		case REMOVE_INGREDIENT: {
			return {
				...state,
				ingredients: [
					...state.ingredients.map((item) => {
						//decrease count
						if (action.ingredient && item._id === action.ingredient._id) {
							if (item.count) {
								item.count = item.count - 1;
							}
						}
						return item;
					}),
				],
			};
		}
		default:
			return state;
	}
};
*/
