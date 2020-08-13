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
}

const Profile = ({ authUser }: Props) => {
  const { _id, username, avatar = '' } = authUser;
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutStart());
  };

  return (
    <div className="app-header__profile header-profile">
      <Avatar size={36} shape="square" icon={<UserOutlined />} src={avatar} />
      <div className="header-profile__greeting">
        <div>
          Hello, <span className="header-profile__username">{username}</span>
        </div>
        <div>
          <Link to={`/user/${_id}`}>Profile</Link>
          <Link to={`/user/${_id}`}>Posts</Link>
          <a href="#" onClick={logOut}>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
