import { LOAD_INGREDIENT, CLEAR_INGREDIENT } from '../actions/ingredient';

const ingredientInitialState = {
	ingredient: null,
};

export const ingredientReducer = (state = ingredientInitialState, action) => {
	switch (action.type) {
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
