import React from 'react';
import { Form, Field, FormikProps } from 'formik';
import { AntInput, AntInputPassword } from '../shared/CreateAntFields';
import { validateEmail, validatePassword } from '../../helpers/validateFields';
import { LogInFormValues } from './LogInForm';

export default ({
  handleSubmit,
  values,
  submitCount,
}: FormikProps<LogInFormValues>) => (
  <Form className="login-form-container" onSubmit={handleSubmit}>
    <Field
      component={AntInput}
      name="email"
      type="email"
      label="Email*"
      validate={validateEmail}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntInputPassword}
      name="password"
      type="password"
      label="Password*"
      validate={validatePassword}
      submitCount={submitCount}
      hasFeedback
    />
    <div className="login-submit-container">
      <button className="ant-btn ant-btn-primary" type="submit">
        Submit
      </button>
    </div>
  </Form>
);
