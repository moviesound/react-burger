import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';

const Modal = (props) => {
	//addlistener close
	useEffect(() => {
		//add close Modal listeners
		//close button
		props.closeBtnRef.current.addEventListener('click', props.closeModal);
		//click on overlay
		props.overlayRef.current.addEventListener('click', props.closeModal);
		props.modalRef.current.addEventListener('click', (event) => {
			event.stopPropagation();
		});
		//esc key
		document.addEventListener('keydown', closeModalEsc);
		return () => {
			//event listeners are removed in app/index.js in function closeModal
			//it's impossible to delete them here, an error occurs, because
			//element is deleted (disappear from DOM) before listeners removing

			//only this eventListner can be removed here
			document.removeEventListener('keydown', closeModalEsc);
		};
	}, []);

	const closeModalEsc = (e) => {
		//close modal at esc
		if (e.key === 'Escape') {
			props.closeModal();
		}
	};

	return (
		<ModalOverlay overlayRef={props.overlayRef}>
			<section className={styles.modal} ref={props.modalRef}>
				<h2 className={`${styles.header} text text_type_main-large`}>
					{props.header}
					<div className={styles.close} ref={props.closeBtnRef}>
						<CloseIcon type='primary' />
					</div>
				</h2>
				<div className={styles.content}>{props.children}</div>
			</section>
		</ModalOverlay>
	);
};

Modal.propTypes = {
	children: PropTypes.object.isRequired,
	closeModal: PropTypes.func.isRequired,
	modalRef: PropTypes.object.isRequired,
	overlayRef: PropTypes.object.isRequired,
	closeBtnRef: PropTypes.object.isRequired,
	header: PropTypes.string,
	handler: PropTypes.func,
};

export default Modal;
