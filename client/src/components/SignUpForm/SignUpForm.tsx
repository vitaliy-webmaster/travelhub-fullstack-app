import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../redux/thunks';
import { Formik } from 'formik';
import InnerForm from './InnerForm';

export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  birthday?: Date;
  gender?: string;
  bio?: string;
  avatar?: string;
}

const initialValues: SignUpFormValues = {
  username: 'TestUser',
  email: 'test12@gmail.com',
  password: 'Pass1234-',
  birthday: undefined,
  gender: undefined,
  bio: undefined,
  avatar: undefined,
};

const SignUpForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values: SignUpFormValues) => {
    dispatch(signUpStart(values));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {InnerForm}
    </Formik>
  );
};

export default SignUpForm;
