import OrderDetails from '../../components/modal/order-details/order-details';

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
		fetch('https://norma.nomoreparties.space/api/orders', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ingredients: ingredientIds }),
		})
			.then((res) => {
				if (!res.ok) {
					dispatch({
						type: ORDER_FAILED,
					});
					throw new Error(`Something went wrong: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				dispatch({
					type: ORDER_SUCCESS,
					orderInfo: data,
				});
				dispatch({
					type: LOAD_CONTENT,
					modalContent: <OrderDetails />,
				});
			})
			.catch((err) => {
				dispatch({
					type: ORDER_FAILED,
				});
				console.error(err);
			});
	};
}
