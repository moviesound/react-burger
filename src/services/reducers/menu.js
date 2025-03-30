import { MENU_ITEM } from '../actions/menu';

const menuInitialState = {
	menu: null,
};

export const menuReducer = (state = menuInitialState, action) => {
	switch (action.type) {
		case MENU_ITEM: {
			return {
				...state,
				menu: action.menu,
			};
		}
		default: {
			return state;
		}
	}
};
