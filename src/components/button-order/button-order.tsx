import React, {
	SyntheticEvent,
	useCallback,
	useRef,
} from 'react';
import styles from './button-order.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/store';
import { loadModal } from '../../services/actions/modal';
import Loader from '../loader/loader';
import { order } from '../../services/actions/order';
import Error from '../error/error';
import { useNavigate } from 'react-router';
import { TAppState, TUser } from '../../utils/types';
import OrderDetails from '../modal/order-details/order-details';

const ButtonOrder = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const sum: number | undefined = useSelector(
		(state: TAppState): number | undefined => {
			return state.constructorReducer.sum;
		}
	);
	const orderIngredients: string[] | undefined = useSelector(
		(state: TAppState): string[] | undefined =>
			state.orderReducer.orderIngredients
	);
	const button = useRef<HTMLButtonElement>(null);
	const user: TUser = useSelector(
		(state: TAppState): TUser => state.authReducer.user
	);
	const navigate = useNavigate();
	const makeOrder = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();
			if (!user) {
				navigate('/login');
			} else {
				//here will be the query to server in future sprints
				if (!orderIngredients || orderIngredients.length === 0) {
					dispatch(
						loadModal(
							'order',
							'Ошибка заказа',
							<Error text='Добавьте хотя бы один ингредиент' height={false} />,
							'popup'
						)
					);
				} else {
					dispatch(loadModal('order', '', <Loader />, 'popup'));
					dispatch(order(orderIngredients, <OrderDetails />));
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
