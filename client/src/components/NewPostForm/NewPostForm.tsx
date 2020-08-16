import React, { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import './style.css';
import InnerForm from './InnerForm';
import { createPostStart } from '../../redux/thunks';
import { AppState } from '../../redux/reducers';
import UploadPostImage from '../UploadPostImage';

export interface NewPostFormValues {
  title: string;
  text: string;
  tags?: string;
}

const PostForm = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const history = useHistory();

  const handleSubmit = (values: NewPostFormValues) => {
    const { title, text, tags } = values;
    dispatch(
      createPostStart({
        title,
        text,
        image: imageUrl,
        tags: tags ? tags.trim().split(' ') : [],
      })
    )
      .then(() => history.push('/feed'))
      .catch();
  };

  const initialValues: Partial<NewPostFormValues> = {
    title: undefined,
    text: undefined,
    tags: undefined,
  };

  return (
    <div className="new-post-form-wrapper">
      <UploadPostImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <Formik
        initialValues={initialValues as NewPostFormValues}
        onSubmit={handleSubmit}
      >
        {InnerForm}
      </Formik>
    </div>
  );
};

export default PostForm;
