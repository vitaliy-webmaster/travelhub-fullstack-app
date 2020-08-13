import {
  Action,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
} from '../actions';
import { User } from '../../types';

const testAuthUser = {
  _id: 'kdjsi8dsjkdjs90aks',
  username: 'Vitaliy',
  email: 'vvchernyshenko@gmail.com',
  birthday: new Date('1989-01-01'),
  gender: 'male',
  bio: 'Good performant professional without flaws',
  avatar:
    'https://media-exp1.licdn.com/dms/image/C5603AQFamwKRc6_6Ew/profile-displayphoto-shrink_100_100/0?e=1602720000&v=beta&t=HGC4-VELQIESfYQste-oJhyqzbQiBhUs1GL7Fg-VUaw',
  createdAt: new Date('2020-06-11'),
  updatedAt: new Date('2020-06-18'),
};

export interface UsersState {
  authUser: User | null;
  authError: Error | null;
  users: User[];
}

const initialState: UsersState = {
  authUser: null,
  authError: null,
  // authUser: testAuthUser,
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

    default: {
      return state;
    }
  }
};

export default usersReducer;
