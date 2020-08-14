import React from 'react';
import { Spin } from 'antd';

import './style.css';

const LoadSpinner = () => {
  return (
    <div className="load-spinner">
      <Spin size="large" />
    </div>
  );
};

export default LoadSpinner;
