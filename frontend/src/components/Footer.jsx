import React from 'react';

function Copyright() {
  return (
    <p style={{ color: '#6c757d' }}>
      {'Copyright © '}
      <a href="#" style={{ color: '#007bff' }}>
        Resume Builder
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </p>
  );
}

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa' }}>
      <Copyright />
    </footer>
  );
}

export default Footer;
