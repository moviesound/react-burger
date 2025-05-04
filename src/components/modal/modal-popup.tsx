import React, { useEffect, useRef } from 'react';
import Modal from './modal';
import { useSelector, useDispatch } from '../../app/hooks';
import { useBeforeUnload } from 'react-router';
import { hideModal, hidePopupModal } from '../../features/modal';
import { addOrderInfo } from '../../features/order';

const ModalPopup = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const closeBtnRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const modalType = useSelector((state) => {
		return state.modal.modalType;
	});
	//addlistener close
	useEffect(() => {
		//add close Modal listeners
		//close button
		closeBtnRef.current?.addEventListener('click', (): void => {
			closeModal(
				modalType,
				closeBtnRef.current,
				overlayRef.current,
				modalRef.current
			);
		});
		//click on overlay
		overlayRef.current?.addEventListener('click', (): void => {
			closeModal(
				modalType,
				closeBtnRef.current,
				overlayRef.current,
				modalRef.current
			);
		});
		modalRef.current?.addEventListener('click', (event: MouseEvent): void => {
			event.stopPropagation();
		});
		//esc key
		document.addEventListener('keydown', closeModalEsc);
		return () => {
			//event listeners are removed in services/actions/order.js
			//in function closeModal
			//it's impossible to delete them here, an error occurs, because
			//element is deleted (disappear from DOM) before listeners removing

			//only this eventListner can be removed here
			if (closeModalEsc) {
				document.removeEventListener('keydown', closeModalEsc);
			}
		};
	}, [modalType, modalRef, overlayRef, closeBtnRef]);

	useBeforeUnload(() => {
		document.removeEventListener('keydown', closeModalEsc);
	});

	const closeModalEsc = (e: KeyboardEvent): void => {
		//close modal at esc
		if (e.key === 'Escape') {
			closeModal(
				modalType,
				closeBtnRef.current,
				overlayRef.current,
				modalRef.current
			);
		}
	};

	const closeModal = (
		modalType: string | undefined | null,
		closeBtn: HTMLDivElement | null,
		overlay: HTMLDivElement | null,
		modal: HTMLDivElement | null
	) => {
		if (modalType === 'order') {
			dispatch(addOrderInfo({ orderInfo: undefined }));
		}
		dispatch(hideModal());
		dispatch(hidePopupModal());
		//remove event listeners of modal window
		if (closeBtn !== null) {
			closeBtn.removeEventListener('click', () => {
				dispatch(hideModal());
				dispatch(hidePopupModal());
			});
		}
		if (overlay !== null) {
			overlay.removeEventListener('click', () => {
				dispatch(hideModal());
				dispatch(hidePopupModal());
			});
		}
		if (modal !== null) {
			modal.removeEventListener('click', (event: MouseEvent) => {
				event.stopPropagation();
			});
		}
	};

	return (
		<Modal
			closeBtnRef={closeBtnRef}
			overlayRef={overlayRef}
			modalRef={modalRef}
			onClose={() => {
				return;
			}}
		/>
	);
};

export default ModalPopup;
