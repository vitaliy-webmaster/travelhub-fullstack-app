import React from 'react';

import './style.css';
import LogInForm from '../../components/LogInForm';

const LogIn = () => {
  return (
    <div className="page-login">
      <div className="page-login__header">Log in to TravelHub</div>
      <div className="page-login__form">
        <LogInForm />
      </div>
    </div>
  );
};

export default LogIn;
