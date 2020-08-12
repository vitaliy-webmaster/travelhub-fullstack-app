import { Action, Dispatch } from 'redux';
import { AppThunk } from './types';
import { firstActionCreator } from '../actions';

export const firstAsyncAction: AppThunk = () => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch(firstActionCreator({}));
    } catch (e) {
      return dispatch(firstActionCreator({}));
    }
  };
};
