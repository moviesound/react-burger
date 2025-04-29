import React, { useState } from 'react';
import styles from './auth.module.css';
import {
	PasswordInput,
	Input,
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router';
import { useDispatch } from '../../app/hooks';
import Error from '../../components/error/error';
import { setUser } from '../../features/auth';
import { apiSlice } from '../../features/api/api-slice';
import { TError } from '../../features/types/types';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [emailField, setEmailField] = useState<string>('');
	const [nameField, setNameField] = useState<string>('');
	const [passwordField, setPasswordField] = useState<string>('');
	const [register, { isLoading, isError, error }] =
		apiSlice.useLazyRegisterQuery();

	const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		register({
			email: emailField,
			password: passwordField,
			name: nameField,
		}).then(({ data }) => {
			if (data) {
				if (
					data.success === true &&
					data.accessToken &&
					data.refreshToken &&
					data.user
				) {
					localStorage.setItem('accessToken', data.accessToken);
					localStorage.setItem('refreshToken', data.refreshToken);
					dispatch(setUser({ user: data.user }));
				}
			}
			if (error) {
				if ('status' in error) {
					// you can access all properties of `FetchBaseQueryError` here
					setErrorMsg(
						'error' in error
							? error.error
							: (error.data as TError).message
							? (error.data as TError).message
							: JSON.stringify(error.data)
					);
				}
			}
		});
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
					value={nameField}
					onChange={nameHandler}
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
				{isError && error && <Error text={errorMsg} height={false}></Error>}
				<Button
					type='primary'
					size='medium'
					htmlType='submit'
					disabled={isLoading}>
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
