import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './Signup.css';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        telegram: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, gender } = signupInfo;

        if (!email.endsWith('@nitk.edu.in')) {
            return handleError('Email must be from @nitk.edu.in domain');
        }

        if (!name || !email || !password || !gender) {
            return handleError('All fields except phone number and Telegram username are required');
        }

        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(result.error?.details?.[0]?.message || result.message);
            }
        } catch (err) {
            handleError('Signup failed, please try again later.');
        }
    };

    return (
        <div className="signup-container">
            {/* Left Info Panel */}
            <div className="signup-left">
                <h2>Join NITK Rideshare</h2>
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

            {/* Right Signup Form */}
            <div className="signup-right">
                <div className="signup-section">
                    <h1>Create an Account</h1>
                    <form onSubmit={handleSignup}>

                        <div className="input-group">
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                name='name'
                                value={signupInfo.name}
                                onChange={handleChange}
                                placeholder='Enter your name...'
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={signupInfo.email}
                                onChange={handleChange}
                                placeholder='Enter your email...'
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                name='password'
                                value={signupInfo.password}
                                onChange={handleChange}
                                placeholder='Enter your password...'
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor='gender'>Gender</label>
                            <select
                                name='gender'
                                value={signupInfo.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value=''>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor='phone'>Phone Number (Optional)</label>
                            <input
                                type='tel'
                                name='phone'
                                value={signupInfo.phone}
                                onChange={handleChange}
                                placeholder='Enter your phone number (optional)'
                                aria-describedby='phone-help'
                            />
                            <p id='phone-help' className='field-help'>
                                If you don't add a phone number, it won't be visible and ride partners can't contact you.
                            </p>
                        </div>

                        <div className="input-group">
                            <label htmlFor='telegram'>Telegram Username (Optional)</label>
                            <input
                                type='text'
                                name='telegram'
                                value={signupInfo.telegram}
                                onChange={handleChange}
                                placeholder='e.g. johndoe123'
                                aria-describedby='telegram-help'
                            />
                            <p id='telegram-help' className='field-help'>
                                Use Telegram if you prefer to communicate without sharing your phone number.
                            </p>
                        </div>

                        <button type='submit' className='signup-btn'>Sign Up</button>
                    </form>
                    <div className="login-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
