import React, { useEffect, useState } from 'react';
import styles from './auth.module.css';
import {
	PasswordInput,
	Input,
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/error/error';
import { register } from '../../services/actions/auth';
import { STATE_CLEAR } from '../../services/actions/auth';

const RegisterPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: STATE_CLEAR });
	}, [dispatch]);
	const [emailField, setEmailField] = useState('');
	const [nameField, setNameField] = useState('');
	const [passwordField, setPasswordField] = useState('');
	const errorText = useSelector((state) => state.authReducer.errorText);
	const requestProcess = useSelector(
		(state) => state.authReducer.requestProcess
	);

	return (
		<section className={styles.container}>
			<form className={styles.form}>
				<h1 className='text text_type_main-medium'>Регистрация</h1>
				<Input
					autoComplete='no-autofill-please'
					type='text'
					placeholder='Имя'
					name='name'
					error={errorText ? true : false}
					value={nameField}
					onChange={(e) => {
						setNameField(e.target.value);
					}}
					errorText=''
					size='default'
				/>
				<EmailInput
					autoComplete='no-autofill-please'
					placeholder='E-mail'
					name='email'
					value={emailField}
					onChange={(e) => {
						setEmailField(e.target.value);
					}}
					error={errorText ? true : false}
					errorText=''
					size='default'
				/>
				<PasswordInput
					autoComplete='no-autofill-please'
					name={'password'}
					placeholder={'Пароль'}
					size='default'
					extraClass='mb-2'
					errorText=''
					error={errorText ? true : false}
					value={passwordField}
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
					onClick={() => {
						dispatch(register(emailField, passwordField, nameField));
					}}>
					Зарегистрироваться
				</Button>
			</form>
			<div
				className={`${styles.footer} text text_type_main-default text_color_inactive`}>
				<div>
					Уже зарегистрированы? <Link to='/login'>Войти</Link>
				</div>
			</div>
		</section>
	);
};

export default RegisterPage;
