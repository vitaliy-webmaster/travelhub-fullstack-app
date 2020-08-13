import { Action } from '../actions';

export interface PostsState {
  currentPost: object | null;
}

const initialState: PostsState = {
  currentPost: null,
};

const postsReducer = (state: PostsState = initialState, action: Action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default postsReducer;
