import React, { useEffect, useState } from 'react';
import styles from './auth.module.css';
import {
	PasswordInput,
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Error from '../../components/error/error';
import { Link, useNavigate } from 'react-router';
import { apiSlice } from '../../features/api/api-slice';
import { TError } from '../../features/types/types';
import { useDispatch } from '../../app/hooks';
import { setUser } from '../../features/auth';

const LoginPage = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [emailField, setEmailField] = useState<string>('');
	const [passwordField, setPasswordField] = useState<string>('');
	const [login, { isLoading, isSuccess, isError, error }] = apiSlice.useLazyLoginQuery();
	useEffect(() => {
		if (isSuccess) {
			navigate('/profile');
		}
	}, [isSuccess]);
	const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login({ email: emailField, password: passwordField }).then(({ data }) => {
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
	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setEmailField(e.target.value);
	};
	return (
		<section className={styles.container}>
			<form className={styles.form} onSubmit={loginHandler}>
				<h1 className='text text_type_main-medium'>Вход</h1>
				<EmailInput
					placeholder='E-mail'
					name={'email'}
					errorText=''
					size='default'
					value={emailField}
					onChange={emailHandler}
				/>
				<PasswordInput
					name={'password'}
					placeholder={'Пароль'}
					size='default'
					extraClass='mb-2'
					value={passwordField}
					errorText=''
					onChange={(e) => {
						setPasswordField(e.target.value);
					}}
				/>
				{isError && error && errorMsg && (
					<Error text={errorMsg} height={false}></Error>
				)}
				<Button
					type='primary'
					size='medium'
					htmlType='submit'
					disabled={isLoading}>
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
