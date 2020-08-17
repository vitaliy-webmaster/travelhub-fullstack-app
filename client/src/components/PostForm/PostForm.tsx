import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useHistory } from 'react-router';

import './style.css';
import { Post } from '../../types';
import InnerForm from './InnerForm';
import { updatePostStart } from '../../redux/thunks';
import { AppState } from '../../redux/reducers';
import UploadImage from '../UploadImage';

export interface PostFormValues {
  title: string;
  text: string;
  tags: string;
}

interface Props {
  currentPost: Post;
}

const PostForm = ({ currentPost }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const history = useHistory();

  const { _id: postId, title, text, tags } = currentPost;

  useEffect(() => {
    if (currentPost?.image) setImageUrl(currentPost.image);
  }, [currentPost, setImageUrl]);

  const handleSubmit = (values: PostFormValues) => {
    const { title, text, tags } = values;
    dispatch(
      updatePostStart({
        id: postId,
        title,
        text,
        image: imageUrl,
        tags: tags ? tags.trim().split(' ') : [],
      })
    )
      .then(() => history.push('/feed'))
      .catch();
  };

  const initialValues: PostFormValues = {
    title,
    text,
    tags: tags.join(' '),
  };

  return (
    <div className="update-post-form-wrapper">
      <UploadImage type="post" imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {InnerForm}
      </Formik>
    </div>
  );
};

export default PostForm;
