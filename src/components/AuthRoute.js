import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ exact, path, isLoggedIn, component, id, ...props }) => { 
	const Component = component;
	return (
		<Route 
			{...props}
			exact={exact}
			path={path}
			render={routeProps => (isLoggedIn ? 
				<Component {...routeProps} {...props} id={id} /> :
				<Redirect to='/' /> 
			)}
		/>
	)
}

export default AuthRoute;
