import { Action } from "redux";
import { ActionType, ErrorAction } from "../actions/models";

export const errorReducer = (previousState: Error | null = null, action: Action<ActionType>) => {
    switch (action.type) {
        case ActionType.Error:
            const errorAction = action as ErrorAction;
            return errorAction.payload;
    }
    return previousState;
}