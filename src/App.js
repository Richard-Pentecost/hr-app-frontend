import React, { useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';
import './style/App.scss';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [id, setId] = useState('');
	
	return (
		<BrowserRouter>
			<div className="app">
				<Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
				<Switch>
					<Route
						exact 
						path='/' 
						render={props => (isLoggedIn ?
							<Redirect to='/home' /> : 
							<Login {...props} setIsLoggedIn={setIsLoggedIn} setId={setId} />
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
