import React, { useEffect, useState } from 'react';
import styles from './auth.module.css';
import {
	PasswordInput,
	Input,
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router';
import { useSelector, useDispatch } from '../../services/store';
import Error from '../../components/error/error';
import { register } from '../../services/actions/auth';
import { TAppState, TUndefinedString } from '@utils/types';

const RegisterPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: 'STATE_CLEAR' });
	}, [dispatch]);
	const [emailField, setEmailField] = useState<string>('');
	const [nameField, setNameField] = useState<string>('');
	const [passwordField, setPasswordField] = useState<string>('');
	const errorText: TUndefinedString = useSelector(
		(state: TAppState): TUndefinedString => state.authReducer.errorText
	);
	const requestProcess: boolean = useSelector(
		(state: TAppState) => state.authReducer.requestProcess
	);
	const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(register(emailField, passwordField, nameField));
	};
	const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setNameField(e.target.value);
	};
	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setEmailField(e.target.value);
	};
	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setPasswordField(e.target.value);
	};
	return (
		<section className={styles.container}>
			<form className={styles.form} onSubmit={registerHandler}>
				<h1 className='text text_type_main-medium'>Регистрация</h1>
				<Input
					autoComplete='no-autofill-please'
					type='text'
					placeholder='Имя'
					name='name'
					error={!!errorText}
					value={nameField}
					onChange={nameHandler}
					errorText=''
					size='default'
				/>
				<EmailInput
					autoComplete='no-autofill-please'
					placeholder='E-mail'
					name='email'
					value={emailField}
					onChange={emailHandler}
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
					value={passwordField}
					onChange={passwordHandler}
				/>
				{errorText && <Error text={errorText} height={false}></Error>}
				<Button
					type='primary'
					size='medium'
					htmlType='submit'
					disabled={requestProcess}>
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
