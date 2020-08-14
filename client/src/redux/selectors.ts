import { AppState } from './reducers';

export const authUserSelector = (state: AppState) => state.users.authUser;
export const isRefetchAuthDoneSelector = (state: AppState) =>
  state.users.isRefetchAuthDone;
export const postsSelector = (state: AppState) => state.posts;
