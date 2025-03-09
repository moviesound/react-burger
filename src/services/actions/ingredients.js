export const DOWNLOAD_INGREDIENTS_IS_IN_PROCESS =
	'DOWNLOAD_INGREDIENTS_IS_IN_PROCESS';
export const DOWNLOAD_INGREDIENTS_FAILED = 'DOWNLOAD_INGREDIENTS_FAILED';
export const DOWNLOAD_INGREDIENTS_SUCCESS = 'DOWNLOAD_INGREDIENTS_SUCCESS';
export const COUNT_INGREDIENTS = 'COUNT_INGREDIENTS';
export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export function downloadIngredients() {
	return function (dispatch) {
		dispatch({
			type: DOWNLOAD_INGREDIENTS_IS_IN_PROCESS,
		});
		fetch('https://norma.nomoreparties.space/api/ingredients')
			.then((res) => {
				if (!res.ok) {
					dispatch({
						type: DOWNLOAD_INGREDIENTS_FAILED,
					});
					throw new Error(`Something went wrong: ${res.status}`);
				}
				return res.json();
			})
			.then((ingredients) => {
				dispatch({
					type: DOWNLOAD_INGREDIENTS_SUCCESS,
					ingredients: { ...ingredients, ingredients: ingredients.data },
				});
			})
			.catch((err) => {
				dispatch({
					type: DOWNLOAD_INGREDIENTS_FAILED,
				});
				console.error(err);
			});
	};
}
