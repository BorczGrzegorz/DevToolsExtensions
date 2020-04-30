import { ErrorAction, ActionType } from './../actions/models/index';
import { combineReducers } from "redux";
import { OptionsAppState } from './../models/OptionsAppState';
import { settingsReducer } from "./settingsReducer";
import { userReducer } from './userReducer';
import { notificationsReducer } from './notificationsReducer';

export const rootReducer = combineReducers<OptionsAppState>({
    settings: settingsReducer,
    userSummary: userReducer,
    notifications: notificationsReducer,
    error: (state: Error | null = null, action: ErrorAction)=> {
        if(action.type === ActionType.Error){
            return action.payload;
        }

        return state;
    }
})