import React, { useEffect, useState } from 'react';
import styles from './auth.module.css';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router';
import { sendCode } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const reset = localStorage.getItem('reset') ?? false;
	const sendCodeHandler = (e) => {
		e.preventDefault();
		dispatch(sendCode(email, navigate));
	};
	useEffect(() => {
		console.log(reset);
	}, [reset, localStorage]);
	return (
		<section className={styles.container}>
			<form className={styles.form}>
				<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
				<EmailInput
					autoComplete='no-autofill-please'
					placeholder='Укажите e-mail'
					name='email'
					error={false}
					errorText=''
					size='default'
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					onClick={sendCodeHandler}>
					Восстановить
				</Button>
			</form>
			<div
				className={`${styles.footer} text text_type_main-default text_color_inactive`}>
				<div>
					Вспомнили пароль?
					<Link to='/login'> Войти</Link>
				</div>
			</div>
		</section>
	);
};

export default ForgotPasswordPage;
