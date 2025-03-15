import {
	DOWNLOAD_INGREDIENTS_FAILED,
	DOWNLOAD_INGREDIENTS_IS_IN_PROCESS,
	DOWNLOAD_INGREDIENTS_SUCCESS,
	ADD_BUN,
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
} from '../actions/ingredients';

const ingredientsInitialState = {
	ingredients: [],
	bunIds: [],
	requestProcess: false,
	requestFailed: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
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
				ingredients: action.ingredients.data,
				bunIds: action.ingredients.data
					.filter((item) => item.type === 'bun')
					.map((item) => item._id),
			};
		}
		case ADD_INGREDIENT:
		case ADD_BUN: {
			return {
				...state,
				ingredients: [
					...state.ingredients.map((item) => {
						if (action.bun && item.type === 'bun') {
							//remove all buns count
							item.count = 0;
						}
						//add count
						if (
							(action.ingredient && item._id === action.ingredient._id) ||
							(action.bun && item._id === action.bun._id)
						) {
							if (item.type !== 'bun') {
								item.count = (item.count ?? 0) + 1;
							} else if (item.type === 'bun') {
								item.count = 2;
							}
						}
						return item;
					}),
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
