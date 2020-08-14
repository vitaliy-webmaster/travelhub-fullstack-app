import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import './style.css';
import InnerForm from './InnerForm';
import { createPostStart } from '../../redux/thunks';

export interface NewPostFormValues {
  title?: string;
  text?: string;
  image?: string;
  tags?: string;
}

const PostForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values: NewPostFormValues) => {
    const { title, text, image, tags } = values;
    dispatch(
      createPostStart({
        title,
        text,
        image,
        tags: tags ? tags.trim().split(' ') : [],
      })
    );
  };

  const initialValues: NewPostFormValues = {
    title: undefined,
    text: undefined,
    image: undefined,
    tags: undefined,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {InnerForm}
    </Formik>
  );
};

export default PostForm;
