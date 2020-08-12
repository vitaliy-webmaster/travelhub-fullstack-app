export const FIRST_ACTION_TYPE = 'FIRST_ACTION_TYPE';
export const SECOND_ACTION_TYPE = 'SECOND_ACTION_TYPE';

interface FirstAction {
  type: typeof FIRST_ACTION_TYPE;
  payload: object;
}

interface SecondAction {
  type: typeof SECOND_ACTION_TYPE;
  payload: object;
}

export type Action = FirstAction | SecondAction;

export const firstActionCreator = (payload: object): FirstAction => {
  return {
    type: FIRST_ACTION_TYPE,
    payload,
  };
};
