import {
  Action,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  REFETCH_AUTH_FAILED,
  REFETCH_AUTH_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from '../actions';
import { User } from '../../types';

export interface UsersState {
  isRefetchAuthDone: boolean;
  authUser: User | null;
  authError: Error | null;
  users: User[];
}

const initialState: UsersState = {
  isRefetchAuthDone: false,
  authUser: null,
  authError: null,
  users: [],
};

const usersReducer = (state: UsersState = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        authError: action.payload,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        authUser: null,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        authError: action.payload,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case SIGNUP_FAILED: {
      return {
        ...state,
        authError: action.payload,
      };
    }
    case REFETCH_AUTH_SUCCESS: {
      return {
        ...state,
        authUser: action.payload,
        isRefetchAuthDone: true,
      };
    }
    case REFETCH_AUTH_FAILED: {
      return {
        ...state,
        authError: action.payload,
        isRefetchAuthDone: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        authError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default usersReducer;
