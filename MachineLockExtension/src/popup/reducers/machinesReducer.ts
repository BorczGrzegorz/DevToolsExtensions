import { ProductMachineDictionary, MachineDictionary } from "../models/AppState";
import { ActionType, LoadProductsAction, LoadMachinesStatesAction, ChangeMachineStateAction, ReleaseMachineAction } from "../actions/models";
import { Action } from "redux";

export const machineReducer = (previosState: ProductMachineDictionary = {}, action: Action<ActionType>) => {
    switch (action.type) {
        case ActionType.LOAD_PRODUCTS:
            return reduceLoadProducts(previosState, action as LoadProductsAction);
        case ActionType.LOAD_MACHINE_STATES:
            return reduceLoadMachineStates(previosState, action as LoadMachinesStatesAction);
        case ActionType.CHANGE_MACHINE_STATE:
            return reduceChangeMachineState(previosState, action as ChangeMachineStateAction)
         case ActionType.RELEASE_MACHINE:
            return reduceReleaseMachine(previosState, action as ReleaseMachineAction)
        default:
            break;
    }

    return previosState;
}

const reduceReleaseMachine = (previosState: ProductMachineDictionary, action: ReleaseMachineAction): ProductMachineDictionary => {
    previosState[action.payload.projectKey][action.payload.machineId] = {
        ...previosState[action.payload.projectKey][action.payload.machineId],
        lockedDate: null,
        user: ''
    };
    return { ...previosState }
}

const reduceChangeMachineState = (previosState: ProductMachineDictionary, action: ChangeMachineStateAction): ProductMachineDictionary => {
    previosState[action.payload.projectKey][action.payload.machineId] = {
        ...previosState[action.payload.projectKey][action.payload.machineId],
        lockedDate: action.payload.machineState.lockedDate,
        user: action.payload.machineState.userName
    };
    return { ...previosState }
}

const reduceLoadProducts = (previosState: ProductMachineDictionary, action: LoadProductsAction): ProductMachineDictionary => {
    const newState: ProductMachineDictionary = { ...previosState };

    action.payload.forEach(x => {
        newState[x.name] = {};
        x.machines.forEach(y => newState[x.name][y.id] = {
            id: y.id,
            name: y.name,
            lockedDate: null,
            user: ''
        })
    });

    return newState;
}

const reduceLoadMachineStates = (previosState: ProductMachineDictionary, action: LoadMachinesStatesAction): ProductMachineDictionary => {
    const machineDictionary: MachineDictionary = previosState[action.payload.productId];

    action.payload.machineStates.map(x => {
        const isNull = machineDictionary[x.id];
        if (!isNull) {
            return;
        }

        machineDictionary[x.id] = { ...machineDictionary[x.id], lockedDate: x.lockedDate, user: x.userName }
    });

    return { ...previosState };
}