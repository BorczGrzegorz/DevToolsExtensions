/// <reference types="chrome"/>

export interface Engine {
    getFromStore: <T>(key: string) => Promise<T>,
    getCookies: (domain: string) => Promise<Cookie[]>,
    saveInStore: <T>(key: string, model: T) => void,
    openTab: (url: string) => void
}

export interface Cookie {
    domain: string,
    name: string,
    value: string;
}

export class ChromeEngine implements Engine {

    openTab = (url: string) => {
        chrome.tabs.create({url})
    }

    saveInStore = <T>(key: string, model: T) => {
        chrome.storage.local.set({ [key]: model })
    };

    getFromStore = <T>(key: string): Promise<T> => {
        let promise = new Promise<T>((resolve, reject) => {
            chrome.storage.local.get(key, function (result) {
                let data = result[key];
                resolve(data);
            });
        });
        promise.then(result => result);
        return promise;
    }

    getCookies = (domain: string): Promise<Cookie[]> => {
        let promise = new Promise<Cookie[]>((resolve, reject) => {
            chrome.cookies.getAll({ domain: domain }, cookies => resolve(cookies));
        });
        promise.then(result => {
            return result;
        });
        return promise;
    }
}

export class MemoryEngine implements Engine {
    private values: { [key: string]: any };

    constructor() {
        this.values = {};
    }
    
    openTab = (url: string) => {
        console.log("OPEN TAB", url);
    }

    saveInStore = <T>(key: string, model: T) => {
        this.values[key] = model;
    };

    getFromStore = <T>(key: string): Promise<T> => {
        let promise = new Promise<T>((resolve, reject) => {
            const data = this.values[key];
            resolve(data);
        });
        promise.then(result => result);
        return promise;
    }

    getCookies = (domain: string): Promise<Cookie[]> => {
        let promise = new Promise<Cookie[]>((resolve, reject) => {
            resolve([
                {
                    domain,
                    name: 'JSESSIONID',
                    value: '265A742E78EA621056D4BEEA58EFDFC1'
                },
                {
                    domain,
                    name: 'atlassian.xsrf.token',
                    value: 'B1ML-WBP8-CAED-WV8O_8ec483d29d55043cf11a8a13dbb61352d0ea52dc_lin'
                },
                {
                    domain,
                    name: '"DWRSESSIONID"',
                    value: 'MaMD6J*99m5$Uy5uCmDF4HfU*3n'
                }
            ])
        });
        promise.then(result => {
            return result;
        });
        return promise;
    }
}

let currentEngine: Engine = new ChromeEngine();

export const setEngine = (engine: Engine) => {
    currentEngine = engine;
}

export const getEngine = () => {
    return currentEngine;
}