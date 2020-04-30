import { ProductDictionary } from "../models/AppState";
import { Action } from "redux";
import { ActionType, LoadProductsAction } from "../actions/models";

export const productsReducer = (previousState: ProductDictionary = {}, action: Action<ActionType>) => {

    if (action.type === ActionType.LOAD_PRODUCTS) {
        const loadProducts: LoadProductsAction = action as LoadProductsAction;
        const newProdcuts: ProductDictionary = {};
        loadProducts.payload.forEach(x => (newProdcuts[x.name] = {
            id: x.id,
            name: x.name
        }));
        return { ...previousState, ...newProdcuts };
    }

    return previousState;
}