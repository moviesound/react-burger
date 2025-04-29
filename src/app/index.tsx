import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router';
import Home from '../pages/home/home';
import IngredientDetailsPage from '../pages/ingredients-details/ingredients-details';
import ModalRouter from '../components/modal/modal-router';
import style from './app.module.scss';
import AppHeader from '../components/app-header/app-header';
import RegisterPage from '../pages/auth/register';
import LoginPage from '../pages/auth/login';
import ForgotPasswordPage from '../pages/auth/forgot-password';
import ResetPasswordPage from '../pages/auth/reset-password';
import ProfilePage from '../pages/profile/profile';
//import { useSelector, useDispatch } from '../services/store';
import {
	OnlyUnauthorized,
	OnlyAuthorized,
} from '../components/protected-route/protected-route';
import ProfileOrdersPage from '../pages/profile/orders/orders';
import Page404 from '../pages/404/404';
import { apiDefendedSlice } from '../features/api/api-defended-slice';
import { useDispatch } from '../app/hooks';
import { authChecked, setUser } from '../features/auth';

export const App = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const handleModalClose = (): void => {
		navigate('/');
	};
	const { data, isLoading, isSuccess } = apiDefendedSlice.useGetUserQuery();
	useEffect(() => {
		if (isSuccess && data.user) {
			dispatch(setUser({ user: data.user }));
		}
		if (!isLoading) {
			dispatch(authChecked());
		}
	}, [isSuccess, isLoading, data, dispatch]);
	return (
		<div className={style.mainContainer}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<Home />} />
				<Route path='/ingredients/'>
					<Route path=':ingredientId' element={<IngredientDetailsPage />} />
				</Route>
				<Route
					path='/register'
					element={<OnlyUnauthorized component={<RegisterPage />} />}
				/>
				<Route
					path='/login'
					element={<OnlyUnauthorized component={<LoginPage />} />}
				/>
				<Route
					path='/forgot-password'
					element={<OnlyUnauthorized component={<ForgotPasswordPage />} />}
				/>
				<Route
					path='/reset-password'
					element={<OnlyUnauthorized component={<ResetPasswordPage />} />}
				/>
				<Route
					path='/profile'
					element={<OnlyAuthorized component={<ProfilePage />} />}
				/>
				<Route
					path='/profile/orders'
					element={<OnlyAuthorized component={<ProfileOrdersPage />} />}
				/>
				<Route path='*' element={<Page404 />} />
			</Routes>

			{background && (
				<Routes>
					<Route path='/ingredients/'>
						<Route
							path=':ingredientId'
							element={<ModalRouter onClose={handleModalClose} />}
						/>
					</Route>
				</Routes>
			)}
		</div>
	);
};
