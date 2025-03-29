import React, { useEffect, useState } from 'react';
import styles from './auth.module.css';
import {
	PasswordInput,
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router';
import { login, STATE_CLEAR } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/error/error';

const LoginPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: STATE_CLEAR });
	}, [dispatch]);
	const [emailField, setEmailField] = useState('');
	const [passwordField, setPasswordField] = useState('');
	const errorText = useSelector((state) => state.authReducer.errorText);
	const requestProcess = useSelector(
		(state) => state.authReducer.requestProcess
	);
	const loginHandler = (e) => {
		e.preventDefault();
		dispatch(login(emailField, passwordField));
	};
	return (
		<section className={styles.container}>
			<form className={styles.form}>
				<h1 className='text text_type_main-medium'>Вход</h1>
				<EmailInput
					placeholder='E-mail'
					name={'email'}
					error={errorText ? true : false}
					errorText=''
					size='default'
					value={emailField}
					onChange={(e) => {
						setEmailField(e.target.value);
					}}
				/>
				<PasswordInput
					name={'password'}
					placeholder={'Пароль'}
					size='default'
					extraClass='mb-2'
					value={passwordField}
					error={errorText ? true : false}
					errorText=''
					onChange={(e) => {
						setPasswordField(e.target.value);
					}}
				/>
				{errorText && <Error text={errorText} height={false}></Error>}
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					disabled={requestProcess ? true : false}
					onClick={loginHandler}>
					Войти
				</Button>
			</form>
			<div
				className={`${styles.footer} text text_type_main-default text_color_inactive`}>
				<div>
					Вы новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
				</div>
				<div>
					Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
				</div>
			</div>
		</section>
	);
};

export default LoginPage;
