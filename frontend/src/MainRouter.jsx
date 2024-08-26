// src/MainRouter.js
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Builder from './components/Builder';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Template1 from './components/templates/template1/Template1';
import Template2 from './components/templates/template2/Template2';
import { connect } from 'react-redux';
import { logInSuccess } from './redux/actionCreators';

const MainRouter = (props) => {

  const storedJwt = localStorage.getItem('token');

  React.useEffect(() => {
    if (storedJwt)
      props.logInSuccess(storedJwt)
  }, []) //eslint-disable-line

  return (
    <div>
      <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/template1" element={<Template1 />} />
          <Route path="/template2" element={<Template2 />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    resume: state.resume,
    token: state.resume.token
  }
}

const mapDispatchToProps = dispatch => ({
  logInSuccess: (props, callback) => { dispatch(logInSuccess(props)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);
