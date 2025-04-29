import React, { SyntheticEvent, useCallback, useRef } from 'react';
import styles from './button-order.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../app/hooks';
//import { order } from '../../services/actions/order';
import { useNavigate } from 'react-router';
import { showModal, showPopupModal } from '../../features/modal';
import { apiDefendedSlice } from '../../features/api/api-defended-slice';
import { addOrderInfo } from '../../features/order';

const ButtonOrder = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const sum = useSelector((state) => {
		return state.burgerConstructor.sum;
	});
	const orderIngredients = useSelector((state) => state.order.orderIngredients);
	const button = useRef<HTMLButtonElement>(null);
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const [order] = apiDefendedSlice.useOrderMutation();

	//const [trigger, { data, isFetching, error }] = apiSlice.useLazyGet

	const makeOrder = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();
			if (!user) {
				navigate('/login');
			} else {
				//here will be the query to server in future sprints
				if (!orderIngredients || orderIngredients.length === 0) {
					dispatch(
						showModal({
							modalType: 'order',
							modalHeader: 'Ошибка заказа',
							modalContent: {
								type: 'error',
								text: 'Добавьте хотя бы один ингредиент',
							},
						})
					);
					dispatch(showPopupModal());
				} else {
					dispatch(
						showModal({
							modalType: 'order',
							modalHeader: '',
							modalContent: { type: 'order' },
						})
					);
					dispatch(showPopupModal());
					order({
						ingredients: orderIngredients,
					}).then((response) => {
						if (
							!response.error &&
							typeof response.data !== 'undefined' &&
							typeof response.data !== 'string'
						) {
							dispatch(addOrderInfo({ orderInfo: response.data }));
						}
					});
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
