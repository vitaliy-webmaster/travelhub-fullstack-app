import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import './style.css';
import InnerForm from './InnerForm';
import { User } from '../../types';
import { updateUserStart } from '../../redux/thunks';
import UploadAvatarImage from '../UploadAvatarImage';

export interface UserProfileFormValues {
  username: string;
  email: string;
  birthday?: Moment;
  gender?: string;
  bio?: string;
}

interface Props {
  authUser: User;
}

const UserProfileForm = ({ authUser }: Props) => {
  const dispatch = useDispatch();
  const { username, email, birthday, gender, bio } = authUser;
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (authUser?.avatar) setImageUrl(authUser.avatar);
  }, [authUser]);

  const handleSubmit = (values: UserProfileFormValues) => {
    const { birthday, gender, bio } = values;
    dispatch(
      updateUserStart({
        id: authUser._id,
        birthday,
        gender,
        bio,
        avatar: imageUrl,
      })
    );
  };

  const initialValues: UserProfileFormValues = {
    username,
    email,
    birthday: birthday ? moment(birthday) : undefined,
    gender,
    bio,
  };

  return (
    <div className="user-profile-wrapper">
      <UploadAvatarImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {InnerForm}
      </Formik>
    </div>
  );
};

export default UserProfileForm;
