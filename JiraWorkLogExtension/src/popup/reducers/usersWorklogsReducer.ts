import { UsersDateWorklog } from "../Models/UsersDateWorklog";
import { Action } from "redux";
import { ActionType } from "../actions/models";
import { LoadUsersWorklogsAction } from './../actions/models/index';

export const usersWorklogReducer = (previousState: UsersDateWorklog = {}, action: Action<ActionType>) => {
    switch (action.type) {
        case ActionType.LoadUsersWorklogs:
            const loadUsersAction = action as LoadUsersWorklogsAction;
            
            return { ...loadUsersAction.payload }
    }
    return previousState;
}