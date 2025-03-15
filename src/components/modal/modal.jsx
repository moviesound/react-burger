import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import { createPortal } from 'react-dom';
import { closeModal } from '../../services/actions/modal';
import { useDispatch, useSelector } from 'react-redux';

const Modal = () => {
	const dispatch = useDispatch();
	const closeBtnRef = useRef(null);
	const overlayRef = useRef(null);
	const modalRef = useRef(null);
	const modalHeader = useSelector((state) => {
		return state.modalReducer.modalHeader;
	});
	const modalType = useSelector((state) => {
		return state.modalReducer.modalType;
	});
	const modalContent = useSelector((state) => {
		return state.modalReducer.modalContent;
	});
	//addlistener close
	useEffect(() => {
		//add close Modal listeners
		//close button
		closeBtnRef.current.addEventListener('click', () => {
			dispatch(
				closeModal(modalType, closeBtnRef.current, overlayRef.current, modalRef.current)
			);
		});
		//click on overlay
		overlayRef.current.addEventListener('click', () => {
			dispatch(
				closeModal(modalType, closeBtnRef.current, overlayRef.current, modalRef.current)
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
			document.removeEventListener('keydown', closeModalEsc);
		};
	}, []);

	const closeModalEsc = (e) => {
		//close modal at esc
		if (e.key === 'Escape') {
			dispatch(
				closeModal(modalType, closeBtnRef.current, overlayRef.current, modalRef.current)
			);
		}
	};

	return createPortal(
		<ModalOverlay overlayRef={overlayRef}>
			<section className={styles.modal} ref={modalRef}>
				<h2 className={`${styles.header} text text_type_main-large`}>
					{modalHeader}
					<div className={styles.close} ref={closeBtnRef}>
						<CloseIcon type='primary' />
					</div>
				</h2>
				<div className={styles.content}>{modalContent}</div>
			</section>
		</ModalOverlay>,
		document.getElementById('modal-root')
	);
};
/*
Modal.propTypes = {
	type: PropTypes.string.isRequired,
	children: PropTypes.object.isRequired,
	closeModal: PropTypes.func.isRequired,
	modalRef: PropTypes.object.isRequired,
	overlayRef: PropTypes.object.isRequired,
	closeBtnRef: PropTypes.object.isRequired,
	header: PropTypes.string,
	handler: PropTypes.func,
};*/

export default Modal;
