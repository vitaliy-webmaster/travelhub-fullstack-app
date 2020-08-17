import React from 'react';

import { Form, Field, FormikProps } from 'formik';
import {
  AntDatePicker,
  AntInput,
  AntInputPassword,
  AntSelect,
  AntTextArea,
} from '../shared/CreateAntFields';
import {
  validateBio,
  validateDate,
  validateEmail,
  validateGender,
  validatePassword,
  validateUsername,
} from '../../helpers/validateFields';
import { SignUpFormValues } from './SignUpForm';

export default ({
  handleSubmit,
  values,
  submitCount,
}: FormikProps<SignUpFormValues>) => (
  <Form className="signup-form-container" onSubmit={handleSubmit}>
    <Field
      component={AntInput}
      name="username"
      type="text"
      label="Username*"
      validate={validateUsername('signup')}
      submitCount={submitCount}
      // hasFeedback
    />
    <Field
      component={AntInput}
      name="email"
      type="email"
      label="Email*"
      validate={validateEmail}
      submitCount={submitCount}
      // hasFeedback
    />
    <Field
      component={AntInputPassword}
      name="password"
      type="password"
      label="Password*"
      validate={validatePassword}
      submitCount={submitCount}
      // hasFeedback
    />
    <Field
      component={AntDatePicker}
      name="birthday"
      label="Birthday"
      defaultValue={values.birthday}
      format="DD-MM-YYYY"
      validate={validateDate}
      submitCount={submitCount}
      // hasFeedback
    />
    <Field
      component={AntSelect}
      name="gender"
      label="Gender*"
      selectOptions={['male', 'female']}
      submitCount={submitCount}
      tokenSeparators={[',']}
      validate={validateGender}
      // hasFeedback
    />
    <Field
      component={AntTextArea}
      name="bio"
      type="text"
      label="Bio"
      rows={4}
      validate={validateBio}
      submitCount={submitCount}
      // hasFeedback
    />
    <div className="signup-submit-container">
      <button className="ant-btn ant-btn-primary" type="submit">
        Submit
      </button>
    </div>
  </Form>
);
