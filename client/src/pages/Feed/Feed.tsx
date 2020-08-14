import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import FeedList from '../../components/FeedList';
import { getAllPostsStart } from '../../redux/thunks';
import { authUserSelector, postsSelector } from '../../redux/selectors';
import LoadSpinner from '../../components/LoadSpinner';

const FEED_PER_PAGE = 10;

const Feed = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(authUserSelector);
  const postsData = useSelector(postsSelector);
  const { posts, postsTotal, postsPagination } = postsData;

  useEffect(() => {
    dispatch(getAllPostsStart({ skip: 0, limit: FEED_PER_PAGE }));
  }, [dispatch]);

  const paginationChange = useCallback(
    (pageNum: number) => {
      dispatch(
        getAllPostsStart({
          skip: (pageNum - 1) * FEED_PER_PAGE,
          limit: FEED_PER_PAGE,
        })
      );
    },
    [dispatch]
  );

  return (
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
      ) : (
        <LoadSpinner />
      )}
    </div>
  );
};

export default Feed;
