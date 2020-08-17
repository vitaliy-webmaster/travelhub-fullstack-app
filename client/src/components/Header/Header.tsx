import React, { useCallback } from 'react';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import './style.css';
import Logo from '../Logo';
import Profile from './Profile';
import SignUp from './SignUp';
import { authUserSelector } from '../../redux/selectors';

const Header = () => {
  const authUser = useSelector(authUserSelector);
  const history = useHistory();
  const location = useLocation();

  const navigate = useCallback(
    (url: string) => () => {
      history.push(url);
    },
    [history]
  );

  return (
    <Layout.Header className="app-header">
      <Logo />
      <Menu
        className="app-header__menu header-menu"
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/">
          <Link to="/" className="header-menu__link">
            Home
          </Link>
        </Menu.Item>

        <Menu.Item key="/feed">
          <Link to="/feed" className="header-menu__link">
            Feed
          </Link>
        </Menu.Item>
      </Menu>
      {authUser ? (
        <Profile authUser={authUser} navigate={navigate} />
      ) : (
        <SignUp navigate={navigate} />
      )}
    </Layout.Header>
  );
};

export default Header;
