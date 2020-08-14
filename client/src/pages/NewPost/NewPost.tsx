import React, { useEffect } from 'react';

import './style.css';
import { authUserSelector } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import LoadSpinner from '../../components/LoadSpinner';
import NewPostForm from '../../components/NewPostForm';

interface RouteParams {
  postId: string;
}

const NewPost = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(authUserSelector);

  return (
    <div className="page-post">
      {authUser ? (
        <>
          <div className="page-new-post__header">Create new post</div>
          <div className="page-new-post__form">
            <NewPostForm />
          </div>
        </>
      ) : (
        <LoadSpinner />
      )}
    </div>
  );
};

export default NewPost;
