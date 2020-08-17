import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import './style.css';
import InnerForm from './InnerForm';
import { User } from '../../types';
import { updateUserStart } from '../../redux/thunks';
import UploadImage from '../UploadImage';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../redux/reducers';
import { Action } from 'redux';
import { useHistory } from 'react-router';

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
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { username, email, birthday, gender, bio } = authUser;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const history = useHistory();

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
    )
      .then(() => history.push('/feed'))
      .catch();
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
      <UploadImage
        type="avatar"
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {InnerForm}
      </Formik>
    </div>
  );
};

export default UserProfileForm;
