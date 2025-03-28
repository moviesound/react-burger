import { HIDE_MODAL, SHOW_MODAL, LOAD_CONTENT, SHOW_POPUP_MODAL, HIDE_POPUP_MODAL } from '../actions/modal';

const modalInitialState = {
	modalIsVisible: false,
	modalType: null,
	modalHeader: '',
	modalContent: '',
};

export const modalReducer = (state = modalInitialState, action) => {
	switch (action.type) {
		case HIDE_MODAL: {
			return {
				...state,
				modalType: null,
				modalHeader: '',
				modalContent: '',
			};
		}
		case SHOW_MODAL: {
			return {
				...state,
				modalType: action.modalType,
				modalHeader: action.modalHeader,
				modalContent: action.modalContent,
			};
		}
		case SHOW_POPUP_MODAL: {
			return {
				...state,
				modalIsVisible: true,
			};
		}
		case HIDE_POPUP_MODAL: {
			return {
				...state,
				modalIsVisible: false,
			};
		}
		case LOAD_CONTENT: {
			return {
				...state,
				modalContent: state.modalIsVisible === true ? action.modalContent : '',
			};
		}
		default: {
			return state;
		}
	}
};
