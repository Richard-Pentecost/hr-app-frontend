import React from 'react'
import '../style/Login.scss';

const Login = () => {
    return (
        <>
            <h1>Login Page</h1>
            <h1>Another Login</h1>
            <div className='loginContainer'>
                <form className='loginForm'>
                    <label>Username</label>
                    <input />
                    <label>Password</label>
                    <input />
                    <button>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login