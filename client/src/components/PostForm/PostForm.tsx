import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import './style.css';
import { User, Post } from '../../types';
import InnerForm from './InnerForm';
import { updatePostStart } from '../../redux/thunks';

export interface PostFormValues {
  title: string;
  text: string;
  image?: string;
  tags: string;
}

interface Props {
  currentPost: Post;
}

const PostForm = ({ currentPost }: Props) => {
  const dispatch = useDispatch();
  const { _id: postId, title, text, image, tags } = currentPost;

  const handleSubmit = (values: PostFormValues) => {
    const { title, text, image, tags } = values;
    dispatch(
      updatePostStart({
        id: postId,
        title,
        text,
        image,
        tags: tags ? tags.trim().split(' ') : [],
      })
    );
  };

  const initialValues: PostFormValues = {
    title,
    text,
    image,
    tags: tags.join(' '),
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {InnerForm}
    </Formik>
  );
};

export default PostForm;
