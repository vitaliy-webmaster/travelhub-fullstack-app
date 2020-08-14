import React from 'react';

import './style.css';
import UserProfileForm from '../../components/UserProfileForm';
import LoadSpinner from '../../components/LoadSpinner';
import { useSelector } from 'react-redux';
import { authUserSelector } from '../../redux/selectors';

const User = () => {
  const authUser = useSelector(authUserSelector);
  return (
    <div className="page-user">
      {authUser ? (
        <>
          <div className="page-user__header">Edit your profile now</div>
          <div className="page-user__form">
            <UserProfileForm authUser={authUser} />
          </div>
        </>
      ) : (
        <LoadSpinner />
      )}
    </div>
  );
};

export default User;
