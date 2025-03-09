import React, { useCallback, useEffect, useRef } from 'react';
import styles from './button-order.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../services/actions/modal';
import Loader from '../loader/loader';
import { order } from '../../services/actions/order';

const ButtonOrder = () => {
	const dispatch = useDispatch();
	const { sum } = useSelector((state) => {
		return state.constructorReducer;
	});
	const orderIngredients = useSelector(
		(state) => state.orderReducer.orderIngredients
	);
	const button = useRef(null);
	useEffect(() => {
		button.current.addEventListener('click', makeOrder);
		return () => {
			button.current.removeEventListener('click', makeOrder);
		};
	}, [orderIngredients]);

	const makeOrder = useCallback(() => {
		//here will be the query to server in future sprints
		dispatch(openModal('order', '', <Loader />));
		dispatch(order(orderIngredients));
	}, [orderIngredients]);

	return (
		<div className={styles.container}>
			<div className={`${styles.sum} text text_type_digits-medium`}>
				{sum} <CurrencyIcon type='primary' />
			</div>
			<span ref={button}>
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</span>
		</div>
	);
};
export default ButtonOrder;
