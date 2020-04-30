/// <reference types="chrome"/>

import { Settings } from '../models/Settings';
import { SETTINGS_KEY } from '../models/Consts';
import { NOTIFICATIONS_KEY } from './../models/Consts';
import { Notification, Issue } from './../models/Notifications';

export interface Cookie {
  domain: string;
  name: string;
  value: string;
}

export interface Engine {
  getFromStore: <T>(key: string) => Promise<T>;
  saveInStore: <T>(key: string, model: T) => void;
  getCookies: (domain: string) => Promise<Cookie[]>;
  onSettingsChange: (key: string, callback: (newValue: any, oldValue: any) => void) => void;
  openOptions: () => void;
}

export class ChromeEngine implements Engine {
  onSettingsChange = (key: string, callback: (newValue: any, oldValue: any) => void) => {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local' && changes[key]) {
        callback(changes[key].newValue, changes[key].oldValue);
      }
    });
  };
  saveInStore = <T>(key: string, model: T) => {
    chrome.storage.local.set({ [key]: model });
  };

  getFromStore = <T>(key: string): Promise<T> => {
    let promise = new Promise<T>((resolve, reject) => {
      chrome.storage.local.get(key, function (result) {
        let data = result[key];
        resolve(data);
      });
    });
    promise.then((result) => result);
    return promise;
  };

  getCookies = (domain: string): Promise<Cookie[]> => {
    let promise = new Promise<Cookie[]>((resolve, reject) => {
      chrome.cookies.getAll({ domain: domain }, (cookies) => resolve(cookies));
    });
    promise.then((result) => {
      return result;
    });
    return promise;
  };

  openOptions = () => {
    chrome.tabs.create({ url: 'chrome://extensions/?options=' + chrome.runtime.id });
  };
}

export class MemoryEngine implements Engine {
  private values: { [key: string]: any };

  constructor() {
    const now = Date.now();
    this.values = {
      [SETTINGS_KEY]: {
        isPushNotificationEnabled: true,
        delayInMinutes: 250,
        serverAddress: 'http://localhost:3000/',
        boardId: '123',
      } as Settings,
      [NOTIFICATIONS_KEY]: [
        {
          logWorkInMinutes: 15,
          creationDate: now,
          issues: [1, 2, 3, 4].map(
            (i: number): Issue => {
              return {
                id: `id ${i}`,
                key: `RMS ${i}`,
                summary: `summary ${i}`,
              } as Issue;
            }
          ),
        },
        {
          logWorkInMinutes: 15,
          creationDate: now,
          issues: [1, 2, 3, 4].map(
            (i: number): Issue => {
              return {
                id: `id ${i}`,
                key: `RMS ${i}`,
                summary: `summary ${i}`,
              } as Issue;
            }
          ),
        },
        {
          logWorkInMinutes: 15,
          creationDate: now,
          error: new Error('error'),
        },
      ] as Notification[],
    };
    console.log('Memory engine values', this.values);
  }

  saveInStore = <T>(key: string, model: T) => {
    this.values[key] = model;
  };

  getFromStore = <T>(key: string): Promise<T> => {
    let promise = new Promise<T>((resolve, reject) => {
      const data = this.values[key];
      resolve(data);
    });
    promise.then((result) => result);
    return promise;
  };

  getCookies = (domain: string): Promise<Cookie[]> => {
    let promise = new Promise<Cookie[]>((resolve, reject) => {
      resolve([
        {
          domain,
          name: 'JSESSIONID',
          value: '265A742E78EA621056D4BEEA58EFDFC1',
        },
        {
          domain,
          name: 'atlassian.xsrf.token',
          value: 'B1ML-WBP8-CAED-WV8O_8ec483d29d55043cf11a8a13dbb61352d0ea52dc_lin',
        },
        {
          domain,
          name: '"DWRSESSIONID"',
          value: 'MaMD6J*99m5$Uy5uCmDF4HfU*3n',
        },
      ]);
    });
    promise.then((result) => {
      return result;
    });
    return promise;
  };

  onSettingsChange = (key: string, callback: (newValue: any, oldValue: any) => void) => {};

  openOptions = () => {};
}

let currentEngine: Engine = new ChromeEngine();

export const setEngine = (engine: Engine) => {
  currentEngine = engine;
};

export const getEngine = () => {
  return currentEngine;
};
