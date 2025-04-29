import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from './types/types';

interface IngredientsState {
	ingredients?: TIngredient[];
}

interface IIngredientsActions {
	ingredients?: TIngredient[];
	ingredient?: TIngredient;
	type?: string;
}

const initialState: IngredientsState = {
	ingredients: undefined,
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		loadIngredients: (state, action: PayloadAction<IIngredientsActions>) => {
			if (
				action.payload.ingredients &&
				action.payload.ingredients.length > 0 &&
				typeof state.ingredients === 'undefined'
			) {
				state.ingredients = action.payload.ingredients.map((ingredient) => {
					return Object.assign({}, ingredient, { count: 0 });
				});
			}
		},
		addIngredientCount: (state, action: PayloadAction<IIngredientsActions>) => {
			state.ingredients = state.ingredients
				? state.ingredients.map((ingredient) => {
						if (action.payload.ingredient) {
							if (
								action.payload.type &&
								action.payload.type === 'bun' &&
								ingredient.type === 'bun'
							) {
								// bun
								ingredient.count = 0;
								if (ingredient._id === action.payload.ingredient._id) {
									ingredient.count = 2;
								}
							} else if (ingredient._id === action.payload.ingredient._id) {
								// other ingredient
								ingredient.count += 1;
							}
						}
						return ingredient;
				  })
				: undefined;
		},
		removeIngredientCount: (
			state,
			action: PayloadAction<IIngredientsActions>
		) => {
			state.ingredients = state.ingredients
				? state.ingredients.map((ingredient) => {
						if (action.payload.ingredient) {
							if (ingredient.type !== 'bun') {
								if (ingredient._id === action.payload.ingredient._id)
									ingredient.count -= 1;
								if (ingredient.count < 0) ingredient.count = 0;
							}
						}
						return ingredient;
				  })
				: undefined;
		},
	},
});

export const { addIngredientCount, removeIngredientCount, loadIngredients } =
	ingredientsSlice.actions;

export default ingredientsSlice.reducer;
