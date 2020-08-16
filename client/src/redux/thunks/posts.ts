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
  getUserPostsFailed,
  getUserPostsSuccess,
  likePostFailed,
  likePostSuccess,
  unlikePostFailed,
  unlikePostSuccess,
  updatePostFailed,
  updatePostSuccess,
} from '../actions';
import openNotification, {
  NotificationType,
} from '../../helpers/openNotification';

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

export const getUserPostsStart: AppThunk = (pagination: PaginationData) => {
  return async (dispatch: Dispatch) => {
    try {
      const { total, posts } = await API.posts.getUserPosts(pagination);
      return dispatch(getUserPostsSuccess(total, posts, pagination));
    } catch (error) {
      return dispatch(getUserPostsFailed(error));
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

export const updatePostStart: AppThunk<Promise<void>> = (
  values: UpdatePostStartData
) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          users: { authUser },
        } = getState();
        const post = await API.posts.updatePost(values);
        dispatch(updatePostSuccess(post));
        openNotification(
          NotificationType.SUCCESS,
          `${authUser?.username}, congratulations!`,
          'Your post is successfully updated'
        );
        return resolve();
      } catch (error) {
        dispatch(updatePostFailed(error));
        openNotification(
          NotificationType.ERROR,
          'Post Update Failure',
          `${error.message}`
        );
        return reject();
      }
    });
  };
};

export const createPostStart: AppThunk<Promise<void>> = (
  values: CreatePostStartData
) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          users: { authUser },
        } = getState();
        const post = await API.posts.createPost(values);
        dispatch(createPostSuccess(post));
        openNotification(
          NotificationType.SUCCESS,
          `${authUser?.username}, congratulations!`,
          'Your post is successfully created'
        );
        return resolve();
      } catch (error) {
        dispatch(createPostFailed(error));
        openNotification(
          NotificationType.ERROR,
          'Oh no, Failure',
          `${error.message}`
        );
        return reject();
      }
    });
  };
};
