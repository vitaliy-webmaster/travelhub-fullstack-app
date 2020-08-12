import { Action, FIRST_ACTION_TYPE } from '../actions';

export interface UsersState {
  currentUser: object | null;
}

const initialState: UsersState = {
  currentUser: null,
};

const usersReducer = (state: UsersState = initialState, action: Action) => {
  switch (action.type) {
    case FIRST_ACTION_TYPE: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default usersReducer;
