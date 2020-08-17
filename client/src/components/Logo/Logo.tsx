import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to={`/`}>
      <div className="logo" />
    </Link>
  );
};

export default Logo;
