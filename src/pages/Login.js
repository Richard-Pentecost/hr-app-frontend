import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../utils/Constants';
import Form from '../components/Form';
import Heading from '../components/Heading';
import '../style/Login.scss';

const Login = ({ setIsLoggedIn, setId }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const inputChangeHandler = event => {
        const { name, value } = event.target;
        if (errorMessage) {setErrorMessage('')}
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const loginData = {
            username: email,
            password,
        }

        try {
            const response = await axios.post(`${URL}/login`, loginData);
            setId(response.data.id);
            setIsLoggedIn(true);
        } catch (error) {
            const { data } = error.response
            let errorMessage;
            data.message ? errorMessage = data.message : errorMessage = data.title;
            setErrorMessage(errorMessage);
        }
    }

    const formArr = [
        { type: 'text', value: email, name: 'email', label: 'Email' },
        { type: 'password', value: password, name: 'password', label: 'Password' },
    ];
    return (
        <div className='loginPage'>
            <Heading>Login</Heading>
            <div className='loginContainer'>
                <Form 
                    formArr={formArr}
                    handleInputChange={inputChangeHandler}
                    handleSubmit={submitHandler}
                    btnText='Login'
                />

                {/* <form className='loginForm' onSubmit={submitHandler}>
                    <div className='loginForm__inputContainer'>
                        <label id="label-username" className='loginForm__label'>Email</label>
                        <input 
                            className='loginForm__input'
                            type='text' 
                            id="emailInput"
                            value={email}
                            name='email'
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className='loginForm__inputContainer'>
                        <label className='loginForm__label'>Password</label>
                        <input 
                            className='loginForm__input'
                            id='passwordInput'
                            type='password' 
                            value={password}
                            name='password'
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <button type='submit'className='loginForm__button'>Login</button>
                </form> */}
                {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
            </div>
        </div>
    )
}

export default Login