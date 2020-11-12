import React, { useReducer, useState } from 'react';
import axios from 'axios';
import { users } from '../data.json';
import '../style/Login.scss';
import { URL } from '../utils/Constants';

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
// const URL = 'https://hr-app-backend-api.herokuapp.com/api/login'


const Login = ({ setIsLoggedIn, setId }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const inputChangeHandler = event => {
        const { name, value } = event.target;
        if (errorMessage) {setErrorMessage('')}
        if (name === 'username') {
            setUsername(value);
        } else {
            setPassword(value);
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const loginData = {
            username,
            password,
        }

        try {
            const response = await axios.post(`${URL}/login`, loginData);
            setId(response.data.id);
            setIsLoggedIn(true);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }
    return (
        <div className='loginPage'>
            <h1 className='text'>Login</h1>
            <div className='loginContainer'>
                <form className='loginForm' onSubmit={submitHandler}>
                    <label id="label-username">Username</label>
                    <input 
                        className='loginForm__input'
                        type='text' 
                        id="usernameInput"
                        value={username}
                        name='username'
                        placeholder='Username'
                        onChange={inputChangeHandler}
                    />
                    <label>Password</label>
                    <input 
                        className='loginForm__input'
                        id='passwordInput'
                        type='password' 
                        value={password}
                        name='password'
                        placeholder='Password'
                        onChange={inputChangeHandler}
                    />
                    <button type='submit'className='loginForm__button'>Login</button>
                </form>
                {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
            </div>
        </div>
    )
}

export default Login