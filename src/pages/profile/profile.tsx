import React, { useEffect } from 'react';
import style from './profile.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../app/hooks';
import ProfileMenu from '../../components/profile/profile-menu';
import { apiDefendedSlice } from '../../features/api/api-defended-slice';
import { setUser } from '../../features/auth';
import Error from '../../components/error/error';

const ProfilePage = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const [emailField, setEmailField] = React.useState<string>(
		user && user.email ? user.email : ''
	);
	const [passwordField, setPasswordField] = React.useState<string>('');
	const [nameField, setNameField] = React.useState<string>(
		user && user.name ? user.name : ''
	);
	const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
	const [showButtons, setShowButtons] = React.useState<boolean>(false);
	useEffect(() => {
		if (
			user &&
			user.email &&
			user.name &&
			(user.email !== emailField ||
				user.name !== nameField ||
				passwordField !== '')
		) {
			setShowButtons(true);
		} else {
			setShowButtons(false);
		}
	}, [user, emailField, passwordField, nameField]);
	const [saveUser] = apiDefendedSlice.useSaveUserMutation();
	const resetParams = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setEmailField(user && user.email ? user.email : '');
		setNameField(user && user.name ? user.name : '');
		setPasswordField('');
	};
	const saveParams = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!showButtons) {
			e.stopPropagation();
		}
		saveUser({
			email:
				user && user.email && emailField !== user.email
					? emailField
					: undefined,
			name:
				user && user.name && nameField !== user.name ? nameField : undefined,
			password: passwordField !== '' ? passwordField : undefined,
		}).then((response) => {
			if (
				response.data &&
				response.data.success === true &&
				response.data.user
			) {
				dispatch(setUser({ user: response.data.user }));
			} else {
				setErrorMsg(
					response.data && response.data.message
						? response.data.message
						: 'Неизвестная ошибка'
				);
			}
		});
	};
	const description = (
		<span>
			В этом разделе вы можете
			<br />
			изменить свои персональные данные
		</span>
	);

	return (
		<div className={style.container}>
			<section className={style.content}>
				<div className={style.leftBox}>
					<ProfileMenu item='profile' description={description} />
				</div>
				<form className={style.rightBox} onSubmit={saveParams}>
					<Input
						autoComplete='no-autofill-please'
						type='text'
						placeholder='Имя'
						name='name'
						value={nameField}
						onChange={(e) => {
							setNameField(e.target.value);
						}}
						size='default'
					/>
					<EmailInput
						autoComplete='no-autofill-please'
						placeholder='Логин'
						name='email'
						value={emailField}
						onChange={(e) => {
							setEmailField(e.target.value);
						}}
						errorText=''
						size='default'
					/>
					<PasswordInput
						autoComplete='new-password'
						name='password'
						placeholder='Пароль'
						size='default'
						extraClass='mb-2'
						value={passwordField}
						onChange={(e) => {
							setPasswordField(e.target.value);
						}}
					/>
					{errorMsg && <Error text={errorMsg} height={false}></Error>}
					{showButtons && (
						<div className={style.buttons}>
							<Button htmlType='button' type='secondary' onClick={resetParams}>
								Отмена
							</Button>
							<Button type='primary' htmlType='submit'>
								Сохранить
							</Button>
						</div>
					)}
				</form>
			</section>
		</div>
	);
};

export default ProfilePage;
