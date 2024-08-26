import React from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { setTitle, updateResumeData } from '../../redux/actionCreators';
import templates from '../templates/templates'; 

const Template = (props) => {
    const navigate = useNavigate();
    const [errorText, setErrorText] = React.useState('');

    const validateInput = (input) => {
        setErrorText(input.length < 3 ? 'Too Small Input' : '');
    };

    const handleChange = (e) => {
        const { value } = e.target;
        validateInput(value);
        props.setTitle(value);

        const newData = { ...props.resume.data, title: value };
        props.updateResumeData(newData);
    };

    const handleClick = (template) => {
        const updatedResume = {
            ...props.resume.data,
            template,
        };
        props.updateResumeData(updatedResume);
        navigate(`/${template}`);
    };

    return (
        <div>
            {errorText && <p style={{ color: 'red' }}>{errorText}</p>}
            <input
                type="text"
                onChange={handleChange}
                placeholder="Enter title"
            />
            <div>
                {templates.map((template) => (
                    <button key={template} onClick={() => handleClick(template)}>
                        {template}
                    </button>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    resume: state.resume,
});

const mapDispatchToProps = (dispatch) => ({
    setTitle: (title) => dispatch(setTitle(title)),
    updateResumeData: (data) => dispatch(updateResumeData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);
