import { Post, User } from '../types';
import { PaginationData } from './thunks';

export const SET_SOCKET_CONNECT = 'SET_SOCKET_CONNECT';
export const WS_CREATE_POST = 'WS_CREATE_POST';
export const WS_UPDATE_POST = 'WS_UPDATE_POST';
export const WS_DELETE_POST = 'WS_DELETE_POST';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const REFETCH_AUTH_SUCCESS = 'REFETCH_AUTH_SUCCESS';
export const REFETCH_AUTH_FAILED = 'REFETCH_AUTH_FAILED';
export const GET_ALL_POSTS_SUCCESS = 'GET_ALL_POSTS_SUCCESS';
export const GET_ALL_POSTS_FAILED = 'GET_ALL_POSTS_FAILED';
export const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS';
export const GET_USER_POSTS_FAILED = 'GET_USER_POSTS_FAILED';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILED = 'LIKE_POST_FAILED';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILED = 'UNLIKE_POST_FAILED';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const GET_CURRENT_POST_SUCCESS = 'GET_CURRENT_POST_SUCCESS';
export const GET_CURRENT_POST_FAILED = 'GET_CURRENT_POST_FAILED';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILED = 'UPDATE_POST_FAILED';
export const CLEAR_PREVIOUS_POST = 'CLEAR_PREVIOUS_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILED = 'CREATE_POST_FAILED';

interface SetSocketConnect {
  type: typeof SET_SOCKET_CONNECT;
  payload: any;
}

interface WsCreatePost {
  type: typeof WS_CREATE_POST;
  payload: Post;
}

interface WsUpdatePost {
  type: typeof WS_UPDATE_POST;
  payload: Post;
}

interface WsDeletePost {
  type: typeof WS_DELETE_POST;
  payload: string;
}

interface LogInSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LogInFailed {
  type: typeof LOGIN_FAILED;
  payload: Error;
}

interface LogOutSuccess {
  type: typeof LOGOUT_SUCCESS;
  payload: string;
}

interface LogOutFailed {
  type: typeof LOGOUT_FAILED;
  payload: Error;
}

interface SignUpSuccess {
  type: typeof SIGNUP_SUCCESS;
  payload: User;
}

interface SignUpFailed {
  type: typeof SIGNUP_FAILED;
  payload: Error;
}

interface RefetchAuthSuccess {
  type: typeof REFETCH_AUTH_SUCCESS;
  payload: User;
}

interface RefetchAuthFailed {
  type: typeof REFETCH_AUTH_FAILED;
  payload: Error;
}

interface GetAllPostsSuccess {
  type: typeof GET_ALL_POSTS_SUCCESS;
  payload: { total: number; posts: Post[]; pagination: PaginationData };
}

interface GetAllPostsFailed {
  type: typeof GET_ALL_POSTS_FAILED;
  payload: Error;
}

interface GetUserPostsSuccess {
  type: typeof GET_USER_POSTS_SUCCESS;
  payload: { total: number; posts: Post[]; pagination: PaginationData };
}

interface GetUserPostsFailed {
  type: typeof GET_USER_POSTS_FAILED;
  payload: Error;
}

interface LikePostSuccess {
  type: typeof LIKE_POST_SUCCESS;
  payload: Post;
}

interface LikePostFailed {
  type: typeof LIKE_POST_FAILED;
  payload: Error;
}

interface UnlikePostSuccess {
  type: typeof UNLIKE_POST_SUCCESS;
  payload: Post;
}

interface UnlikePostFailed {
  type: typeof UNLIKE_POST_FAILED;
  payload: Error;
}

interface DeletePostSuccess {
  type: typeof DELETE_POST_SUCCESS;
  payload: string;
}

interface DeletePostFailed {
  type: typeof DELETE_POST_FAILED;
  payload: Error;
}

interface UpdateUserSuccess {
  type: typeof UPDATE_USER_SUCCESS;
  payload: User;
}

interface UpdateUserFailed {
  type: typeof UPDATE_USER_FAILED;
  payload: Error;
}

interface GetCurrentPostSuccess {
  type: typeof GET_CURRENT_POST_SUCCESS;
  payload: Post;
}

interface GetCurrentPostFailed {
  type: typeof GET_CURRENT_POST_FAILED;
  payload: Error;
}

interface UpdatePostSuccess {
  type: typeof UPDATE_POST_SUCCESS;
  payload: Post;
}

interface UpdatePostFailed {
  type: typeof UPDATE_POST_FAILED;
  payload: Error;
}

interface ClearPreviousPost {
  type: typeof CLEAR_PREVIOUS_POST;
}

interface CreatePostSuccess {
  type: typeof CREATE_POST_SUCCESS;
  payload: Post;
}

interface CreatePostFailed {
  type: typeof CREATE_POST_FAILED;
  payload: Error;
}

export type Action =
  | SetSocketConnect
  | WsCreatePost
  | WsUpdatePost
  | WsDeletePost
  | LogInSuccess
  | LogInFailed
  | LogOutSuccess
  | LogOutFailed
  | SignUpSuccess
  | SignUpFailed
  | RefetchAuthSuccess
  | RefetchAuthFailed
  | GetAllPostsSuccess
  | GetAllPostsFailed
  | GetUserPostsSuccess
  | GetUserPostsFailed
  | LikePostSuccess
  | LikePostFailed
  | UnlikePostSuccess
  | UnlikePostFailed
  | DeletePostSuccess
  | DeletePostFailed
  | UpdateUserSuccess
  | UpdateUserFailed
  | GetCurrentPostSuccess
  | GetCurrentPostFailed
  | UpdatePostSuccess
  | UpdatePostFailed
  | ClearPreviousPost
  | CreatePostSuccess
  | CreatePostFailed;

export const setSocketConnect = (payload: any): SetSocketConnect => {
  return {
    type: SET_SOCKET_CONNECT,
    payload,
  };
};

export const wsCreatePost = (payload: Post): WsCreatePost => {
  return {
    type: WS_CREATE_POST,
    payload,
  };
};

export const wsUpdatePost = (payload: Post): WsUpdatePost => {
  return {
    type: WS_UPDATE_POST,
    payload,
  };
};

export const wsDeletePost = (payload: string): WsDeletePost => {
  return {
    type: WS_DELETE_POST,
    payload,
  };
};

export const logInSuccess = (payload: User): LogInSuccess => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const logInFailed = (payload: Error): LogInFailed => {
  return {
    type: LOGIN_FAILED,
    payload,
  };
};

export const logOutSuccess = (payload: string): LogOutSuccess => {
  return {
    type: LOGOUT_SUCCESS,
    payload,
  };
};

export const logOutFailed = (payload: Error): LogOutFailed => {
  return {
    type: LOGOUT_FAILED,
    payload,
  };
};

export const signUpSuccess = (payload: User): SignUpSuccess => {
  return {
    type: SIGNUP_SUCCESS,
    payload,
  };
};

export const signUpFailed = (payload: Error): SignUpFailed => {
  return {
    type: SIGNUP_FAILED,
    payload,
  };
};

export const refetchAuthSuccess = (payload: User): RefetchAuthSuccess => {
  return {
    type: REFETCH_AUTH_SUCCESS,
    payload,
  };
};

export const refetchAuthFailed = (payload: Error): RefetchAuthFailed => {
  return {
    type: REFETCH_AUTH_FAILED,
    payload,
  };
};

export const getAllPostsSuccess = (
  total: number,
  posts: Post[],
  pagination: PaginationData
): GetAllPostsSuccess => {
  return {
    type: GET_ALL_POSTS_SUCCESS,
    payload: { total, posts, pagination },
  };
};

export const getAllPostsFailed = (payload: Error): GetAllPostsFailed => {
  return {
    type: GET_ALL_POSTS_FAILED,
    payload,
  };
};

export const getUserPostsSuccess = (
  total: number,
  posts: Post[],
  pagination: PaginationData
): GetUserPostsSuccess => {
  return {
    type: GET_USER_POSTS_SUCCESS,
    payload: { total, posts, pagination },
  };
};

export const getUserPostsFailed = (payload: Error): GetUserPostsFailed => {
  return {
    type: GET_USER_POSTS_FAILED,
    payload,
  };
};

export const likePostSuccess = (payload: Post): LikePostSuccess => {
  return {
    type: LIKE_POST_SUCCESS,
    payload,
  };
};

export const likePostFailed = (payload: Error): LikePostFailed => {
  return {
    type: LIKE_POST_FAILED,
    payload,
  };
};

export const unlikePostSuccess = (payload: Post): UnlikePostSuccess => {
  return {
    type: UNLIKE_POST_SUCCESS,
    payload,
  };
};

export const unlikePostFailed = (payload: Error): UnlikePostFailed => {
  return {
    type: UNLIKE_POST_FAILED,
    payload,
  };
};

export const deletePostSuccess = (id: string): DeletePostSuccess => {
  return {
    type: DELETE_POST_SUCCESS,
    payload: id,
  };
};

export const deletePostFailed = (payload: Error): DeletePostFailed => {
  return {
    type: DELETE_POST_FAILED,
    payload,
  };
};

export const updateUserSuccess = (payload: User): UpdateUserSuccess => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload,
  };
};

export const updateUserFailed = (payload: Error): UpdateUserFailed => {
  return {
    type: UPDATE_USER_FAILED,
    payload,
  };
};

export const getCurrentPostSuccess = (payload: Post): GetCurrentPostSuccess => {
  return {
    type: GET_CURRENT_POST_SUCCESS,
    payload,
  };
};

export const getCurrentPostFailed = (payload: Error): GetCurrentPostFailed => {
  return {
    type: GET_CURRENT_POST_FAILED,
    payload,
  };
};

export const updatePostSuccess = (payload: Post): UpdatePostSuccess => {
  return {
    type: UPDATE_POST_SUCCESS,
    payload,
  };
};

export const updatePostFailed = (payload: Error): UpdatePostFailed => {
  return {
    type: UPDATE_POST_FAILED,
    payload,
  };
};

export const clearPreviousPost = (): ClearPreviousPost => {
  return {
    type: CLEAR_PREVIOUS_POST,
  };
};

export const createPostSuccess = (payload: Post): CreatePostSuccess => {
  return {
    type: CREATE_POST_SUCCESS,
    payload,
  };
};

export const createPostFailed = (payload: Error): CreatePostFailed => {
  return {
    type: CREATE_POST_FAILED,
    payload,
  };
};
