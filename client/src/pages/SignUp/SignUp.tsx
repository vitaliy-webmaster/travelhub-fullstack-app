import React from 'react';

import './style.css';
import SignUpForm from '../../components/SignUpForm';

const SignUp = () => {
  return (
    <div className="page-signup">
      <div className="page-signup__header">Sign Up to TravelHub</div>
      <div className="page-signup__form">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
