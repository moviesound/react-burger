import React, { useState } from 'react';
import styles from './auth.module.css';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router';
import Error from '../../components/error/error';
import { apiSlice } from '../../features/api/api-slice';
import { TError } from '../../features/types/types';

const ForgotPasswordPage = (): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [sendCode, { isLoading, error }] = apiSlice.useLazyGetResetCodeQuery();

	const validateEmail = (email: string): boolean => {
		return !!String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const sendCodeHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			setErrorMsg('Please enter a valid email');
		} else {
			sendCode(email).then(({ data }) => {
				if (data) {
					if (data.success === true) {
						setErrorMsg('');
						localStorage.setItem('reset', 'true');
						navigate('/reset-password');
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
		}
	};
	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setEmail(e.target.value);
	};
	return (
		<section className={styles.container}>
			<form className={styles.form} onSubmit={sendCodeHandler}>
				<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
				<EmailInput
					autoComplete='no-autofill-please'
					placeholder='Укажите e-mail'
					name='email'
					errorText=''
					size='default'
					value={email}
					onChange={onChangeEmail}
				/>
				{errorMsg && <Error text={errorMsg} height={false}></Error>}
				<Button
					type='primary'
					size='medium'
					htmlType='submit'
					disabled={isLoading}>
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
