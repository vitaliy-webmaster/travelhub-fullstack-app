import { AppState } from './reducers';

export const authUserSelector = (state: AppState) => state.users.authUser;
