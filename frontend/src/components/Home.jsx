import React from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchData, setData } from '../redux/actionCreators';
import './Home.css';

const Home = (props) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (props.token) {
            props.fetchData(props.token, function () {
                // navigate("/builder")
            })
        }
    }, []) // eslint-disable-line

    const handleClick = () => {
        props.setData(-1, function () {
            navigate("/builder")
        })
    };

    const publicURL = import.meta.env.VITE_PUBLIC_URL;

    return (
        <div className="page-wrapper">
            <div className="main">
                <section className="section1" >
                    <div className="box1">
                        <div className="innerbox1">
                            <span className="main-heading">Build your resume today</span>
                            <br></br>
                            <span className="main-subheading">Build a resume tailored to your needs,Easily create the perfect resume for any job using our best-in-class resume builder platform.</span>
                        </div>
                        <br></br>
                        <div className='btnbox1'>
                            <button className="btn1" onClick={handleClick}>BUILD MY RESUME</button>
                        </div>
                    </div>
                </section>

                <section className="start ">
                    <div className="start-heading ">
                        <span>How to Start?</span>
                    </div>

                    <div className="content1">
                        <div className="card-wrapper col-sm">
                            <div className="card">
                                <div className="card-heading">1</div>
                                <div className="card-body">
                                    <h5 className="card-title">Fill the form</h5>
                                    <p className="card-text">Fill out your details in 6 easy steps</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <div className="card-heading">2</div>
                                <div className="card-body">
                                    <h5 className="card-title">Choose template</h5>
                                    <p className="card-text">Choose a template from provided templates</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <div className="card-heading">3</div>
                                <div className="card-body">
                                    <h5 className="card-title">Download Resume</h5>
                                    <p className="card-text" >That's it! Now you can download your resume in pdf form</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='para'>
                    <div className='parabox'>
                        <p>Our online resume builder offers a quick and easy way to create your professional resume from over 30 design templates.
                             <br />Create a resume using our AI-powered online resume wizard, plus take advantage of expert suggestions and customizable modern and professional resume templates.
                              <br /> Free users have access to our easy-to-use tool and TXT file downloads.</p>
                    </div>
                </section>

                <section className="features ">
                    <div className="features-heading "><h4>Features</h4></div>

                    <div className="box2 ">
                        <div className="wrapper-row">
                            <div className="text-content col-sm">
                                <div className="f-heading">Blazingly Fast</div>
                                <div className="f-text">
                                    With our easy to use services you can build
                                    your resume in less than 10 minutes
                                </div>
                            </div>
                        </div>
                        <div className="wrapper-row">
                            <div className="text-content col-sm">
                                <div className="f-heading">Ready to use templates</div>
                                <div className="f-text">
                                    We provide multiple ready to use templates to
                                    speed up resume building process
                                </div>
                            </div>
                        </div>
                        <div className="wrapper-row">
                            <div className="text-content col-sm">
                                <div className="f-heading">Free of Cost</div>
                                <div className="f-text">
                                    We do not charge you any money for our services
                                    <br></br>
                                    But we encourage you to donate, it keeps our services running
                                </div>
                            </div>
                        </div>
                        <div className="wrapper-row">
                            <div className="text-content col-md">
                                <div className="f-heading">Design your own resume</div>
                                <div className="f-text">
                                    With our easy to use services you can create resume best suited to your needs
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="build-wrapper ">
                    <div className='build-heading'>
                        <h2>Get hired 33% faster with our feature-packed and easy-to-use resume builder app</h2>
                    </div>
                    <div className="btnbox2">
                        <button className="btn2" onClick={handleClick}>START NOW</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.resume.token,
        data: state.resume.data
    };
}

const mapDispatchToProps = dispatch => ({
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
    setData: (props, callback) => { dispatch(setData(props, callback)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
