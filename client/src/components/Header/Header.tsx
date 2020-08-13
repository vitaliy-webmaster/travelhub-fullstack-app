import React from 'react';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';

import './style.css';
import Logo from '../Logo';
import { authUserSelector } from '../../redux/selectors';
import Profile from './Profile';
import Signup from './Signup';

const Header = () => {
  const authUser = useSelector(authUserSelector);

  return (
    <Layout.Header className="app-header">
      <Logo />
      <Menu
        className="app-header__menu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Feed</Menu.Item>
      </Menu>
      {authUser ? <Profile authUser={authUser} /> : <Signup />}
    </Layout.Header>
  );
};

export default Header;
