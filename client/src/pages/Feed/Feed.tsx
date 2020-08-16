import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { Input } from 'antd';

import './style.css';
import FeedList from '../../components/FeedList';
import { getAllPostsStart, getTagPostsStart } from '../../redux/thunks';
import { authUserSelector, postsSelector } from '../../redux/selectors';
import LoadSpinner from '../../components/LoadSpinner';
const { Search } = Input;

const FEED_PER_PAGE = 10;

const Feed = () => {
  const dispatch = useDispatch();
  const searchRef = useRef<string>('');
  const authUser = useSelector(authUserSelector);
  const postsData = useSelector(postsSelector);
  const { posts, postsTotal, postsPagination } = postsData;

  useEffect(() => {
    dispatch(getAllPostsStart({ skip: 0, limit: FEED_PER_PAGE }));
  }, [dispatch]);

  const pageChange = (pageNum: number) => {
    if (searchRef.current.length > 0) {
      searchPaginationChange(pageNum);
    } else {
      paginationChange(pageNum);
    }
  };

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

  const searchPaginationChange = useCallback(
    (pageNum: number) => {
      dispatch(
        getTagPostsStart(
          {
            skip: (pageNum - 1) * FEED_PER_PAGE,
            limit: FEED_PER_PAGE,
          },
          searchRef.current
        )
      );
    },
    [dispatch]
  );

  const searchChange = debounce(() => {
    searchPaginationChange(1);
  }, 2000);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      searchRef.current = e.target.value;
      if (e.target.value.length > 0) {
        searchChange();
      } else {
        paginationChange(1);
      }
    },
    [searchChange, paginationChange]
  );

  return (
    <div className="page-feed">
      <div className="feed-list-wrapper">
        <div className="feed-tag-container">
          <Search
            className="feed-tag-search"
            placeholder="hashtag search"
            size="middle"
            onChange={handleInputChange}
          />
        </div>
        <div className="hashtag-search-note">
          (enter tags values divided by spaces)
        </div>
        {posts && postsTotal != null ? (
          <FeedList
            posts={posts}
            postsTotal={postsTotal}
            pagination={postsPagination}
            authUser={authUser}
            perPage={FEED_PER_PAGE}
            paginationChange={pageChange}
          />
        ) : (
          <LoadSpinner />
        )}
      </div>
    </div>
  );
};

export default Feed;
