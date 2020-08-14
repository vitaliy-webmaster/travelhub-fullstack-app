import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import './style.css';
import { authUserSelector, postsSelector } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import LoadSpinner from '../../components/LoadSpinner';
import PostForm from '../../components/PostForm';
import { getCurrentPostStart } from '../../redux/thunks';

interface RouteParams {
  postId: string;
}

const Post = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(authUserSelector);
  const { currentPost } = useSelector(postsSelector);
  const { postId } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(getCurrentPostStart(postId));
  }, [dispatch]);

  return (
    <div className="page-post">
      {authUser && currentPost && authUser._id === currentPost.author._id ? (
        <>
          <div className="page-post__header">Edit your post</div>
          <div className="page-post__form">
            <PostForm currentPost={currentPost} />
          </div>
        </>
      ) : (
        <LoadSpinner />
      )}
    </div>
  );
};

export default Post;
