import React from 'react';
import { Layout } from 'antd';

import './style.css';

const Footer = () => {
  return (
    <Layout.Footer className="app-footer">
      <span className="app-footer__text">
        &copy;{new Date().getFullYear()} Developed by Vitaliy Ch.
      </span>
    </Layout.Footer>
  );
};

export default Footer;
