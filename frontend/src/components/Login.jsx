import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginCheck } from '../redux/actionCreators';

const Login = (props) => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const regex = {
        email: /^[a-z0-9_.+-]+@[a-z\d.-]+\.[a-z.]{2,6}$/i,
        password: /^(?!^[0-9]*$)(?!^[a-zA-Z]*$)[a-zA-Z0-9]{6,}$/,
    };

    const [errorText, setErrorText] = useState({
        email: '',
        password: '',
    });

    const validateInput = (name, input) => {
        if (name === 'email') {
            setErrorText({
                ...errorText,
                [name]: !regex.email.test(input) ? 'Invalid Email Id' : '',
            });
        }
        if (name === 'password') {
            setErrorText({
                ...errorText,
                [name]: !regex.password.test(input)
                    ? 'Password must be Alphanumeric, Min. Length 6'
                    : '',
            });
        }
    };

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
        validateInput(name, event.target.value);
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: values.email || undefined,
            password: values.password || undefined,
        };

        props.loginCheck(user, (token) => {
            localStorage.setItem('token', token);
            navigate('/');
        });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h1>Sign in</h1>
            <form onSubmit={clickSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={values.email}
                    onChange={handleChange('email')}
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                {errorText.email && <div style={{ color: 'red', marginBottom: '10px' }}>{errorText.email}</div>}
                <input
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange('password')}
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                {errorText.password && <div style={{ color: 'red', marginBottom: '10px' }}>{errorText.password}</div>}
                {props.error && <div style={{ color: 'red', marginBottom: '10px' }}>{props.error}</div>}
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
                    disabled={!!(errorText.email || errorText.password)}
                >
                    Sign In
                </button>
                <div style={{ marginBottom: '10px' }}>
                    <a href="/password/forgot" style={{ textDecoration: 'none', color: '#007bff' }}>
                        Forgot password?
                    </a>
                </div>
                <div>
                    <a href="/signup" style={{ textDecoration: 'none', color: '#007bff' }}>
                        Don't have an account? Sign Up
                    </a>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    resume: state.resume,
    token: state.resume.token,
    error: state.resume.error,
});

const mapDispatchToProps = (dispatch) => ({
    loginCheck: (props, callback) => {
        dispatch(loginCheck(props, callback));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
