import React from 'react';

import './style.css';
import LogInForm from '../../components/LogInForm';

const Starter = () => {
  return (
    <div className="page-starter">
      <div className="page-starter__greeting greeting">
        <h1 className="greeting__header">Built for travellers</h1>
        <p className="greeting__text">
          This BLOG is a travel platform inspired by the way you live and
          create. From Kiev to New York, you can share your lifestyle, open up
          new adventures, and build your audience everywhere you want.
        </p>
      </div>
      <div className="page-starter__login login-container">
        <LogInForm />
      </div>
    </div>
  );
};

export default Starter;
