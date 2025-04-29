import React, { useEffect, useRef } from 'react';
import Modal from './modal';
import { useSelector, useDispatch } from '../../app/hooks';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
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
	}, [ingredientId, dispatch]);

	//addlistener close
	useEffect(() => {
		//add close Modal listeners
		//close button
		closeBtnRef.current?.addEventListener('click', (): void => {
			onClose();
			/*if (modalType === 'ingredient' || ingredientId) {
				dispatch({ type: 'CLEAR_INGREDIENT' });
			}*/
		});
		//click on overlay
		overlayRef.current?.addEventListener('click', (): void => {
			onClose();
			/*if (modalType === 'ingredient' || ingredientId) {
				dispatch({ type: 'CLEAR_INGREDIENT' });
			}*/
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
		/>
	);
};

ModalRouter.propTypes = {
	onClose: PropTypes.func,
};

export default ModalRouter;
