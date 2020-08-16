import React from 'react';
import { Formik } from 'formik';

import './style.css';
import InnerForm from './InnerForm';
import { useDispatch } from 'react-redux';
import { logInStart } from '../../redux/thunks';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../redux/reducers';
import { Action } from 'redux';
import { useHistory } from 'react-router';

export interface LogInFormValues {
  email: string;
  password: string;
}

const initialValues: LogInFormValues = {
  email: 'vstone121@gmail.com',
  password: 'Pass1234-',
};

const LogInForm = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const history = useHistory();

  const handleSubmit = ({ email, password }: LogInFormValues) => {
    dispatch(logInStart({ email, password }))
      .then(() => history.push('/feed'))
      .catch();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {InnerForm}
    </Formik>
  );
};

export default LogInForm;
