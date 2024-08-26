import React from 'react';
import Personal from './forms/Personal';
import Education from './forms/Education.jsx';
import Experience from './forms/Experience';
import Project from './forms/Project';
import Skill from './forms/Skill.jsx';
import HiddenResume from './templates/HiddenResume';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { jsPDF } from 'jspdf';
import { fetchData, postData, updateData } from '../redux/actionCreators';
import './Home.css';

const Builder = (props) => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const token = props.token;

    const steps = ['Personal', 'Educational', 'Experience', 'Projects', 'Skills'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Personal />;
            case 1:
                return <Education resume={props.resume} />;
            case 2:
                return <Experience resume={props.resume} />;
            case 3:
                return <Project resume={props.resume} />;
            case 4:
                return <Skill resume={props.resume} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleClick = (idx) => {
        setActiveStep(idx);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const generatePdf = () => {
        if (props.image) {
            var img = new Image();
            img.src = props.image;
            img.onload = function () {
                var preview = document.getElementById('preview');
                if (!preview) return;

                var width = preview.clientWidth;
                var height = preview.clientHeight;

                const pdf = new jsPDF({
                    orientation: (height > width) ? 'portrait' : 'landscape',
                    unit: 'pt',
                    format: [width, height]
                });
                pdf.addImage(img, 'PNG', 0, 0, width, height, 'SLOW');
                pdf.save('resume.pdf');
            }
        }
    };

    const clickSave = (event) => {
        if (event) event.preventDefault();

        if (props.resume._id) {
            props.updateData(token, props.resume);
        } else if (token) {
            props.postData(token, props.resume);
        } else {
            navigate('/signup');
        }
    }

    return (
        <React.Fragment>
            <div className='b-container'>
                <main className='m-box'>
                    <div className='form-content'>
                        {getStepContent(activeStep)}
                        <div className='m-buttons'>
                            <button className='b-btn' onClick={handleBack} disabled={activeStep === 0}>
                                Back
                            </button>
                            {activeStep === steps.length - 1 ? (
                                <button className='b-btn' onClick={clickSave}>
                                    Save
                                </button>
                            ) : (
                                <button className='b-btn' onClick={handleNext}>
                                    Next
                                </button>
                            )}
                            <button
                                className='d-btn'
                                onClick={generatePdf}
                                disabled={!props.image}
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                    <div className='preview-content'>
                        {props.image && <img id="preview" alt="preview" src={props.image} />}
                        {/* Ensure HiddenResume receives the updated resume data */}
                        {props.resume.template && <HiddenResume id={props.resume.template} />}
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    resume: state.resume.data,
    token: state.resume.token,
    image: state.resume.image
});

const mapDispatchToProps = dispatch => ({
    fetchData: (props, callback) => dispatch(fetchData(props, callback)),
    postData: (token, resume) => dispatch(postData(token, resume)),
    updateData: (token, resume) => dispatch(updateData(token, resume)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Builder);
