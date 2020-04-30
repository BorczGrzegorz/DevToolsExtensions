export interface AppState {
    lastSelectedProject: string,
    users: UsersDictionary,
    machines: ProductMachineDictionary,
    products: ProductDictionary,
    currentUser: User | null,
    error: Error | null
}

export interface UsersDictionary {
    [key: string]: User
}

export interface User {
    avatar: string,
    key: string,
    displayName: string
}

export interface ProductDictionary {
    [key: string]: Product
}

export interface Product {
    id: string,
    name: string,
}

export interface ProductMachineDictionary {
    [productId: string]: MachineDictionary
}

export interface MachineDictionary {
    [machineId: string]: Machine
}

export interface Machine {
    id: string,
    name: string,
    user: string
    lockedDate: Date | null
}