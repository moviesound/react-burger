import { Navigate, useLocation } from 'react-router';
import Loader from '../loader/loader';
import React, { useEffect, useState } from 'react';
import { TProtectedRouteProps } from '../../features/types/types';
import { apiDefendedSlice } from '../../features/api/api-defended-slice';
import { useSelector } from '../../app/hooks';

const ProtectedRoute = ({
	isAuthorized = false,
	component,
}: TProtectedRouteProps): React.JSX.Element => {
	const user = useSelector((state) => state.auth.user);

	const location = useLocation();

	const isAuthChecked = useSelector(
		(state): boolean => state.auth.isAuthChecked
	);

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
