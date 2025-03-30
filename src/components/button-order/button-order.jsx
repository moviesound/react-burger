import React, { useCallback, useEffect, useRef } from 'react';
import styles from './button-order.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadModal } from '../../services/actions/modal';
import Loader from '../loader/loader';
import { order } from '../../services/actions/order';
import Error from '../error/error';
import { useNavigate } from 'react-router';

const ButtonOrder = () => {
	const dispatch = useDispatch();
	const { sum } = useSelector((state) => {
		return state.constructorReducer;
	});
	const orderIngredients = useSelector(
		(state) => state.orderReducer.orderIngredients
	);
	const button = useRef(null);
	const user = useSelector( (state) => state.authReducer.user);
	const navigate = useNavigate();
	const makeOrder = useCallback(
		(e) => {
			e.preventDefault();
			if (!user) {
				navigate('/login');
			} else {
				//here will be the query to server in future sprints
				if (orderIngredients.length === 0) {
					dispatch(
						loadModal(
							'order',
							'Ошибка заказа',
							<Error text='Добавьте хотя бы один ингредиент' />,
							'popup'
						)
					);
				} else {
					dispatch(loadModal('order', '', <Loader />, 'popup'));
					dispatch(order(orderIngredients));
				}
			}
		},
		[orderIngredients]
	);

	return (
		<div className={styles.container}>
			<div className={`${styles.sum} text text_type_digits-medium`}>
				{sum} <CurrencyIcon type='primary' />
			</div>
			<span ref={button}>
				<Button
					onClick={makeOrder}
					htmlType='button'
					type='primary'
					size='large'>
					Оформить заказ
				</Button>
			</span>
		</div>
	);
};
export default ButtonOrder;
