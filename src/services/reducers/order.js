import {
	ORDER_FAILED,
	ORDER_SUCCESS,
	ORDER_SENDING_IS_IN_PROCESS,
	ADD_BUN,
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SORT_INGREDIENTS,
} from '../actions/order';

const orderInitialState = {
	order: null,
	orderIngredients: [],
	requestProcess: false,
	requestFailed: false,
	bunWasAdded: false,
};

export const orderReducer = (state = orderInitialState, action) => {
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
			return {
				...state,
				orderIngredients: [
					action.bun._id, //first element must be bun
					...state.orderIngredients.filter(
						(item) => !action.bunIds.includes(item) //ingredients
					),
					action.bun._id, //last element must be bun
				],
				bunWasAdded: action.bun._id,
			};
		}
		case ADD_INGREDIENT: {
			// sort array of ingredients for order when ingredient (not bun) is added to the end of the array,
			// the last element must be bun, we change indexes of last added ingredient and second bun
			let newArray = [...state.orderIngredients, action.ingredient._id];
			if (newArray.length > 2) {
				if (state.bunWasAdded !== false) {
					let ingredientId = newArray[newArray.length - 1];
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
			return {
				...state,
				orderIngredients: [...state.orderIngredients].filter((item, index) => {
					return item !== action.ingredient._id || index !== action.index + (state.bunWasAdded === false ? 0 : 1);
				}),
			};
		}
		case SORT_INGREDIENTS: {
			return {
				...state,
				orderIngredients:
					state.bunWasAdded !== false
						? [
								//have buns
								state.bunWasAdded, //first element must be bun
								...action.ingredients.map(
									(item) => item._id //ingredients
								),
								state.bunWasAdded, //last element must be bun
						  ]
						: [
								//no buns, only ingredients
								...action.ingredients.map(
									(item) => item._id //ingredients
								),
						  ],
			};
		}
		default:
			return state;
	}
};
