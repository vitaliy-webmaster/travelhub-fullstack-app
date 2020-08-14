import {
  Action,
  CLEAR_PREVIOUS_POST,
  CREATE_POST_FAILED,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILED,
  DELETE_POST_SUCCESS,
  GET_ALL_POSTS_FAILED,
  GET_ALL_POSTS_SUCCESS,
  GET_CURRENT_POST_FAILED,
  GET_CURRENT_POST_SUCCESS,
  GET_USER_POSTS_FAILED,
  GET_USER_POSTS_SUCCESS,
  LIKE_POST_FAILED,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_FAILED,
  UNLIKE_POST_SUCCESS,
  UPDATE_POST_FAILED,
  UPDATE_POST_SUCCESS,
} from '../actions';
import { Post } from '../../types';
import { PaginationData } from '../thunks';

export interface PostsState {
  currentPost: Post | null;
  posts: Post[] | null;
  postsTotal: number | null;
  postsPagination: PaginationData | null;
  // userPosts: Post[] | null;
  // userPostsTotal: number | null;
  // userPostsPagination: PaginationData | null;
  postsError: Error | null;
}

const initialState: PostsState = {
  currentPost: null,
  posts: null,
  postsTotal: null,
  postsPagination: null,
  // userPosts: null,
  // userPostsTotal: null,
  // userPostsPagination: null,
  postsError: null,
};

const postsReducer = (state: PostsState = initialState, action: Action) => {
  switch (action.type) {
    case GET_ALL_POSTS_SUCCESS: {
      const { posts, total, pagination } = action.payload;
      return {
        ...state,
        posts,
        postsTotal: total,
        postsPagination: pagination,
      };
    }
    case GET_ALL_POSTS_FAILED: {
      return {
        ...state,
        postsError: action.payload,
      };
    }
    case GET_USER_POSTS_SUCCESS: {
      const { posts, total, pagination } = action.payload;
      return {
        ...state,
        posts,
        postsTotal: total,
        postsPagination: pagination,
      };
    }
    case GET_USER_POSTS_FAILED: {
      return {
        ...state,
        postsError: action.payload,
      };
    }
    case LIKE_POST_SUCCESS: {
      const index = state.posts!.findIndex(
        (item) => item._id === action.payload._id
      );
      const newPosts = [
        ...state.posts!.slice(0, index),
        action.payload,
        ...state.posts!.slice(index + 1),
      ];
      return {
        ...state,
        posts: newPosts,
      };
    }
    case LIKE_POST_FAILED: {
      return {
        ...state,
        postsError: action.payload,
      };
    }
    case UNLIKE_POST_SUCCESS: {
      const index = state.posts!.findIndex(
        (item) => item._id === action.payload._id
      );
      const newPosts = [
        ...state.posts!.slice(0, index),
        action.payload,
        ...state.posts!.slice(index + 1),
      ];
      return {
        ...state,
        posts: newPosts,
      };
    }
    case UNLIKE_POST_FAILED: {
      return {
        ...state,
        postsError: action.payload,
      };
    }
    case DELETE_POST_SUCCESS: {
      const index = state.posts!.findIndex(
        (item) => item._id === action.payload
      );
      const newPosts = [
        ...state.posts!.slice(0, index),
        ...state.posts!.slice(index + 1),
      ];
      return {
        ...state,
        posts: newPosts,
      };
    }
    case DELETE_POST_FAILED: {
      return {
        ...state,
        postsError: action.payload,
      };
    }
    case GET_CURRENT_POST_SUCCESS: {
      return {
        ...state,
        currentPost: action.payload,
      };
    }
    case GET_CURRENT_POST_FAILED: {
      return {
        ...state,
        postsError: action.payload,
      };
    }
    case UPDATE_POST_SUCCESS: {
      return {
        ...state,
        currentPost: action.payload,
      };
    }
    case UPDATE_POST_FAILED: {
      return {
        ...state,
        postsError: action.payload,
      };
    }
    case CLEAR_PREVIOUS_POST: {
      return {
        ...state,
        currentPost: null,
      };
    }
    case CREATE_POST_SUCCESS: {
      return {
        ...state,
      };
    }
    case CREATE_POST_FAILED: {
      return {
        ...state,
        postsError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default postsReducer;
