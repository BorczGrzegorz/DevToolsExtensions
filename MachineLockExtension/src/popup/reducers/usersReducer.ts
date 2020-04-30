import { UsersDictionary } from "../models/AppState";
import { ActionType, LoadUsersAction } from "../actions/models";
import { Action } from "redux";
import { User } from './../models/AppState';
import { LoadCurrentUserAction } from './../actions/models/index';
import { UserDto } from "../../api/devToolsModels";


export const userReducer = (previousState: UsersDictionary = {}, action: Action<ActionType>) => {

    if (action.type === ActionType.LOAD_USERS) {
        return reduceLoadUsers(previousState, action as LoadUsersAction)
    }
    if (action.type === ActionType.LOAD_CURRENT_USER) {
        const loadAction: LoadCurrentUserAction = action as LoadCurrentUserAction;
        return { ...previousState, [loadAction.payload.key]: mapUserDtoToUser(loadAction.payload) }
    }

    return previousState;
}

export const currentUserReducer = (previousState: User | null = null, action: Action<ActionType>) => {

    if (action.type === ActionType.LOAD_CURRENT_USER) {
        const loadAction: LoadCurrentUserAction = action as LoadCurrentUserAction;
        return mapUserDtoToUser(loadAction.payload);
    }

    return previousState;
}

const reduceLoadUsers = (previousState: UsersDictionary, action: LoadUsersAction): UsersDictionary => {
    const additionalUsers: UsersDictionary = {};
    Object.keys(action.payload).forEach((key: string) => additionalUsers[action.payload[key].key] = mapUserDtoToUser(action.payload[key]));
    return { ...previousState, ...additionalUsers }
}

const mapUserDtoToUser = (userDto: UserDto): User => {
    return {
        displayName: userDto.displayName,
        key: userDto.key,
        avatar: userDto.avatarsUrls.url48x48
    }
} 