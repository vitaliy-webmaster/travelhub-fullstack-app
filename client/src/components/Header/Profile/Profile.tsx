import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './style.css';
import { User } from '../../../types';
import { useDispatch } from 'react-redux';
import { logOutStart } from '../../../redux/thunks';

interface Props {
  authUser: User;
  navigate: Function;
}

const Profile = ({ authUser }: Props) => {
  const { username, avatar = '/server/images/avatar-default.jpg' } = authUser;
  const dispatch = useDispatch();

  const logOut = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(logOutStart());
  };

  return (
    <div className="app-header__profile header-profile">
      <Link to={`/me`}>
        <Avatar size={42} shape="square" icon={<UserOutlined />} src={avatar} />
      </Link>
      <div className="header-profile__greeting">
        <div>
          Hello, <span className="header-profile__username">{username}</span>
        </div>
        <div>
          <Link to={`/post/new`}>New</Link>
          <Link to={`/me`}>Profile</Link>
          <a href="about:blank" onClick={logOut}>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
