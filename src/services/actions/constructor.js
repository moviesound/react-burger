export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const COUNT_SUM = 'COUNT_SUM';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export function addIngredientToConstructor(item, ingredients, bunIds, type) {
	return function (dispatch) {
		if (type === 'not-bun') {
			for (var i in ingredients) {
				if (ingredients[i]._id === item.id && ingredients[i].type !== 'bun') {
					dispatch({ type: ADD_INGREDIENT, ingredient: ingredients[i] });
					break;
				}
			}
		} else if (type === 'bun') {
			for (var i in ingredients) {
				if (ingredients[i]._id === item.id && ingredients[i].type === 'bun') {
					dispatch({ type: ADD_BUN, bun: ingredients[i], bunIds: bunIds });
					break;
				}
			}
		}
		dispatch({ type: COUNT_SUM });
	};
}
