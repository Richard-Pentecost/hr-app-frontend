import React, { useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Settings from './Settings';
import AuthRoute from './AuthRoute';
import '../style/App.scss';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [id, setId] = useState('');
	
	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					{/* <Route 
						exact
						path='/home'
					>
						<Home id={id} />
					</Route> */}
					<Route
						exact 
						path='/' 
						render={props => (isLoggedIn ?
							<Redirect to='/home' /> : 
							<Login {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setId={setId} />
						)}
					/>

					<AuthRoute 
						exact
						path="/home"
						component={Home}
						isLoggedIn={isLoggedIn}
						id={id}
					/>

					<Route 
						exact
						path='/settings'
						component={Settings}
						isLoggedIn={isLoggedIn}
						id={id}
					/>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
