/*import { TDragObject, TIngredient } from '../../utils/types';
import { AppDispatch } from '../store';

export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const COUNT_SUM = 'COUNT_SUM';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export function addIngredientToConstructor(
	item: TDragObject,
	ingredients: TIngredient[],
	bunIds: string[],
	type: string
) {
	return function (dispatch: AppDispatch) {
		if (type === 'not-bun') {
			for (const i in ingredients) {
				if (ingredients[i]._id === item.id && ingredients[i].type !== 'bun') {
					dispatch({
						type: 'ADD_INGREDIENT',
						ingredient: ingredients[i],
						bunIds: bunIds,
						key: parseInt(i, 10),
						id: Math.ceil(Math.random() * 10000000),
						count: ingredients[i].count + 1,
					});
					break;
				}
			}
		} else if (type === 'bun') {
			for (const i in ingredients) {
				if (ingredients[i].type === 'bun' && ingredients[i].count > 0) {
					dispatch({
						type: 'REMOVE_BUN',
						bun: ingredients[i],
						ingredient: ingredients[i],
						bunIds: bunIds,
						key: parseInt(i, 10),
					});
				}
			}
			for (const i in ingredients) {
				if (ingredients[i]._id === item.id && ingredients[i].type === 'bun') {
					dispatch({
						type: 'ADD_BUN',
						count: 2,
						bun: ingredients[i],
						ingredient: ingredients[i],
						bunIds: bunIds,
						key: parseInt(i, 10),
					});
					break;
				}
			}
		}
		dispatch({ type: 'COUNT_SUM' });
	};
}
*/
