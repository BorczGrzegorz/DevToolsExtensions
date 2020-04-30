import { getEngine } from "../engine";
import { process } from "./backgroundAction";
import axios from 'axios';
import { Settings, DefaultSettings } from "../models/Settings";
import { SETTINGS_KEY } from "../models/Consts";

const toMiliseconds = (minutes: number) => {
    console.log("Minutes", minutes);
    return (minutes * 60 * 1000)
};
const setInterval = (settings: Settings, callback: () => void): number => window.setInterval(callback, toMiliseconds(settings.delayInMinutes));

export class BackgroundTask {
    private settings: Settings;
    private intervalHandler: number | null;

    constructor() {
        this.settings = DefaultSettings;
        this.intervalHandler = null;
        this.listenOnSettingsChange();
    }

    public start = async () => {
        const settings = await getEngine().getFromStore<Settings>(SETTINGS_KEY);
        if (settings) {
            this.settings = settings;
        }

        this.runNewProcess();
    }

    private listenOnSettingsChange = async () => {
        await getEngine().onSettingsChange(SETTINGS_KEY, this.onSettingsChange);
    }

    private onSettingsChange = (newValue: any) => {
        if (this.intervalHandler) {
            window.clearInterval(this.intervalHandler);
            this.intervalHandler = null;
        }

        this.settings = newValue as Settings;
        axios.defaults.baseURL = this.settings.serverAddress;
        this.runNewProcess();
    }

    private runNewProcess = () => {       
        console.log("New Process Beginning");
        if (this.settings.isPushNotificationEnabled) {
            this.intervalHandler = setInterval(this.settings,() => process(this.settings.delayInMinutes));
        }
    }
}