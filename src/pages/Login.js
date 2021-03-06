import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../utils/Constants';
import Form from '../components/Form';
import Heading from '../components/Heading';
import TokenManager from '../utils/token-manager';
import LoadingWrapper from '../components/LoadingWrapper';
import '../style/Login.scss';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const response = await axios.post(`${URL}/login/authenticate`, loginData);
            TokenManager.setToken(response.data.token);
            const token = TokenManager.getTokenPayload();
            setToken(token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
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
            <div className='loginHeadingContainer'>
                <Heading>Login</Heading>
            </div>
            <LoadingWrapper loading={loading}>
                <div className='loginContainer'>
                    <Form 
                        formArr={formArr}
                        handleInputChange={inputChangeHandler}
                        handleSubmit={submitHandler}
                        errorMessage={errorMessage}
                        btnText='Login'
                    />
                    
                </div>
            </LoadingWrapper>
        </div>
    )
}

export default Login