import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './auth.module.css';
import {
	PasswordInput,
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router';
import Error from '../../components/error/error';
import { apiSlice } from '../../features/api/api-slice';
import { TError } from '../../features/types/types';

const ResetPasswordPage = (): React.JSX.Element => {
	const resetFlag: string | null = localStorage.getItem('reset');
	const [passwordField, setPasswordField] = useState<string>('');
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [codeField, setCodeField] = useState<string>('');
	const navigate = useNavigate();

	const [setNewPassword, { isLoading, error }] =
		apiSlice.useLazySetNewPasswordQuery();

	const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setPasswordField(e.target.value);
	};
	const codeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setCodeField(e.target.value);
	};
	const resetHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setNewPassword({ password: passwordField, token: codeField }).then(
			({ data }) => {
				if (data) {
					if (data.success === true) {
						navigate('/login');
						setTimeout(function () {
							localStorage.removeItem('reset');
						}, 5000);
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
			}
		);
	};

	if (!resetFlag) {
		return <Navigate to='/forgot-password' />;
	}

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
				/>
				<Input
					autoComplete='no-autofill-please'
					placeholder='Введите код из письма'
					name='code'
					onChange={codeHandler}
					size='default'
					value={codeField}
				/>
				{errorMsg && <Error text={errorMsg} height={false}></Error>}
				<Button
					type='primary'
					size='medium'
					htmlType='submit'
					disabled={isLoading}>
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
