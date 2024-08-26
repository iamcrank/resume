import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleChange = (event) => setEmail(event.target.value);

    const handleResponse = (res) => {
        if (res.status === 200) {
            alert('Please check your mail for the password reset link. Redirecting you to the login page.');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            alert('Invalid Email');
        }
    };

    const sendResetEmail = async (user) => {
        try {
            const response = await fetch(`${config.REACT_APP_API_URL}/api/password/forgot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            handleResponse(response);
        } catch (err) {
            console.error(err);
            alert('An error occurred while trying to send the reset email');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendResetEmail({ email });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <div style={{ marginBottom: '20px' }}>
                <div
                    style={{
                        margin: '10px auto',
                        backgroundColor: '#f50057',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}
                >
                    <i className="fas fa-key" />
                </div>
                <h1 style={{ marginBottom: '20px' }}>Forgot Password?</h1>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '10px',
                    }}
                >
                    Reset
                </button>
            </form>
        </div>
    );
}
