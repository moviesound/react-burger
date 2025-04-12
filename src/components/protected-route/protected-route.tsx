import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import Loader from '../loader/loader';
import React from 'react';
import { TAppState, TProtectedRouteProps, TUser } from '../../utils/types';

const ProtectedRoute = ({
	isAuthorized = false,
	component,
}: TProtectedRouteProps): React.JSX.Element => {
	const user: TUser = useSelector(
		(state: TAppState): TUser => state.authReducer.user
	);
	const isAuthChecked: boolean = useSelector(
		(state: TAppState): boolean => state.authReducer.isAuthChecked
	);
	const location = useLocation();

	if (!isAuthChecked) {
		return <Loader />;
	}

	if (isAuthorized && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (!isAuthorized && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return component;
};

export const OnlyAuthorized = ({ component }: TProtectedRouteProps) => (
	<ProtectedRoute isAuthorized={true} component={component} />
);
export const OnlyUnauthorized = ProtectedRoute;
