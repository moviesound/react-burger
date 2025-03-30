import React, { useEffect, useState } from 'react';
import styles from './auth.module.css';
import {
	PasswordInput,
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setNewPassword, STATE_CLEAR } from '../../services/actions/auth';
import Error from '../../components/error/error';

const ResetPasswordPage = () => {
	const resetFlag = localStorage.getItem('reset');
	const [passwordField, setPasswordField] = useState('');
	const [codeField, setCodeField] = useState('');
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: STATE_CLEAR });
	}, [dispatch]);
	const navigate = useNavigate();
	const errorText = useSelector((state) => state.authReducer.errorText);
	if (!resetFlag) {
		return <Navigate to='/forgot-password' />;
	}

	const passwordHandler = (e) => {
		e.preventDefault();
		setPasswordField(e.target.value);
	};
	const codeHandler = (e) => {
		e.preventDefault();
		setCodeField(e.target.value);
	};
	const resetHandler = (e) => {
		e.preventDefault();
		dispatch(setNewPassword(passwordField, codeField, navigate));
	};
	return (
		<section className={styles.container}>
			<form className={styles.form} onSubmit={resetHandler}>
				<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
				<PasswordInput
					autoComplete='no-autofill-please'
					onChange={passwordHandler}
					name={'password'}
					placeholder={'Введите новый пароль'}
					size='default'
					extraClass='mb-2'
					value={passwordField}
					error={false}
					errorText=''
				/>
				<Input
					autoComplete='no-autofill-please'
					placeholder='Введите код из письма'
					name='code'
					onChange={codeHandler}
					error={false}
					errorText=''
					size='default'
					value={codeField}
				/>
				{errorText && <Error text={errorText} height={false}></Error>}
				<Button type='primary' size='medium' htmlType='submit'>
					Сохранить
				</Button>
			</form>
			<div
				className={`${styles.footer} text text_type_main-default text_color_inactive`}>
				<div>
					Вcпомнили пароль?
					<Link to='/login'>Войти</Link>
				</div>
			</div>
		</section>
	);
};

export default ResetPasswordPage;
