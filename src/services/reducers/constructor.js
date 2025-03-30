import {
	ADD_BUN,
	ADD_INGREDIENT,
	COUNT_SUM,
	REMOVE_INGREDIENT,
	SORT_INGREDIENTS,
} from '../actions/constructor';

const constructorInitialState = {
	ingredientList: [],
	bun: null,
	sum: 0,
	bunWasAdded: false,
};

export const constructorReducer = (state = constructorInitialState, action) => {
	switch (action.type) {
		case ADD_BUN: {
			return {
				...state,
				bun: action.bun,
				bunWasAdded: true,
			};
		}
		case ADD_INGREDIENT: {
			return {
				...state,
				ingredientList: [
					...state.ingredientList,
					{
						...action.ingredient,
						id: action.id,
					},
				],
			};
		}
		case REMOVE_INGREDIENT: {
			return {
				...state,
				ingredientList: [...state.ingredientList].filter(
					(ingredient, index) => {
						return (
							ingredient._id !== action.ingredient._id ||
							index !== action.index
							//index must be + 1, because action.index always starts from 1,
							//but index in ingredientList always starts from 0
						);
					}
				),
			};
		}
		case COUNT_SUM: {
			return {
				...state,
				sum:
					[...state.ingredientList].reduce((acc, val) => {
						return acc + val.price;
					}, 0) + (state.bun && state.bun.price ? state.bun.price * 2 : 0),
			};
		}
		case SORT_INGREDIENTS: {
			return {
				...state,
				ingredientList: action.ingredients,
			};
		}
		default: {
			return state;
		}
	}
};
