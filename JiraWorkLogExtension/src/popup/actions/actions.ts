import { Dispatch } from "redux";
import { getUsersDateWorklog, getUsers, SprintState } from "../../api/devToolsApi";
import { UsersDateWorklogDto, UsersDto } from "../../api/devToolsDTO";
import { LoadUsersAction, ActionType, LoadUsersWorklogsAction, ErrorAction } from "./models";
import { Users, User } from "../Models/User";
import { UserDto } from './../../api/devToolsDTO';

export const errorHandler = (error: any) => async (dispatch: Dispatch) => {
    dispatch<ErrorAction>({
        type: ActionType.Error,
        payload: error
    })
}

export const loadData = () => async (dispatch: Dispatch) => {
    const worklogs: UsersDateWorklogDto = await getUsersDateWorklog({sprintState: SprintState.ACTIVE});
    const users: UsersDto = await getUsers(Object.keys(worklogs));

    dispatch<LoadUsersAction>({
        type: ActionType.LoadUsers,
        payload: mapUsers(users)
    });

    dispatch<LoadUsersWorklogsAction>({
        payload: worklogs,
        type: ActionType.LoadUsersWorklogs
    })
};

const mapUsers = (usersDto: UsersDto): Users => {
    let users: Users = {}
    Object.keys(usersDto).forEach((key: string) => {
        const user = mapUser(usersDto[key]);
        users[user.key] = user
    })
    return users;
}

const mapUser = (userDto: UserDto): User => {
    return {
        key: userDto.key,
        name: userDto.name,
        displayName: userDto.displayName,
        avatarSrc: userDto.avatarsUrls.url48x48
    }
}