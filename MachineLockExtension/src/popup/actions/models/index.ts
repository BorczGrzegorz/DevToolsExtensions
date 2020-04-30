import { Action } from "redux";
import { UserDto, ProductDto, MachineStateDto, UsersDto } from "../../../api/devToolsModels";

export enum ActionType {
    Error,
    LOAD_CURRENT_USER,
    LOAD_PRODUCTS,
    LOAD_MACHINE_STATES,
    LOAD_USERS,
    CHANGE_MACHINE_STATE,
    RELEASE_MACHINE
}

export interface ReleaseMachineAction extends Action<ActionType>{
    type: ActionType.RELEASE_MACHINE,
    payload: {
        projectKey: string,
        machineId: string,
    }
}

export interface ChangeMachineStateAction extends Action<ActionType>{
    type: ActionType.CHANGE_MACHINE_STATE,
    payload: {
        projectKey: string,
        machineId: string,
        machineState: MachineStateDto
    }
}

export interface ErrorAction extends Action<ActionType>{
    type: ActionType.Error,
    payload: Error
};

export interface LoadCurrentUserAction extends Action<ActionType>{
    type: ActionType.LOAD_CURRENT_USER,
    payload: UserDto
}

export interface LoadProductsAction extends Action<ActionType>{
    type: ActionType.LOAD_PRODUCTS,
    payload: ProductDto[]
}

export interface LoadMachinesStatesAction extends Action<ActionType>{
    type: ActionType.LOAD_MACHINE_STATES,
    payload: {
        productId: string,
        machineStates: MachineStateDto[]
    }
}

export interface LoadUsersAction extends Action<ActionType>{
    type: ActionType.LOAD_USERS,
    payload: UsersDto
}

