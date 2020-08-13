import React, { PureComponent } from 'react';
import { Formik } from 'formik';

import './style.css';
import InnerForm from './InnerForm';
import { useDispatch } from 'react-redux';
import { logInStart } from '../../redux/thunks';

export interface LogInFormValues {
  email: string;
  password: string;
}

const initialValues: LogInFormValues = {
  email: 'vstone121@gmail.com',
  password: 'Pass1234-',
};

const LogInForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = ({ email, password }: LogInFormValues) => {
    console.log(`${email}, ${password}`);
    dispatch(logInStart({ email, password }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={InnerForm}
    />
  );
};

export default LogInForm;
