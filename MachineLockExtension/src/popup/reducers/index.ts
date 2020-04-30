import { combineReducers } from "redux";
import { AppState } from "../models/AppState";
import { selectedProjectReducer } from "./selectedProjectReducer";
import { machineReducer } from "./machinesReducer";
import { userReducer, currentUserReducer } from "./usersReducer";
import { productsReducer } from "./productsDictionary";
import { ErrorAction, ActionType } from "../actions/models";

export const rootReducer = combineReducers<AppState>({
    lastSelectedProject: selectedProjectReducer,
    machines: machineReducer,
    users: userReducer,
    currentUser: currentUserReducer,
    products: productsReducer,
    error: (state: Error | null = null, action: ErrorAction)=> {
        if(action.type === ActionType.Error){
            return action.payload;
        }

        return state;
    }
})