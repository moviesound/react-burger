import React, { useEffect, useState } from 'react';
import styles from './auth.module.css';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router';
import { sendCode } from '../../services/actions/auth';
import { useSelector, useDispatch } from '../../services/store';
import Error from '../../components/error/error';
import { TAppState, TUndefinedString } from '@utils/types';

const ForgotPasswordPage = (): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: 'STATE_CLEAR' });
	}, [dispatch]);
	const navigate = useNavigate();
	const errorText: TUndefinedString = useSelector(
		(state: TAppState): TUndefinedString => state.authReducer.errorText
	);
	const sendCodeHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(sendCode(email, navigate));
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
				{errorText && <Error text={errorText} height={false}></Error>}
				<Button type='primary' size='medium' htmlType='submit'>
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
