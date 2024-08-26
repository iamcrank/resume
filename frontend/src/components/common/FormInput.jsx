import React, { useState } from 'react';
import './form.css';

export default function FormInput({ section, id, input, update, name }) {
    const [errorText, setErrorText] = useState({});

    // Generic validation function
    const validateInput = (name, value) => {
        // Placeholder for future validation logic if needed
        setErrorText({ [name]: '' });
    };

    // Handle changes to input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedSection = [...section];
        validateInput(name, value);

        updatedSection[id][name] = value;
        update(updatedSection);
    };

    return (
        <div>
           <form>
            <div className='name'>
                <div className='inputs'>
                {Object.entries(input).map(([field, _], idx) => (
                <div key={idx}>
                    <label htmlFor={field + idx}>{field}</label>
                    <input
                        id={field + idx}
                        name={field}
                        value={section[id][field] || ''}
                        onChange={handleChange}
                        type={field.includes('date') ? 'date' : 'text'}
                    />
                    {errorText[field] && <span>{errorText[field]}</span>}
                </div>
            ))}
                </div>
            </div>
           </form>
        </div>
    );
}
