import React from 'react';
import { Button } from 'antd';

import './style.css';

interface Props {
  navigate: Function;
}

const SignUp = ({ navigate }: Props) => {
  return (
    <div className="app-header__signup">
      <Button
        className="app-header__button"
        onClick={navigate('/login')}
        size="middle"
        ghost
      >
        Log In
      </Button>
      <Button
        className="app-header__button"
        onClick={navigate('/signup')}
        type="dashed"
        size="middle"
        ghost
      >
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
