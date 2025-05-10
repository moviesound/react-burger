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
import DoneOrderDetails from './done-order-details/done-order-details';

const Modal = ({
	closeBtnRef,
	overlayRef,
	modalRef,
	onClose,
}: TModalProps): React.JSX.Element => {
	const modalHeader = useSelector((state) => {
		return state.modal.modalHeader;
	});

	const modalContent = useSelector((state) => {
		return state.modal.modalContent;
	});

	return createPortal(
		<ModalOverlay overlayRef={overlayRef} onClose={onClose}>
			<div
				data-testid="modal"
				role='presentation'
				className={styles.modal}
				ref={modalRef}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				{typeof modalContent !== 'undefined' &&
				modalContent.type === 'orderDetails' ? (
					<h2 className={`${styles.header} text text_type_digits-default`}>
						{modalHeader}
						<div className={styles.close} ref={closeBtnRef} data-testid="close-modal-btn">
							<CloseIcon type='primary' onClick={onClose} />
						</div>
					</h2>
				) : (
					<h2 className={`${styles.header} text text_type_main-large`}>
						{modalHeader}
						<div className={styles.close} ref={closeBtnRef} data-testid="close-modal-btn">
							<CloseIcon type='primary' onClick={onClose} />
						</div>
					</h2>
				)}
				<div className={modalContent && modalContent.type === 'orderDetails' ? styles.orderDetails : styles.content}>
					{typeof modalContent !== 'undefined' ? (
						modalContent.type === 'ingredient' ? (
							<IngredientDetails />
						) : modalContent.type === 'order' ? (
							<OrderDetails />
						) : modalContent.type === 'orderDetails' ? (
							<DoneOrderDetails />
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
