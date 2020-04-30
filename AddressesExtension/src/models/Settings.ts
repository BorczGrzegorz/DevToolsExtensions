export const SETTINGS_KEY = 'addresses-settings';

export const DefaultSettings : Settings = {
    lastSelectedProduct: null,
    serverAddress: ''
}

export interface Settings {
    lastSelectedProduct: string | null;
    serverAddress: string;
}