import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">resumye</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/builder">Create Resume</Link></li>
       <div className='buttons'>
       <li><button className='btn'><Link to="/login">Login</Link></button></li>
       <li><button className='bttn'><Link to="/signup">Signup</Link></button></li>
       </div>
      </ul>
    </nav>
  );
}

export default Navbar;
