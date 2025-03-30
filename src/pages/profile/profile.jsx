import React, { useEffect } from 'react';
import style from './profile.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import ProfileMenu from '../../components/profile/profile-menu';
import { saveUser } from '../../services/actions/auth';

const ProfilePage = () => {
	const user = useSelector((state) => state.authReducer.user);
	const [emailField, setEmailField] = React.useState(user.email);
	const [passwordField, setPasswordField] = React.useState('');
	const [nameField, setNameField] = React.useState(user.name);
	const [showButtons, setShowButtons] = React.useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if (
			user.email !== emailField ||
			user.name !== nameField ||
			passwordField !== ''
		) {
			setShowButtons(true);
		} else {
			setShowButtons(false);
		}
	}, [user, emailField, passwordField, nameField]);

	const resetParams = (e) => {
		e.preventDefault();
		setEmailField(user.email);
		setNameField(user.name);
		setPasswordField('');
	};
	const saveParams = (e) => {
		e.preventDefault();
		if (!showButtons) {
			e.stopPropagation();
		}
		dispatch(
			saveUser(
				emailField !== user.email ? emailField : null,
				nameField !== user.name ? nameField : null,
				passwordField !== '' ? passwordField : null
			)
		);
	};
	const errorText = useSelector((state) => state.profileReducer.errorText);
	return (
		<div className={style.container}>
			<section className={style.content}>
				<div className={style.leftBox}>
					<ProfileMenu item='profile' />
				</div>
				<form className={style.rightBox} onSubmit={saveParams}>
					<Input
						autoComplete='no-autofill-please'
						type='text'
						placeholder='Имя'
						name='name'
						error={errorText ? true : false}
						value={nameField}
						onChange={(e) => {
							setNameField(e.target.value);
						}}
						errorText=''
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
						error={errorText ? true : false}
						errorText=''
						size='default'
					/>
					<PasswordInput
						autoComplete='new-password'
						name='password'
						placeholder='Пароль'
						size='default'
						extraClass='mb-2'
						error={errorText ? true : false}
						errorText=''
						value={passwordField}
						onChange={(e) => {
							setPasswordField(e.target.value);
						}}
					/>
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
ProfilePage.propTypes = {};
export default ProfilePage;
