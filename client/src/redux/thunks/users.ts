import { Dispatch } from 'redux';

import { AppThunk } from './types';
import {
  logInFailed,
  logInSuccess,
  logOutFailed,
  logOutSuccess,
  refetchAuthFailed,
  refetchAuthSuccess,
  signUpFailed,
  signUpSuccess,
  updateUserFailed,
  updateUserSuccess,
} from '../actions';
import API from '../../api';
import openNotification, {
  NotificationType,
} from '../../helpers/openNotification';

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

export const logInStart: AppThunk<Promise<void>> = ({
  email,
  password,
}: LogInStartData) => {
  return async (dispatch: Dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await API.users.logIn(email, password);
        dispatch(logInSuccess(user));
        openNotification(
          NotificationType.SUCCESS,
          `Hello, ${user.username}`,
          `Happy to see you again`
        );
        return resolve();
      } catch (error) {
        dispatch(logInFailed(error));
        openNotification(
          NotificationType.ERROR,
          'Oh no, Failure',
          'Email or Password are invalid'
        );
        return reject();
      }
    });
  };
};

export const logOutStart: AppThunk = () => {
  return async (dispatch, getState) => {
    try {
      const {
        users: { authUser },
      } = getState();
      const message = await API.users.logOut();
      dispatch(logOutSuccess(message));
      return openNotification(
        NotificationType.SUCCESS,
        `Bye, ${authUser?.username}`,
        'Waiting to see you again'
      );
    } catch (error) {
      dispatch(logOutFailed(error));
      return openNotification(
        NotificationType.ERROR,
        'Oh no, Failure',
        'Got error, please try again later'
      );
    }
  };
};

export const signUpStart: AppThunk = (values: SignUpStartData) => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await API.users.signUp(values);
      dispatch(signUpSuccess(user));
      return openNotification(
        NotificationType.SUCCESS,
        `Congrats, ${user.username}`,
        'Signed Up successfully'
      );
    } catch (error) {
      dispatch(signUpFailed(error));
      return openNotification(
        NotificationType.ERROR,
        'Oh no, Failure',
        `${error.message}`
      );
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
      dispatch(updateUserSuccess(user));
      return openNotification(
        NotificationType.SUCCESS,
        `${user.username}, your profile is updated`,
        'Tell us more about yourself'
      );
    } catch (error) {
      dispatch(updateUserFailed(error));
      return openNotification(
        NotificationType.ERROR,
        'Update Failure',
        'Please check data and try again later'
      );
    }
  };
};
