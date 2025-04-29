import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
	modalIsVisible: boolean;
	modalType?: string;
	modalHeader?: string;
	modalContent?: { type: string; text?: string };
}

interface IModalActions {
	modalType?: string;
	modalHeader?: string;
	modalContent?: { type: string; text?: string };
}

const initialState: IModalState = {
	modalIsVisible: false,
	modalType: undefined,
	modalHeader: '',
	modalContent: undefined,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
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
} = modalSlice.actions;

export default modalSlice.reducer;
