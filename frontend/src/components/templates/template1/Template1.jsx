import React from 'react';
import './template1.css';
import { connect } from 'react-redux';
import { renderPreview } from '../../../redux/actionCreators';
import { useLocation } from "react-router-dom";

const Template1 = ({ resume, renderPreview }) => {
    const location = useLocation();

    React.useEffect(() => {
        renderPreview();
    }, []); //eslint-disable-line

    return (
        <div id={location.state ? '' : 'hide'}>
            <div className="container" id='template'>
                <div className="main">
                    <div className="resume col-12">
                        <div className="top-content">
                            <div className="name">
                                <h1><strong>{resume.personal.firstName || 'First Name'}</strong> {resume.personal.lastName || 'Last Name'}</h1>
                            </div>
                            <div className="contact-details row-fluid">
                                <div className="span3">{resume.personal.website || 'Website'}</div>
                                <div className="span3"> |</div>
                                <div className="span3">{resume.personal.email || 'Email'}</div>
                                <div className="span3">|</div>
                                <div className="span3">{resume.personal.phone || 'Phone'}</div>
                            </div>
                        </div>
                        <hr />
                        <div className="main-content row">
                            <div className="left-content col-sm">
                                <div className="education content">
                                    <div className="heading">
                                        <h2>EDUCATION</h2>
                                    </div>
                                    <div className="info">
                                        {(resume.education || []).map((education, index) => (
                                            <div key={index} className="details">
                                                <p className="sub-heading">{education.degree || 'Degree'}</p>
                                                <p>{education.university || 'University'}</p>
                                                <p className="inline">{education.startDate || 'Start Date'} - </p>
                                                <p className="inline">{education.endDate || 'End Date'}</p>
                                                <p>GPA: {education.gpa || 'GPA'}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="skills content">
                                    <div className="heading">
                                        <h2>SKILLS</h2>
                                    </div>
                                    <div className="info">
                                        {(resume.skills || []).map((skill, index) => (
                                            <div key={index} className="details">
                                                <p className="sub-heading">{skill.skillName || 'Skill Name'}</p>
                                                <div>
                                                    {(Array.isArray(skill.keywords) ? skill.keywords : []).map((keyword, i) => (
                                                        <p key={`keyword_${i}`} className="inline">{keyword || 'Keyword'} </p>
                                                    ))}
                                                </div>
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="achievements content">
                                    <div className="heading">
                                        <h2>ACHIEVEMENTS</h2>
                                    </div>
                                    <div className="info">
                                        {(resume.achievements || []).map((achievement, index) => (
                                            <div key={index} className="details">
                                                <p className="sub-heading">{achievement.title || 'Title'}</p>
                                                <div>
                                                    <p className="inline">{achievement.organisation || 'Organisation'} - </p>
                                                    <p className="inline">{achievement.date || 'Date'}</p>
                                                    <div className="description">
                                                        {(Array.isArray(achievement.description) ? achievement.description : []).map((desc, i) => (
                                                            <p key={`desc_${i}`} className="description">{desc || 'Description'}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="right-content col-sm">
                                <div className="experience content">
                                    <div className="heading">
                                        <h2>WORK EXPERIENCE</h2>
                                    </div>
                                    <div className="info">
                                        {(resume.experience || []).map((experience, index) => (
                                            <div key={index} className="details">
                                                <p className="sub-heading">{experience.title || 'Title'}</p>
                                                <p className="inline">{experience.organisation || 'Organisation'}</p>
                                                <p className="inline">({experience.startDate || 'Start Date'} - </p>
                                                <p className="inline">{experience.endDate || 'End Date'})</p>
                                                <div className="description">
                                                    {(Array.isArray(experience.description) ? experience.description : []).map((desc, i) => (
                                                        <p key={`desc_${i}`}>{desc || 'Description'}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="projects content">
                                    <div className="heading">
                                        <h2>PROJECTS</h2>
                                    </div>
                                    <div className="info">
                                        {(resume.projects || []).map((project, index) => (
                                            <div key={index} className="details">
                                                <p className="sub-heading">{project.projectName.toUpperCase() || 'Project Name'}</p>
                                                <div>
                                                    {(Array.isArray(project.keywords) ? project.keywords : []).map((keyword, i) => (
                                                        <p key={`keyword_${i}`} className="inline">{keyword || 'Keyword'} </p>
                                                    ))}
                                                </div>
                                                <br />
                                                <div className="description">
                                                    {(Array.isArray(project.projectDescription) ? project.projectDescription : []).map((desc, i) => (
                                                        <p key={`desc_${i}`}>{desc || 'Project Description'}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    resume: state.resume.data
});

const mapDispatchToProps = dispatch => ({
    renderPreview: () => dispatch(renderPreview())
});

export default connect(mapStateToProps, mapDispatchToProps)(Template1);
