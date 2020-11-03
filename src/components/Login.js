import React, { useReducer, useState } from 'react'
import { users } from '../data.json';
import '../style/Login.scss';

// const initialState = {
//     username: '',
//     password: '',
// };

// const loginReducer = (currentState, action) => {
//     switch (action.type) {
//         case 'USERNAME_CHANGE':
//             return { ...currentState, username: action.payload };
//         case 'PASSWORD_CHANGE':
//             return { ...currentState, password: action.payload };
//         default:
//             return currentState;
//     };
// };

const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginFail, setLoginFail] = useState(false);

    const inputChangeHandler = event => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else {
            setPassword(value);
        }
    };

    const submitHandler = event => {
        event.preventDefault();
        console.log(username + ': ' + password);
        const user = users.find(item => item.username === username)
        if (user && user.password === password) {
            setLoginFail(false);
            setLoginSuccess(true);
            props.setId(user.id);
            props.setIsLoggedIn(true);
        } else {
            setLoginSuccess(false);
            setLoginFail(true);
            props.setIsLoggedIn(false)
        }
    }
    return (
        <div className='loginPage'>
            <h1 className='text'>Login Page</h1>
            <div className='loginContainer'>
                <form className='loginForm' onSubmit={submitHandler}>
                    <label>Username</label>
                    <input 
                        className='loginForm__input'
                        type='text' 
                        value={username}
                        name='username'
                        onChange={inputChangeHandler}
                    />
                    <label>Password</label>
                    <input 
                        className='loginForm__input'
                        type='password' 
                        value={password}
                        name='password'
                        onChange={inputChangeHandler}
                    />
                    <button type='submit'>Login</button>
                </form>
                {loginSuccess && <div className='successMessage'>You have successfully logged in as {username}</div>}
                {loginFail && <div className='errorMessage'>There was an error logging in</div>}
            </div>
        </div>
    )
}

export default Login