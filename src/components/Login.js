import React from 'react'
import '../style/Login.scss';

const Login = () => {
    return (
        <div className='loginPage'>
            <h1 className='text'>Login Page</h1>
            <h1 className='text'>Another Login</h1>
            <div className='loginContainer'>
                <form className='loginForm'>
                    <label>Username</label>
                    <input type='text' />
                    <label>Password</label>
                    <input type='password' />
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login