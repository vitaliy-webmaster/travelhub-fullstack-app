import React from 'react';

import { Form, Field, FormikProps } from 'formik';
import { AntInput, AntTextArea } from '../shared/CreateAntFields';

import {
  validatePostText,
  validatePostTitle,
} from '../../helpers/validateFields';
import { PostFormValues } from './PostForm';

export default ({
  handleSubmit,
  values,
  submitCount,
}: FormikProps<PostFormValues>) => (
  <Form className="post-form-container" onSubmit={handleSubmit}>
    <Field
      component={AntInput}
      name="title"
      type="text"
      label="Title*"
      validate={validatePostTitle}
      submitCount={submitCount}
      hasFeedback
    />

    <Field
      component={AntTextArea}
      name="text"
      type="text"
      label="Text*"
      rows={5}
      validate={validatePostText}
      submitCount={submitCount}
      hasFeedback
    />

    <Field
      component={AntInput}
      name="tags"
      type="text"
      label="Tags"
      submitCount={submitCount}
      hasFeedback
    />

    <div className="post-submit-container">
      <button className="ant-btn ant-btn-primary" type="submit">
        Submit
      </button>
    </div>
  </Form>
);
