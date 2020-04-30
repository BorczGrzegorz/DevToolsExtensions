export const DefaultSettings: Settings = {
  lastSelectedProduct: null,
  serverAddress: '',
  jiraDomain: '',
};

export const SETTINGS_KEY = 'machine-lock-settings';

export interface Settings {
  lastSelectedProduct: string | null;
  serverAddress: string;
  jiraDomain: string;
}
