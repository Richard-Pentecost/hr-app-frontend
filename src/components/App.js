import React, { useState } from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import '../style/App.scss';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/'>
          { isLoggedIn ? <Redirect to='/home' /> : <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> }
        </Route>
      </Switch>
    </div>
  );
}

export default App;
