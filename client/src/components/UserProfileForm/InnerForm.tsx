import React from 'react';
import moment from 'moment';

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
  validateUsername,
} from '../../helpers/validateFields';
import { UserProfileFormValues } from './UserProfileForm';

export default ({
  handleSubmit,
  values,
  submitCount,
}: FormikProps<UserProfileFormValues>) => (
  <Form className="user-profile-form-container" onSubmit={handleSubmit}>
    <Field
      component={AntInput}
      name="username"
      type="text"
      label="Username*"
      validate={validateUsername}
      submitCount={submitCount}
      disabled
    />
    <Field
      component={AntInput}
      name="email"
      type="email"
      label="Email*"
      validate={validateEmail}
      submitCount={submitCount}
      disabled
    />
    <Field
      component={AntDatePicker}
      name="birthday"
      label="Birthday"
      format="DD-MM-YYYY"
      validate={validateDate}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntSelect}
      name="gender"
      label="Gender"
      defaultValue={values.gender}
      selectOptions={['male', 'female']}
      submitCount={submitCount}
      tokenSeparators={[',']}
      hasFeedback
    />
    <Field
      component={AntTextArea}
      name="bio"
      type="text"
      label="Bio"
      rows={4}
      validate={validateBio}
      submitCount={submitCount}
      hasFeedback
    />
    <div className="user-profile-submit-container">
      <button className="ant-btn ant-btn-primary" type="submit">
        Submit
      </button>
    </div>
  </Form>
);