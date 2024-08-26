import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import config from '../config/config.jsx';

export default function Signup() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        error: ''
    });

    const [errorText, setErrorText] = useState({
        email: '',
        lastName: '',
        firstName: '',
        password: ''
    });

    const validateInput = (name, input) => {
        let error = '';
        switch (name) {
            case 'firstName':
            case 'lastName':
                if (input.length < 3)
                    error = 'Name must be at least 3 characters';
                break;
            case 'email':
                const emailRegex = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;
                if (!emailRegex.test(input))
                    error = 'Invalid Email Id';
                break;
            case 'password':
                const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
                if (!passwordRegex.test(input))
                    error = 'Password must be alphanumeric and at least 6 characters long';
                break;
            default:
                break;
        }
        setErrorText(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = name => event => {
        const value = event.target.value;
        setValues(prev => ({ ...prev, [name]: value }));
        validateInput(name, value);
    };

    const create = async (user) => {
        try {
            const response = await fetch(`${config.REACT_APP_API_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const result = await response.json();
            if (response.ok) {
                navigate("/login", { state: result.user });
            } else {
                setValues(prev => ({ ...prev, error: result.error }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
        };
        create(user);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        First Name
                        <input
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange('firstName')}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                        />
                        {errorText.firstName && <p style={{ color: 'red' }}>{errorText.firstName}</p>}
                    </label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Last Name
                        <input
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange('lastName')}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                        />
                        {errorText.lastName && <p style={{ color: 'red' }}>{errorText.lastName}</p>}
                    </label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Email Address
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                        />
                        {errorText.email && <p style={{ color: 'red' }}>{errorText.email}</p>}
                    </label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange('password')}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                        />
                        {errorText.password && <p style={{ color: 'red' }}>{errorText.password}</p>}
                    </label>
                </div>
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
                    disabled={Object.values(errorText).some(err => err)}
                >
                    Sign Up
                </button>
                {values.error && <p style={{ color: 'red' }}>{values.error}</p>}
                <div style={{ marginTop: '15px' }}>
                    <a href="/login">Already have an account? Sign in</a>
                </div>
            </form>
        </div>
    );
}
