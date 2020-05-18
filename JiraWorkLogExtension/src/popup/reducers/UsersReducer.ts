import { Users } from '../Models/User';
import { ActionType, LoadUsersAction } from '../actions/models';
import { Action } from 'redux';

export const usersReducer = (
  previousState: Users = {},
  action: Action<ActionType>
) => {
  switch (action.type) {
    case ActionType.LoadUsers:
      const loadUsersAction = action as LoadUsersAction;
      return { ...loadUsersAction.payload };
  }
  return previousState;
};
