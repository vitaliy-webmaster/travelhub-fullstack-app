import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Pagination } from 'antd';

import './style.css';
import { Post, User } from '../../types';
import {
  deletePostStart,
  likePostStart,
  PaginationData,
  unlikePostStart,
} from '../../redux/thunks';
import PostCard from '../PostCard';
import { type } from 'os';

interface Props {
  posts: Post[];
  postsTotal: number;
  pagination: PaginationData | null;
  authUser: User | null;
  perPage: number;
  paginationChange: (pageNum: number) => void;
}

const FeedList = ({
  posts,
  postsTotal,
  pagination,
  authUser,
  perPage,
  paginationChange,
}: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const likePost = useCallback(
    (id: string) => {
      authUser ? dispatch(likePostStart(id)) : history.push('/login');
    },
    [dispatch, authUser]
  );

  const unlikePost = useCallback(
    (id: string) => {
      authUser ? dispatch(unlikePostStart(id)) : history.push('/login');
    },
    [dispatch, authUser]
  );

  const deletePost = useCallback(
    (id: string) => {
      dispatch(deletePostStart(id));
    },
    [dispatch]
  );

  return (
    <div className="feed-container">
      <Pagination
        defaultCurrent={1}
        defaultPageSize={perPage}
        onChange={paginationChange}
        total={postsTotal}
      />
      <div className="pagination-note">( 10 per page )</div>
      <div className="feed-list">
        {posts.map((post) => {
          const isLikedByMe =
            authUser &&
            post.likedBy.findIndex((item) => item._id === authUser._id) > -1;
          const isMyPost = authUser && post.author._id === authUser._id;
          return (
            <PostCard
              key={post._id}
              post={post}
              likePost={likePost}
              unlikePost={unlikePost}
              deletePost={deletePost}
              isLikedByMe={isLikedByMe}
              isMyPost={isMyPost}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FeedList;
