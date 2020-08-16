import React, { useCallback } from 'react';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './style.css';
import Logo from '../Logo';
import Profile from './Profile';
import SignUp from './SignUp';
import { authUserSelector } from '../../redux/selectors';

const Header = () => {
  const authUser = useSelector(authUserSelector);
  const history = useHistory();

  const navigate = useCallback(
    (url: string) => () => {
      history.push(url);
    },
    [history]
  );

  return (
    <Layout.Header className="app-header">
      <Logo />
      <Menu className="app-header__menu" theme="dark" mode="horizontal">
        <Menu.Item key="1" onClick={navigate('/')}>
          Home
        </Menu.Item>
        <Menu.Item key="2" onClick={navigate('/feed')}>
          Feed
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
