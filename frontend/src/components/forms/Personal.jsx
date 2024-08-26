import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setPersonalDetails } from '../../redux/actionCreators';
import './Form.css';

function PersonalForm(props) {
    const regex = {
        email: /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        name: /^[A-Z][a-zA-Z]{1,}$/,
        website: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        phone: /^\d{6,}$/
    };

    const [errorText, setErrorText] = useState({
        email: '',
        firstName: '',
        lastName: '',
        website: '',
        phone: ''
    });

    const validateInput = (name, input) => {
        let errorMessage = '';
        if (name === 'firstName' || name === 'lastName') {
            if (!input.match(regex.name) || input.length <= 2) {
                errorMessage = 'Invalid Name; Must start with an uppercase letter and be longer than 2 characters';
            }
        } else if (name === 'email') {
            if (!input.match(regex.email)) {
                errorMessage = 'Invalid Email Id';
            }
        } else if (name === 'phone') {
            if (!input.match(regex.phone)) {
                errorMessage = 'Invalid Phone No., Min. Length 6';
            }
        } else if (name === 'website') {
            if (!input.match(regex.website)) {
                errorMessage = 'Invalid Link';
            }
        }
        setErrorText(prevState => ({ ...prevState, [name]: errorMessage }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newDetails = { ...props.resume.personal, [name]: value };
        props.setPersonalDetails({ ...props.resume, personal: newDetails });
        validateInput(name, value);
    };

    return (
        <div className='wrapper'>
            
            <form className='form'>
           <div className='box'>
             <h2 className='heading'>Personal Details</h2>
           <p className='text'>Get started with the basics: your name and contact information.</p>
           </div>
             <div className='name'>
                <div className='inputs'>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={props.resume.personal.firstName || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px' }}
                    />
                    {errorText.firstName && <div style={{ color: 'red' }}>{errorText.firstName}</div>}
                </div>
                <div className='inputs'>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={props.resume.personal.lastName || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px' }}
                    />
                    {errorText.lastName && <div style={{ color: 'red' }}>{errorText.lastName}</div>}
                </div>
             </div>
               <div className='name'>
               <div  className='inputs' >
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={props.resume.personal.email || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px' }}
                    />
                    {errorText.email && <div style={{ color: 'red' }}>{errorText.email}</div>}
                </div>
                <div  className='inputs'>
                    <label htmlFor="phone">Phone No.:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={props.resume.personal.phone || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px' }}
                    />
                    {errorText.phone && <div style={{ color: 'red' }}>{errorText.phone}</div>}
                </div>
               </div>
               <div> <div  className='inputs'>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={props.resume.personal.address || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px' }}
                    />
                    {errorText.firstName && <div style={{ color: 'red' }}>{errorText.firstName}</div>}
                </div>
                </div>
               
                <div  className='inputs'>
                    <label htmlFor="website">Professional Profile/Website:</label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        value={props.resume.personal.website || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px' }}
                    />
                    {errorText.website && <div style={{ color: 'red' }}>{errorText.website}</div>}
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    resume: state.resume.data,
});

const mapDispatchToProps = dispatch => ({
    setPersonalDetails: (details) => dispatch(setPersonalDetails(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalForm);
