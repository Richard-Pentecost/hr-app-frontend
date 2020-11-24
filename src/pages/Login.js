import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../utils/Constants';
import Form from '../components/Form';
import Heading from '../components/Heading';
import TokenManager from '../utils/token-manager';
import '../style/Login.scss';

const Login = ({ setToken }) => {
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
            email: email,
            password,
        }

        try {
            const response = await axios.post(`${URL}/login/authenticate`, loginData);
            console.log(response)
            TokenManager.setToken(response.data.token);
            const token = TokenManager.getTokenPayload();
            setToken(token);
        } catch (error) {
            console.log(error);
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
                {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
            </div>
        </div>
    )
}

export default Login