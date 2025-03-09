import { HIDE_MODAL, SHOW_MODAL, LOAD_CONTENT } from '../actions/modal';

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
				modalIsVisible: false,
				modalType: null,
				modalHeader: '',
				modalContent: '',
			};
		}
		case SHOW_MODAL: {
			return {
				...state,
				modalIsVisible: true,
				modalType: action.modalType,
				modalHeader: action.modalHeader,
				modalContent: action.modalContent,
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
