import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ exact, path, authenticate, component, ...props }) => { 
	const Component = component;
	return (
		<Route 
			{...props}
			exact={exact}
			path={path}
			render={routeProps => (authenticate() ? 
				<Component {...routeProps} {...props} /> :
				<Redirect to='/' /> 
			)}
		/>
	)
}

export default AuthRoute;
