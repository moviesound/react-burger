export const HIDE_MODAL = 'HIDE_MODAL';
export const SHOW_MODAL = 'SHOW_MODAL';
export const LOAD_CONTENT = 'LOAD_CONTENT';
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT';

export const closeModal = (modalType, closeBtn, overlay, modal) => {
	return function (dispatch) {
		//remove event listeners of modal window
		closeBtn.removeEventListener('click', () => {
			dispatch(closeModal(modalType, closeBtn, overlay, modal));
		});
		overlay.removeEventListener('click', () => {
			dispatch(closeModal(modalType, closeBtn, overlay, modal));
		});
		modal.removeEventListener('click', (event) => {
			event.stopPropagation();
		});
		//hide modal
		dispatch({ type: HIDE_MODAL });

		if (modalType === 'ingredient') {
			dispatch({ type: CLEAR_INGREDIENT });
		}
	};
};

export const openModal = (type = '', header = '', content = null) => {
	return function (dispatch) {
		dispatch({
			type: SHOW_MODAL,
			modalHeader: header,
			modalType: type,
			modalContent: content,
		});
	};
};

export const loadModalContent = (content = null) => {
	return function (dispatch) {
		dispatch({
			type: LOAD_CONTENT,
			modalContent: content,
		});
	};
};
