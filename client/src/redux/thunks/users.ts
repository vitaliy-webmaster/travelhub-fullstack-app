import { Action, Dispatch } from 'redux';

import { AppThunk } from './types';
import {
  logInSuccess,
  logInFailed,
  logOutSuccess,
  logOutFailed,
} from '../actions';
import API from '../../api';

interface LogInStartData {
  email: string;
  password: string;
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
