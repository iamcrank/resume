import React, { useState } from 'react';
import './form.css';

const Description = ({ sectionName, index, name, section }) => {
    const [lines, setLines] = useState(section[index][name]);
    const [errorText, setErrorText] = useState({});

    const validateInput = (id, input) => {
        if (input.length < 3) {
            setErrorText(prev => ({ ...prev, [id]: 'Too Small Text' }));
        } else if (input.length > 100) {
            setErrorText(prev => ({ ...prev, [id]: 'Too Large Text' }));
        } else {
            setErrorText(prev => ({ ...prev, [id]: '' }));
        }
    }

    const addLine = () => {
        const updatedLines = [...lines, ''];
        setLines(updatedLines);
        section[index][name] = updatedLines;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        validateInput(id, value);
        const updatedLines = lines.map((line, idx) => (idx === parseInt(id) ? value : line));
        setLines(updatedLines);
        section[index][name] = updatedLines;
    }

    return (
        <React.Fragment>
            {lines.map((text, idx) => (
                <div key={idx}>
                   <div className='name'>
                    <div className='inputs'>
                    <label htmlFor={`${idx}`}>Description Line {idx + 1}</label>
                    <input
                        type="text"
                        id={`${idx}`}
                        value={text}
                        onChange={handleChange}
                        
                    />
                    </div>
                   </div>
                    {errorText[idx] && (
                        <div style={{ color: 'red', marginBottom: '8px' }}>{errorText[idx]}</div>
                    )}
                </div>
            ))}

            <button
                onClick={addLine}
            >
                +
            </button>
        </React.Fragment>
    );
}

export default Description;
