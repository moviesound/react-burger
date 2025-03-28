export const HIDE_MODAL = 'HIDE_MODAL';
export const SHOW_MODAL = 'SHOW_MODAL';
export const LOAD_CONTENT = 'LOAD_CONTENT';
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT';
export const SHOW_POPUP_MODAL = 'SHOW_POPUP_MODAL';
export const HIDE_POPUP_MODAL = 'HIDE_POPUP_MODAL';

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
		dispatch({ type: HIDE_POPUP_MODAL });
	};
};

export const loadModal = (
	type = '',
	header = '',
	content = null,
	modalCallType = 'popup'
) => {
	return function (dispatch) {
		dispatch({
			type: SHOW_MODAL,
			modalHeader: header,
			modalType: type,
			modalContent: content,
		});
		if (modalCallType === 'popup') {
			dispatch({ type: SHOW_POPUP_MODAL });
		}
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
