import React, { useEffect, useState } from 'react';
import styles from './auth.module.css';
import {
	PasswordInput,
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router';
import { login } from '../../services/actions/auth';
import { useSelector, useDispatch } from '../../services/store';
import Error from '../../components/error/error';
import { TAppState, TUndefinedString } from '../../utils/types';

const LoginPage = (): React.JSX.Element => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: 'STATE_CLEAR' });
	}, [dispatch]);
	const [emailField, setEmailField] = useState<string>('');
	const [passwordField, setPasswordField] = useState<string>('');
	const errorText: TUndefinedString = useSelector(
		(state: TAppState): TUndefinedString => state.authReducer.errorText
	);
	const requestProcess: boolean = useSelector(
		(state: TAppState): boolean => state.authReducer.requestProcess
	);
	const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(login(emailField, passwordField));
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
				{errorText && <Error text={errorText} height={false}></Error>}
				<Button
					type='primary'
					size='medium'
					htmlType='submit'
					disabled={requestProcess}>
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
