import { Action, FIRST_ACTION_TYPE } from '../actions';

export interface PostsState {
  currentPost: object | null;
}

const initialState: PostsState = {
  currentPost: null,
};

const postsReducer = (state: PostsState = initialState, action: Action) => {
  switch (action.type) {
    case FIRST_ACTION_TYPE: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default postsReducer;
