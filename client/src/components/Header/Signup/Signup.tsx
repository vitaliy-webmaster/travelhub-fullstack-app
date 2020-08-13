import React from 'react';
import { Button } from 'antd';

import './style.css';

const Signup = () => {
  return (
    <div className="app-header__signup">
      <Button className="app-header__button" size="middle" ghost>
        Log In
      </Button>
      <Button className="app-header__button" type="dashed" size="middle" ghost>
        Sign Up
      </Button>
    </div>
  );
};

export default Signup;
