




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './Login.css';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = 'http://localhost:8080/auth/login';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                handleError(error?.details?.[0]?.message || message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="login-container">
            {/* Left Info Panel */}
            <div className="login-left">
                <h2> Welcome To NITK Rideshare</h2>
                <p>
                    We aim to Match NITK people with similar destination, date and time, Give it a try!!!....
                    reduce Carbon footprint and save Money.
                </p>
                <ul>
                    <li>✔️ Trusted & Secure Platform</li>
                    <li>✔️ Save travel costs</li>
                    <li>✔️ Connect with real NITK people</li>
                </ul>
            </div>

            {/* Right Login Form */}
            <div className="login-right">
                 {/* <h1>NITK Ride Share</h1> */}
                <div className="login-section">
                    <h1>Sign in to your account</h1>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='Enter your email...'
                                value={loginInfo.email}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor='password'>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder='Enter your password...'
                                value={loginInfo.password}
                            />
                        </div>
                        <button type='submit' className="login-btn">Sign In</button>
                    </form>
                    <div className="signup-link">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;

