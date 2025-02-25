import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './button-order.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../modal/order-details/order-details';

const ButtonOrder = (props) => {
	const [sum, setSum] = useState(0);
	useEffect(() => {
		let sum = 0;
		if (props && props.ingredients && props.ingredients.length > 0) {
			for (var i in props.ingredients) {
				sum += props.ingredients[i].price;
			}
		}
		setSum(sum);
	}, [props.ingredients]);

	const button = useRef(null);
	useEffect(() => {
		button.current.addEventListener('click', makeOrder);
		return () => {
			button.current.removeEventListener('click', makeOrder);
		};
	}, []);

	const makeOrder = useCallback(() => {
		//here will be the query to server in future sprints
		const orderId = '034536';
		const content = <OrderDetails orderId={orderId} />;
		const data = { header: '', content: content };
		props.openModal(data);
	});

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
ButtonOrder.propTypes = {
	ingredients: PropTypes.array.isRequired,
	openModal: PropTypes.func.isRequired,
};
