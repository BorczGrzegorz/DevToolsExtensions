import { UserSummary } from "../models/UserSummary";
import { Action } from "redux";
import { ActionType, LoadUserSummaryAction } from "../actions/models";

export const userReducer = (previousState: UserSummary | null = null, action: Action<ActionType>) => {
    switch (action.type) {
        case ActionType.LoadUserSummary:
            let loadSummaryAction = action as LoadUserSummaryAction;
            return { ...loadSummaryAction.payload };
    }

    return previousState;
}