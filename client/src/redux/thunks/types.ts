import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';

export type AppThunk = ActionCreator<
  ThunkAction<void, AppState, null, Action<string>>
>;
