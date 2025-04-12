import { AppDispatch } from '../store';
import React from 'react';

export const HIDE_MODAL = 'HIDE_MODAL';
export const SHOW_MODAL = 'SHOW_MODAL';
export const LOAD_CONTENT = 'LOAD_CONTENT';
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT';
export const SHOW_POPUP_MODAL = 'SHOW_POPUP_MODAL';
export const HIDE_POPUP_MODAL = 'HIDE_POPUP_MODAL';

export const closeModal = (
	modalType: string | undefined | null,
	closeBtn: HTMLDivElement | null,
	overlay: HTMLDivElement | null,
	modal: HTMLDivElement | null
) => {
	return function (dispatch: AppDispatch) {
		//remove event listeners of modal window
		if (closeBtn !== null) {
			closeBtn.removeEventListener('click', () => {
				dispatch(closeModal(modalType, closeBtn, overlay, modal));
			});
		}
		if (overlay !== null) {
			overlay.removeEventListener('click', () => {
				dispatch(closeModal(modalType, closeBtn, overlay, modal));
			});
		}
		if (modal !== null) {
			modal.removeEventListener('click', (event: MouseEvent) => {
				event.stopPropagation();
			});
		}
		//hide modal
		dispatch({ type: 'HIDE_MODAL' });
		dispatch({ type: 'HIDE_POPUP_MODAL' });
	};
};

export const loadModal = (
	type: string | null | undefined,
	header: string | null | undefined,
	content: string | number | React.JSX.Element,
	modalCallType = 'popup'
) => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: 'SHOW_MODAL',
			modalHeader: header,
			modalType: type,
			modalContent: content,
		});
		if (modalCallType === 'popup') {
			dispatch({ type: 'SHOW_POPUP_MODAL' });
		}
	};
};

export const loadModalContent = (
	content: string | number | React.JSX.Element | null
) => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: 'LOAD_CONTENT',
			modalContent: content,
		});
	};
};
