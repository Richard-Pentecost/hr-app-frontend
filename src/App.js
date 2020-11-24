import React, { useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import EditInformation from './pages/EditInformation';
import ViewEmployee from './pages/ViewEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeesList from './pages/EmployeesList';
import CreateEmployee from './pages/CreateEmployee';
import VisitsList from './pages/VisitsList';
import ViewVisit from './pages/ViewVisit';
import CreateVisit from './pages/CreateVisit';
import EditVisit from './pages/EditVisit';
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';
import { ThemeProvider } from '@material-ui/core/styles';
import TokenManager from './utils/token-manager';
import theme from "./resources/theme";
import './style/App.scss';

const App = () => {

	const [token, setToken] = useState(TokenManager.isTokenValid() ? TokenManager.getTokenPayload() : null);
	const [user, setUser] = useState({firstName:'', surname:'', role:'', email:'', telephone:'', doB:'', address:'', nexOfKin:'', adminLevel:'', location:''})
	const [currentEmployeeId, setCurrentEmployeeId] = useState('');
	const [currentVisitId, setCurrentVisitId] = useState('');
	
	const isLoggedIn = () => {
    return Boolean(token) && TokenManager.isTokenValid();
	}
	
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div className="app">
					<Navbar authenticate={isLoggedIn} token={token} adminLevel={user.adminLevel} />
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
							email={user.email}
							adminLevel={user.adminLevel}
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

						<AuthRoute
							exact
							path='/visits-list'
							component={VisitsList}
							authenticate={isLoggedIn}
							adminLevel={user.adminLevel} 
							email={user.email} 
							setCurrentVisitId={setCurrentVisitId}
						/>

						<AuthRoute
							exact
							path='/view-visit'
							component={ViewVisit}
							authenticate={isLoggedIn}
							adminLevel={user.adminLevel} 
							email={user.email} 
							currentVisitId = {currentVisitId}
						/>

						<AuthRoute
							exact
							path='/edit-visit'
							component={EditVisit}
							authenticate={isLoggedIn}
							currentVisitId = {currentVisitId}
						/>

						<AuthRoute
							exact
							path='/create-visit'
							component={CreateVisit}
							authenticate={isLoggedIn}
							currentVisitId = {currentVisitId}
							setCurrentVisitId={setCurrentVisitId}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
