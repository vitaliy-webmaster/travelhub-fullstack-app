import React from 'react';
import { Layout } from 'antd';

import './style.css';

const Footer = () => {
  return (
    <Layout.Footer className="app-footer">
      &copy;{new Date().getFullYear()} Developed by Vitaliy Ch.
    </Layout.Footer>
  );
};

export default Footer;
