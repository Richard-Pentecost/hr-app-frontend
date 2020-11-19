import React, { useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import EditInformation from './pages/EditInformation';
import ViewEmployee from './pages/ViewEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeesList from './pages/EmployeesList';
import CreateEmployee from './pages/CreateEmployee';
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';
import { ThemeProvider } from '@material-ui/core/styles';
import TokenManager from './utils/token-manager';
import theme from "./resources/theme";
import './style/App.scss';

const App = () => {
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(TokenManager.isTokenValid() ? TokenManager.getTokenPayload() : null);
	const [user, setUser] = useState({firstName:'', surname:'', role:'', email:'', telephone:'', doB:'', address:'', nexOfKin:'', permissionsLevel:'', location:''})
	const [currentEmployeeId, setCurrentEmployeeId] = useState('');


	const isLoggedIn = () => {
    return Boolean(token) && TokenManager.isTokenValid();
	}
	
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div className="app">
					<Navbar authenticate={isLoggedIn} token={token} />
					<Switch>
						<Route
							exact 
							path='/' 
							render={props => (isLoggedIn() ?
								<Redirect to='/home' /> : 
								<Login {...props} setToken={setToken} />
							)}
						/>

						<AuthRoute 
							exact
							path="/home"
							component={Home}
							user={user} 
							setUser={setUser}
							currentEmployeeId={currentEmployeeId}
							authenticate={isLoggedIn}
						/>

						<AuthRoute 
							exact
							path='/edit-information'
							component={EditInformation}
							user={user} 
							currentEmployeeId={currentEmployeeId}
							setUser={setUser}
							authenticate={isLoggedIn}
						/>

						<AuthRoute 
							exact
							path='/employees-list'
							component={EmployeesList}
							authenticate={isLoggedIn}
							setCurrentEmployeeId = {setCurrentEmployeeId}
							currentEmployeeId = {currentEmployeeId}
						/>
					
						<AuthRoute 
							exact
							path='/create-employee'
							component={CreateEmployee}
							authenticate={isLoggedIn}
							user={user} 
							setUser={setUser}
							currentEmployeeId={currentEmployeeId}
							setCurrentEmployeeId = {setCurrentEmployeeId}
						/>
						
						<AuthRoute 
							exact
							path='/view-employee'
							component={ViewEmployee}
							authenticate={isLoggedIn}
							currentEmployeeId = {currentEmployeeId}
						/>
						
						<AuthRoute 
							exact
							path='/edit-employee'
							component={EditEmployee}
							authenticate={isLoggedIn}
							currentEmployeeId = {currentEmployeeId}
						/> 
					</Switch>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
