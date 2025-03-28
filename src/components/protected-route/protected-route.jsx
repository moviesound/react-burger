import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import Loader from '../loader/loader';

const ProtectedRoute = ({ isAuthorized = false, component }) => {
	const user = useSelector((state) => state.authReducer.user);
	const isAuthChecked = useSelector((state) => state.authReducer.isAuthChecked);
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

export const OnlyAuthorized = ({ component }) => (
	<ProtectedRoute isAuthorized={true} component={component} />
);
export const OnlyUnauthorized = ProtectedRoute;
