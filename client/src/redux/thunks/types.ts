import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, AppState, null, Action<string>>
>;
