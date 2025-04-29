/*import { api } from '../../utils/api';
import { AppDispatch } from '../store';

export const LOAD_INGREDIENT = 'LOAD_INGREDIENT';
export const DOWNLOAD_INGREDIENT_IS_IN_PROCESS = 'DOWNLOAD_INGREDIENT_IS_IN_PROCESS';
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT';
export const DOWNLOAD_INGREDIENT_FAILED = 'DOWNLOAD_INGREDIENT_FAILED';
export const DOWNLOAD_INGREDIENT_SUCCESS = 'DOWNLOAD_INGREDIENT_SUCCESS';

export function downloadIngredient(id: string) {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: 'DOWNLOAD_INGREDIENT_IS_IN_PROCESS',
		});
		api.downloadIngredients(dispatch, id);
	};
}
*/
