/*import {
	ADD_BUN,
	ADD_INGREDIENT,
	COUNT_SUM,
	REMOVE_INGREDIENT,
	SORT_INGREDIENTS,
} from '../actions/constructor';
import {
	TConstructorActions,
	TConstructorInitialState,
	TIngredient,
} from '../../utils/types';

const constructorInitialState: TConstructorInitialState = {
	ingredientList: [],
	bun: null,
	sum: 0,
	bunWasAdded: false,
};

export const constructorReducer = (
	state = constructorInitialState,
	action: TConstructorActions
): TConstructorInitialState => {
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
					(ingredient: TIngredient, index: number): boolean => {
						if (
							typeof action === 'undefined' ||
							typeof action.ingredient === 'undefined' ||
							typeof action.ingredient._id === 'undefined'
						) {
							return false;
						}
						return (
							ingredient._id !== action.ingredient._id || index !== action.index
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
					[...state.ingredientList].reduce(
						(acc: number, val: TIngredient): number => {
							return acc + val.price;
						},
						0
					) + (state.bun && state.bun.price ? state.bun.price * 2 : 0),
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
*/
