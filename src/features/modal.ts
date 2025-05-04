import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from './types/types';

interface IModalState {
	modalIsVisible: boolean;
	modalType?: string;
	modalHeader?: string | number;
	modalContent?: { type: string; text?: string };
	list: TIngredient[];
}

interface IModalActions {
	modalType?: string;
	modalHeader?: string | number;
	modalContent?: { type: string; text?: string };
	list?: TIngredient[];
}

const initialState: IModalState = {
	modalIsVisible: false,
	modalType: undefined,
	modalHeader: '',
	modalContent: undefined,
	list: [],
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		saveList: (state, action: PayloadAction<IModalActions>) => {
			if (action.payload.list) {
				state.list = action.payload.list;
			}
		},
		hideModal(state) {
			state.modalType = undefined;
			state.modalHeader = '';
			state.modalContent = undefined;
		},
		showModal(state, action: PayloadAction<IModalActions>) {
			state.modalType = action.payload.modalType;
			state.modalHeader = action.payload.modalHeader;
			state.modalContent = action.payload.modalContent;
		},
		showPopupModal(state) {
			state.modalIsVisible = true;
		},
		hidePopupModal(state) {
			state.modalIsVisible = false;
		},
		loadContent(state, action: PayloadAction<IModalActions>) {
			state.modalContent =
				state.modalIsVisible === true ? action.payload.modalContent : undefined;
		},
	},
});

export const {
	hideModal,
	showModal,
	showPopupModal,
	hidePopupModal,
	loadContent,
	saveList,
} = modalSlice.actions;

export default modalSlice.reducer;
