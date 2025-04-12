import { createPortal } from 'react-dom';
import ModalOverlay from './modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from '../../services/store';
import { TAppState, TModalProps } from '../../utils/types';

const Modal = ({
	closeBtnRef,
	overlayRef,
	modalRef,
}: TModalProps): React.JSX.Element => {
	const modalHeader: string | undefined = useSelector(
		(state: TAppState): string | undefined => {
			return state.modalReducer.modalHeader;
		}
	);

	const modalContent: string | number | React.JSX.Element | undefined =
		useSelector(
			(state: TAppState): string | number | React.JSX.Element | undefined => {
				return state.modalReducer.modalContent;
			}
		);

	return createPortal(
		<ModalOverlay overlayRef={overlayRef}>
			<div className={styles.modal} ref={modalRef}>
				<h2 className={`${styles.header} text text_type_main-large`}>
					{modalHeader}
					<div className={styles.close} ref={closeBtnRef}>
						<CloseIcon type='primary' />
					</div>
				</h2>
				<div className={styles.content}>{modalContent}</div>
			</div>
		</ModalOverlay>,
		document.getElementById('modal-root')!
	);
};

export default Modal;
