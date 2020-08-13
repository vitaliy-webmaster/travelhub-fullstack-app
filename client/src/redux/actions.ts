import { User } from '../types';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

interface LogInSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LogInFailed {
  type: typeof LOGIN_FAILED;
  payload: Error;
}

interface LogOutSuccess {
  type: typeof LOGOUT_SUCCESS;
  payload: string;
}

interface LogOutFailed {
  type: typeof LOGOUT_FAILED;
  payload: Error;
}

export type Action = LogInSuccess | LogInFailed | LogOutSuccess | LogOutFailed;

export const logInSuccess = (payload: User): LogInSuccess => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const logInFailed = (payload: Error): LogInFailed => {
  return {
    type: LOGIN_FAILED,
    payload,
  };
};

export const logOutSuccess = (payload: string): LogOutSuccess => {
  return {
    type: LOGOUT_SUCCESS,
    payload,
  };
};

export const logOutFailed = (payload: Error): LogOutFailed => {
  return {
    type: LOGOUT_FAILED,
    payload,
  };
};
