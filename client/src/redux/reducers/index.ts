import { combineReducers } from 'redux';
import usersReducer, { UsersState } from './userReducer';
import postsReducer, { PostsState } from './postsReducer';

export interface AppState {
  users: UsersState;
  posts: PostsState;
}

export default combineReducers<AppState>({
  users: usersReducer,
  posts: postsReducer,
});
