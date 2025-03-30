import React, { useEffect, useRef } from 'react';
import Modal from './modal';
import { CLEAR_INGREDIENT, loadModal } from '../../services/actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { downloadIngredient, LOAD_INGREDIENT } from '@services/actions/ingredient';
import IngredientDetails from './ingredient-details/ingredient-details';

const ModalRouter = ({ onClose }) => {
	const dispatch = useDispatch();
	const closeBtnRef = useRef(null);
	const overlayRef = useRef(null);
	const modalRef = useRef(null);
	const modalType = useSelector((state) => {
		return state.modalReducer.modalType;
	});

	//modal info for ingredient
	const { ingredientId } = useParams();
	useEffect(() => {
		if (ingredientId) {
			dispatch(downloadIngredient(ingredientId));
			//here will be the query to server in future sprints
			const content = <IngredientDetails />;
			dispatch(loadModal('ingredient', 'Детали ингредиента', content, 'route'));
		}
	}, [ingredientId, dispatch]);

	//addlistener close
	useEffect(() => {
		//add close Modal listeners
		//close button
		closeBtnRef.current.addEventListener('click', () => {
			onClose();
			if (modalType === 'ingredient' || ingredientId) {
				dispatch({ type: CLEAR_INGREDIENT });
			}
		});
		//click on overlay
		overlayRef.current.addEventListener('click', () => {
			onClose();
			if (modalType === 'ingredient' || ingredientId) {
				dispatch({ type: CLEAR_INGREDIENT });
			}
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
	}, [modalType]);

	const closeModalEsc = (e) => {
		//close modal at esc
		if (e.key === 'Escape') {
			onClose();
			if (modalType === 'ingredient' || ingredientId) {
				dispatch({ type: CLEAR_INGREDIENT });
			}
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
