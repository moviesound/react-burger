/*import {
	ORDER_FAILED,
	ORDER_SUCCESS,
	ORDER_SENDING_IS_IN_PROCESS,
	ADD_BUN,
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SORT_INGREDIENTS,
} from '../actions/order';
import {
	TIngredient,
	TOderInitialState,
	TOrderActions,
} from '../../utils/types';

const orderInitialState: TOderInitialState = {
	order: undefined,
	orderIngredients: undefined,
	requestProcess: false,
	requestFailed: false,
	bunWasAdded: false,
};

export const orderReducer = (
	state = orderInitialState,
	action: TOrderActions
): TOderInitialState => {
	switch (action.type) {
		case ORDER_SENDING_IS_IN_PROCESS: {
			return {
				...state,
				requestProcess: true,
				requestFailed: false,
			};
		}
		case ORDER_FAILED: {
			return {
				...state,
				requestFailed: true,
				requestProcess: false,
			};
		}
		case ORDER_SUCCESS: {
			return {
				...state,
				requestProcess: false,
				requestFailed: false,
				order: action.orderInfo,
			};
		}
		case ADD_BUN: {
			if (!action.bun || !action.bun._id || !action.bunIds) return state;

			const obj = { ...state, bunWasAdded: action.bun._id };
			if (typeof state.orderIngredients !== 'undefined') {
				obj.orderIngredients = [
					action.bun._id, //first element must be bun
					...state.orderIngredients.filter(
						(item: string): boolean =>
							action.bunIds ? !action.bunIds.includes(item) : false //ingredients
					),
					action.bun._id, //last element must be bun
				];
			} else {
				obj.orderIngredients = [
					action.bun._id, //first element must be bun
					action.bun._id, //last element must be bun
				];
			}

			return obj;
		}
		case ADD_INGREDIENT: {
			// sort array of ingredients for order when ingredient (not bun) is added to the end of the array,
			// the last element must be bun, we change indexes of last added ingredient and second bun
			if (
				typeof state.orderIngredients === 'undefined' ||
				typeof action.ingredient === 'undefined' ||
				typeof action.ingredient._id === 'undefined'
			) {
				return state;
			}

			let newArray: Array<string> = [];
			if (typeof state.orderIngredients !== 'undefined') {
				newArray = [...state.orderIngredients, action.ingredient._id];
			} else {
				newArray = [action.ingredient._id];
			}

			if (newArray.length > 2) {
				if (state.bunWasAdded !== false) {
					const ingredientId: string = newArray[newArray.length - 1];
					newArray[newArray.length - 1] = newArray[newArray.length - 2];
					newArray[newArray.length - 2] = ingredientId;
				}
			}
			return {
				...state,
				orderIngredients: newArray,
			};
		}
		case REMOVE_INGREDIENT: {
			if (typeof state.orderIngredients === 'undefined') {
				return state;
			}

			return {
				...state,
				orderIngredients: [...state.orderIngredients].filter((item, index) => {
					if (action.ingredient && action.index) {
						return (
							item !== action.ingredient._id ||
							index !== action.index + (state.bunWasAdded === false ? 0 : 1)
						);
					}
				}),
			};
		}
		case SORT_INGREDIENTS: {
			if (typeof action.ingredients === 'undefined') return state;

			return {
				...state,
				orderIngredients:
					state.bunWasAdded !== false
						? [
								//have buns
								state.bunWasAdded, //first element must be bun
								...action.ingredients.map(
									(item: TIngredient) => item._id //ingredients
								),
								state.bunWasAdded, //last element must be bun
						  ]
						: [
								//no buns, only ingredients
								...action.ingredients.map(
									(item: TIngredient) => item._id //ingredients
								),
						  ],
			};
		}
		default:
			return state;
	}
};
*/
