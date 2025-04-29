import { createPortal } from 'react-dom';
import ModalOverlay from './modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from '../../app/hooks';
import { TModalProps } from '../../features/types/types';
import IngredientDetails from './ingredient-details/ingredient-details';
import Error from '../error/error';
import Loader from '../loader/loader';
import OrderDetails from './order-details/order-details';

const Modal = ({
	closeBtnRef,
	overlayRef,
	modalRef,
}: TModalProps): React.JSX.Element => {
	const modalHeader = useSelector((state) => {
		return state.modal.modalHeader;
	});

	const modalContent = useSelector((state) => {
		return state.modal.modalContent;
	});

	return createPortal(
		<ModalOverlay overlayRef={overlayRef}>
			<div className={styles.modal} ref={modalRef}>
				<h2 className={`${styles.header} text text_type_main-large`}>
					{modalHeader}
					<div className={styles.close} ref={closeBtnRef}>
						<CloseIcon type='primary' />
					</div>
				</h2>
				<div className={styles.content}>
					{typeof modalContent !== 'undefined' ? (
						modalContent.type === 'ingredient' ? (
							<IngredientDetails />
						) : modalContent.type === 'order' ? (
							<OrderDetails />
						) : modalContent.type === 'error' ? (
							<Error text='Добавьте хотя бы один ингредиент' height={false} />
						) : modalContent.type === 'loader' ? (
							<Loader />
						) : (
							''
						)
					) : (
						''
					)}
				</div>
			</div>
		</ModalOverlay>,
		document.getElementById('modal-root')!
	);
};

export default Modal;
