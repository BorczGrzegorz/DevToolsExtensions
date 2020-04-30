import { ActionType, ChangeSettingsAction } from "../actions/models";
import { Action } from "redux";
import { Settings, DefaultSettings } from "../../models/Settings";

export const settingsReducer = (previousState: Settings = DefaultSettings, action: Action<ActionType>) => {
    switch (action.type) {
        case ActionType.ChangeSettings:
            let changeSettingsAction = action as ChangeSettingsAction;
            return { ...changeSettingsAction.payload };
    }

    return previousState;
}