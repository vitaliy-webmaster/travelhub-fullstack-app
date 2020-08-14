import React from 'react';
import moment, { Moment } from 'moment';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import './style.css';
import InnerForm from './InnerForm';
import { User } from '../../types';
import { updateUserStart } from '../../redux/thunks';

export interface UserProfileFormValues {
  username: string;
  email: string;
  birthday?: Moment;
  gender?: string;
  bio?: string;
  avatar?: string;
}

interface Props {
  authUser: User;
}

const UserProfileForm = ({ authUser }: Props) => {
  const dispatch = useDispatch();
  const { username, email, birthday, gender, bio, avatar } = authUser;

  const handleSubmit = (values: UserProfileFormValues) => {
    const { birthday, gender, bio, avatar } = values;
    dispatch(
      updateUserStart({ id: authUser._id, birthday, gender, bio, avatar })
    );
  };

  const initialValues: UserProfileFormValues = {
    username,
    email,
    birthday: moment(birthday),
    gender,
    bio,
    avatar,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {InnerForm}
    </Formik>
  );
};

export default UserProfileForm;
