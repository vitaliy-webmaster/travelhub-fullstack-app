import { Dispatch } from 'redux';

import { AppThunk } from './types';
import {
  logInSuccess,
  logInFailed,
  logOutSuccess,
  logOutFailed,
  signUpSuccess,
  signUpFailed,
  refetchAuthSuccess,
  refetchAuthFailed,
  updateUserSuccess,
  updateUserFailed,
} from '../actions';
import API from '../../api';

interface LogInStartData {
  email: string;
  password: string;
}

export interface SignUpStartData {
  username: string;
  email: string;
  password: string;
  birthday?: Date;
  gender?: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateUserStartData {
  id: string;
  birthday?: Date;
  gender?: string;
  bio?: string;
  avatar?: string;
}

export const logInStart: AppThunk = ({ email, password }: LogInStartData) => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await API.users.logIn(email, password);
      return dispatch(logInSuccess(user));
    } catch (error) {
      return dispatch(logInFailed(error));
    }
  };
};

export const logOutStart: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      const message = await API.users.logOut();
      return dispatch(logOutSuccess(message));
    } catch (error) {
      return dispatch(logOutFailed(error));
    }
  };
};

export const signUpStart: AppThunk = (values: SignUpStartData) => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await API.users.signUp(values);
      return dispatch(signUpSuccess(user));
    } catch (error) {
      return dispatch(signUpFailed(error));
    }
  };
};

export const refetchAuthStart: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await API.users.refetchAuth();
      return dispatch(refetchAuthSuccess(user));
    } catch (error) {
      return dispatch(refetchAuthFailed(error));
    }
  };
};

export const updateUserStart: AppThunk = (values: UpdateUserStartData) => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await API.users.updateUser(values);
      return dispatch(updateUserSuccess(user));
    } catch (error) {
      return dispatch(updateUserFailed(error));
    }
  };
};
