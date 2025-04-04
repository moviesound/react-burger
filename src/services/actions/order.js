import OrderDetails from '../../components/modal/order-details/order-details';
import { api } from '../../utils/api';

export const ORDER_SENDING_IS_IN_PROCESS = 'ORDER_SENDING_IS_IN_PROCESS';
export const ORDER_FAILED = 'ORDER_FAILED';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';
export const LOAD_CONTENT = 'LOAD_CONTENT';

export function order(ingredientIds) {
	return function (dispatch) {
		dispatch({
			type: ORDER_SENDING_IS_IN_PROCESS,
		});
		api.sendOrder(dispatch, ingredientIds);
	};
}
