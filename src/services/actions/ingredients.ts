import { api } from '../../utils/api';
import { AppDispatch } from '../store';

export const DOWNLOAD_INGREDIENTS_IS_IN_PROCESS =
	'DOWNLOAD_INGREDIENTS_IS_IN_PROCESS';
export const DOWNLOAD_INGREDIENTS_FAILED = 'DOWNLOAD_INGREDIENTS_FAILED';
export const DOWNLOAD_INGREDIENTS_SUCCESS = 'DOWNLOAD_INGREDIENTS_SUCCESS';
export const ADD_BUN = 'ADD_BUN';
export const REMOVE_BUN = 'REMOVE_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export function downloadIngredients() {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: 'DOWNLOAD_INGREDIENTS_IS_IN_PROCESS',
		});
		api.downloadIngredients(dispatch, null);
	};
}
