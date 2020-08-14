import { AppThunk } from './types';
import { Dispatch } from 'redux';
import API from '../../api';
import {
  clearPreviousPost,
  createPostFailed,
  createPostSuccess,
  deletePostFailed,
  deletePostSuccess,
  getAllPostsFailed,
  getAllPostsSuccess,
  getCurrentPostFailed,
  getCurrentPostSuccess,
  likePostFailed,
  likePostSuccess,
  unlikePostFailed,
  unlikePostSuccess,
  updatePostFailed,
  updatePostSuccess,
  updateUserFailed,
  updateUserSuccess,
} from '../actions';
import { UpdateUserStartData } from './users';

export interface PaginationData {
  skip?: number;
  limit?: number;
  sortBy?: string;
}

export interface UpdatePostStartData {
  id: string;
  title: string;
  text: string;
  image?: string;
  tags: string[];
}

export interface CreatePostStartData {
  title: string;
  text: string;
  image?: string;
  tags: string[];
}

export const getAllPostsStart: AppThunk = (pagination: PaginationData) => {
  return async (dispatch: Dispatch) => {
    try {
      const { total, posts } = await API.posts.getAllPosts(pagination);
      return dispatch(getAllPostsSuccess(total, posts, pagination));
    } catch (error) {
      return dispatch(getAllPostsFailed(error));
    }
  };
};

export const likePostStart: AppThunk = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const post = await API.posts.likePost(id);
      return dispatch(likePostSuccess(post));
    } catch (error) {
      return dispatch(likePostFailed(error));
    }
  };
};

export const unlikePostStart: AppThunk = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const post = await API.posts.unlikePost(id);
      return dispatch(unlikePostSuccess(post));
    } catch (error) {
      return dispatch(unlikePostFailed(error));
    }
  };
};

export const deletePostStart: AppThunk = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await API.posts.deletePost(id);
      return dispatch(deletePostSuccess(id));
    } catch (error) {
      return dispatch(deletePostFailed(error));
    }
  };
};

export const getCurrentPostStart: AppThunk = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(clearPreviousPost());
      const post = await API.posts.getCurrentPost(id);
      return dispatch(getCurrentPostSuccess(post));
    } catch (error) {
      return dispatch(getCurrentPostFailed(error));
    }
  };
};

export const updatePostStart: AppThunk = (values: UpdatePostStartData) => {
  return async (dispatch: Dispatch) => {
    try {
      const post = await API.posts.updatePost(values);
      return dispatch(updatePostSuccess(post));
    } catch (error) {
      return dispatch(updatePostFailed(error));
    }
  };
};

export const createPostStart: AppThunk = (values: CreatePostStartData) => {
  return async (dispatch: Dispatch) => {
    try {
      const post = await API.posts.createPost(values);
      return dispatch(createPostSuccess(post));
    } catch (error) {
      return dispatch(createPostFailed(error));
    }
  };
};
