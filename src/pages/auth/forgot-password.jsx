import React, { useEffect, useState } from 'react';
import styles from './auth.module.css';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router';
import { sendCode, STATE_CLEAR } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/error/error';

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: STATE_CLEAR });
	}, [dispatch]);
	const navigate = useNavigate();
	const reset = localStorage.getItem('reset') ?? false;
	const errorText = useSelector((state) => state.authReducer.errorText);
	const sendCodeHandler = (e) => {
		e.preventDefault();
		dispatch(sendCode(email, navigate));
	};
	useEffect(() => {
		console.log(reset);
	}, [reset, localStorage]);
	return (
		<section className={styles.container}>
			<form className={styles.form} onSubmit={sendCodeHandler}>
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
				{errorText && <Error text={errorText} height={false}></Error>}
				<Button type='primary' size='medium' htmlType='submit'>
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
