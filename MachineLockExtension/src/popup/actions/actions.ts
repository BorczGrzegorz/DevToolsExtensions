import { Dispatch } from "redux";
import { ErrorAction, ActionType, LoadCurrentUserAction, LoadProductsAction, LoadUsersAction, ChangeMachineStateAction, ReleaseMachineAction } from "./models";
import { getUser, getProducts, getMachineStates, getUsers, lockMachine, } from "../../api/devToolsApi";
import { ProductDto, UserDto, MachineStateDto, UsersDto } from "../../api/devToolsModels";
import { AppState, Product } from './../models/AppState';
import { MachineDto } from './../../api/devToolsModels';
import { LoadMachinesStatesAction } from './models/index';
import { getEngine } from "../../engine/engine";
import { Settings, SETTINGS_KEY } from "../../models/Settings";
import { releaseMachine } from './../../api/devToolsApi';

export const errorHandler = (error: any) => async (dispatch: Dispatch) => {
    dispatch<ErrorAction>({
        type: ActionType.Error,
        payload: error
    })
}

export const lockMachineAction = (projectKey: string, machineId: string, user: string) => async (dispatch: Dispatch<any>) => {
    const newMachineState: MachineStateDto = await lockMachine(machineId, user);
    dispatch<ChangeMachineStateAction>({
        type: ActionType.CHANGE_MACHINE_STATE,
        payload: {
            machineId: machineId,
            projectKey: projectKey,
            machineState: newMachineState
        }
    })
}

export const releaseMachineAction = (projectKey: string, machineId: string, user: string) => async (dispatch: Dispatch<any>) => {
    await releaseMachine(machineId, user);
    dispatch<ReleaseMachineAction>({
        type: ActionType.RELEASE_MACHINE,
        payload: {
            machineId: machineId,
            projectKey: projectKey
        }
    })
}

export const loadData = () => async (dispatch: Dispatch<any>) => {
    const currentUser: UserDto = await getUser();
    dispatchLoadCurrentUserAction(dispatch, currentUser);
    const products: ProductDto[] = await getProducts();
    dispatchLoadProductsAction(dispatch, products);
}

export const changeLastSelectedProduct = (lastSelectedProduct: string) => async (dispatch: Dispatch, getState: () => AppState) => {
    const settings: Settings = await getEngine().getFromStore<Settings>(SETTINGS_KEY);
    getEngine().saveInStore<Settings>(SETTINGS_KEY, { ...settings, lastSelectedProduct });

    const currentState: AppState = getState();
    const product: Product | null = currentState.products[lastSelectedProduct];
    if (product) {
        //TODO change to machine per product
        const machineStates: MachineStateDto[] = await getMachineStates();
        const userNames: string[] = machineStates.map(x => x.userName);
        const users: UsersDto = await getUsers(userNames);

        dispatchLoadUsers(dispatch, users);
        dispatchLoadMachineStates(dispatch, product.name, machineStates);
    }

    console.log(`Product ${lastSelectedProduct} does not exist in store`);
}

const dispatchLoadUsers = (dispatch: Dispatch, users: UsersDto) => {
    dispatch<LoadUsersAction>({
        type: ActionType.LOAD_USERS,
        payload: users
    });
}

const dispatchLoadMachineStates = (dispatch: Dispatch, productId: string, machines: MachineStateDto[]) => {
    dispatch<LoadMachinesStatesAction>({
        type: ActionType.LOAD_MACHINE_STATES,
        payload: {
            productId,
            machineStates: machines
        }
    });
}

const dispatchLoadCurrentUserAction = (dispatch: Dispatch, currentUser: UserDto) => {
    dispatch<LoadCurrentUserAction>({
        type: ActionType.LOAD_CURRENT_USER,
        payload: currentUser
    });
}

const dispatchLoadProductsAction = (dispatch: Dispatch, products: ProductDto[]) => {
    dispatch<LoadProductsAction>({
        type: ActionType.LOAD_PRODUCTS,
        payload: products
    });
}