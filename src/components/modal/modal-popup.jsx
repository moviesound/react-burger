import React, { useEffect, useRef } from 'react';
import Modal from './modal';
import { closeModal } from '../../services/actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useBeforeUnload } from 'react-router';

const ModalPopup = () => {
	const dispatch = useDispatch();
	const closeBtnRef = useRef(null);
	const overlayRef = useRef(null);
	const modalRef = useRef(null);
	const modalType = useSelector((state) => {
		return state.modalReducer.modalType;
	});
	//addlistener close
	useEffect(() => {
		//add close Modal listeners
		//close button
		closeBtnRef.current.addEventListener('click', () => {
			dispatch(
				closeModal(
					modalType,
					closeBtnRef.current,
					overlayRef.current,
					modalRef.current
				)
			);
		});
		//click on overlay
		overlayRef.current.addEventListener('click', () => {
			dispatch(
				closeModal(
					modalType,
					closeBtnRef.current,
					overlayRef.current,
					modalRef.current
				)
			);
		});
		modalRef.current.addEventListener('click', (event) => {
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
	}, []);

	useBeforeUnload(() => {
		document.removeEventListener('keydown', closeModalEsc);
	});

	const closeModalEsc = (e) => {
		//close modal at esc
		if (e.key === 'Escape') {
			dispatch(
				closeModal(
					modalType,
					closeBtnRef.current,
					overlayRef.current,
					modalRef.current
				)
			);
		}
	};

	return (
		<Modal
			closeBtnRef={closeBtnRef}
			overlayRef={overlayRef}
			modalRef={modalRef}
		/>
	);
};

export default ModalPopup;
