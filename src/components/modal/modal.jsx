import { createPortal } from 'react-dom';
import ModalOverlay from './modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Modal = ({ closeBtnRef, overlayRef, modalRef }) => {
	const modalHeader = useSelector((state) => {
		return state.modalReducer.modalHeader;
	});

	const modalContent = useSelector((state) => {
		return state.modalReducer.modalContent;
	});

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

Modal.propTypes = {
	closeBtnRef: PropTypes.object.isRequired,
	overlayRef: PropTypes.object.isRequired,
	modalRef: PropTypes.object.isRequired,
};

export default Modal;
