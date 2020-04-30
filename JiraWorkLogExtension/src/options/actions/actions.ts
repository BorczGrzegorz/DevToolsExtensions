import { Dispatch } from "redux";
import { getEngine } from './../../engine/index';
import { ChangeSettingsAction, ActionType, ErrorAction } from "./models";
import { getUserName, getUsersDateWorklog } from "../../api/devToolsApi";
import { LoadUserSummaryAction } from './models/index';
import { Settings } from "../../models/Settings";
import { SETTINGS_KEY } from "../../models/Consts";

export const errorHandler = (error: any) => async (dispatch: Dispatch) => {
    dispatch<ErrorAction>({
        type: ActionType.Error,
        payload: error
    })
}

export const changeSettings = (settings: Settings) => async (dispatch: Dispatch) => {
    getEngine().saveInStore(SETTINGS_KEY, settings);
    dispatch<ChangeSettingsAction>({
        type: ActionType.ChangeSettings,
        payload: settings
    });
}

export const loadSummary = () => async (dispatch: Dispatch) => {
    const currentUserName : string = await getUserName();
    const users = await getUsersDateWorklog({userName: [currentUserName]});
    dispatch<LoadUserSummaryAction>({
        type: ActionType.LoadUserSummary,
        payload: users[Object.keys(users)[0]]
    });
}