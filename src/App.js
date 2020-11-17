import React, { useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import EditInformation from './pages/EditInformation';
import ViewEmployee from './pages/ViewEmployee';
import EmployeesList from './pages/EmployeesList';
import CreateEmployee from './pages/CreateEmployee';
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./resources/theme";
import './style/App.scss';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [id, setId] = useState('');
	const [user, setUser] = useState({firstName:'', surname:'', role:'', email:'', telephone:'', doB:'', address:'', nexOfKin:'', permissionsLevel:'', location:''})
	const [currentEmployeeId, setCurrentEmployeeId] = useState('');
	return (
		<ThemeProvider theme={theme}>
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
							user={user} 
							setUser={setUser}
						/>

						<AuthRoute 
							exact
							path='/edit-information'
							component={EditInformation}
							isLoggedIn={isLoggedIn}
							id={id}
							user={user} 
							setUser={setUser}
						/>

						<AuthRoute 
							exact
							path='/employees-list'
							component={EmployeesList}
							isLoggedIn={isLoggedIn}
							setCurrentEmployeeId = {setCurrentEmployeeId}
							currentEmployeeId = {currentEmployeeId}
						/>

						<AuthRoute 
							exact
							path='/create-employee'
							component={CreateEmployee}
							isLoggedIn={isLoggedIn}
							id={id}
							user={user} 
							setUser={setUser}
						/>

						<AuthRoute 
							exact
							path='/view-employee'
							component={ViewEmployee}
							isLoggedIn={isLoggedIn}
							currentEmployeeId = {currentEmployeeId}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
