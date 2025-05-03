import React, { useEffect, useRef, useState } from 'react';
import Modal from './modal';
import { useSelector, useDispatch } from '../../app/hooks';
import { useBeforeUnload, useParams } from 'react-router';
import { TModalRouter } from '../../features/types/types';
import { showModal } from '../../features/modal';

const ModalRouter = ({ onClose }: TModalRouter): React.JSX.Element => {
	const dispatch = useDispatch();
	const closeBtnRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const modalType = useSelector((state) => {
		return state.modal.modalType;
	});

	//modal info for ingredient
	const { ingredientId } = useParams();
	const { number } = useParams();
	useEffect(() => {
		if (ingredientId) {
			//dispatch(downloadIngredient(ingredientId));
			//here will be the query to server in future sprints
			dispatch(
				showModal({
					modalType: 'route',
					modalHeader: 'Детали ингредиента',
					modalContent: { type: 'ingredient' },
				})
			);
		}
		if (number) {
			//dispatch(downloadIngredient(ingredientId));
			//here will be the query to server in future sprints
			dispatch(
				showModal({
					modalType: 'route',
					modalHeader: number ? '#' + number : '',
					modalContent: { type: 'orderDetails' },
				})
			);
		}
	}, [ingredientId, dispatch]);

	useBeforeUnload(() => {
		//esc key
		document.removeEventListener('keydown', closeModalEsc);
	});
	//addlistener close
	useEffect(() => {
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
	}, [modalType]);

	const closeModalEsc = (e: KeyboardEvent): void => {
		//close modal at esc
		if (e.key === 'Escape') {
			onClose();
			/*if (modalType === 'ingredient' || ingredientId) {
				dispatch({ type: 'CLEAR_INGREDIENT' });
			}*/
		}
	};

	return (
		<Modal
			closeBtnRef={closeBtnRef}
			overlayRef={overlayRef}
			modalRef={modalRef}
			onClose={onClose}
		/>
	);
};

export default ModalRouter;
