import React, { useCallback, useEffect } from 'react';

import './style.css';
import UserProfileForm from '../../components/UserProfileForm';
import LoadSpinner from '../../components/LoadSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { authUserSelector, postsSelector } from '../../redux/selectors';
import { getUserPostsStart } from '../../redux/thunks';
import FeedList from '../../components/FeedList';

const FEED_PER_PAGE = 10;

const User = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(authUserSelector);
  const postsData = useSelector(postsSelector);
  const { posts, postsTotal, postsPagination } = postsData;

  useEffect(() => {
    if (authUser)
      dispatch(getUserPostsStart({ skip: 0, limit: FEED_PER_PAGE }));
  }, [dispatch, authUser]);

  const paginationChange = useCallback(
    (pageNum: number) => {
      dispatch(
        getUserPostsStart({
          skip: (pageNum - 1) * FEED_PER_PAGE,
          limit: FEED_PER_PAGE,
        })
      );
    },
    [dispatch]
  );

  return (
    <div className="page-user-feed">
      <div className="page-user">
        {authUser ? (
          <>
            <div className="page-user__header">Edit your profile now</div>
            <div className="page-user__form">
              <UserProfileForm authUser={authUser} />
            </div>
          </>
        ) : (
          <LoadSpinner />
        )}
      </div>
      <div className="page-feed">
        {posts && postsTotal != null ? (
          <FeedList
            posts={posts}
            postsTotal={postsTotal}
            pagination={postsPagination}
            authUser={authUser}
            perPage={FEED_PER_PAGE}
            paginationChange={paginationChange}
          />
        ) : null}
      </div>
    </div>
  );
};

export default User;
