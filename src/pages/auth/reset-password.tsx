import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './auth.module.css';
import {
	PasswordInput,
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router';
import { useSelector, useDispatch } from '../../services/store';
import { setNewPassword } from '../../services/actions/auth';
import Error from '../../components/error/error';
import { TAppState, TUndefinedString } from '@utils/types';

const ResetPasswordPage = (): React.JSX.Element => {
	const resetFlag: string | null = localStorage.getItem('reset');
	const [passwordField, setPasswordField] = useState<string>('');
	const [codeField, setCodeField] = useState<string>('');
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: 'STATE_CLEAR' });
	}, [dispatch]);
	const navigate = useNavigate();
	const errorText: TUndefinedString = useSelector(
		(state: TAppState): TUndefinedString => state.authReducer.errorText
	);
	if (!resetFlag) {
		return <Navigate to='/forgot-password' />;
	}

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
