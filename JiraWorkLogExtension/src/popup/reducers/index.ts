import { combineReducers } from "redux";
import { PopupAppState } from "../Models/AppState";
import { usersReducer } from "./UsersReducer";
import { usersWorklogReducer } from "./usersWorklogsReducer";
import { errorReducer } from "./errorsReducer";

export const rootReducer = combineReducers<PopupAppState>({
    users: usersReducer,
    usersWorklogs: usersWorklogReducer,
    errorMessage: errorReducer
})