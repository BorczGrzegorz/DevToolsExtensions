import { ProductDto, MachineStateDto, UserDto, UsersDto } from './devToolsModels';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Settings, SETTINGS_KEY } from '../models/Settings';
import { getEngine, Cookie } from '../engine/engine';

const isNullOrWhiteSpace = (value: string) => {
  return value === undefined || value === null || value === '' || value === ' ';
};

const setInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const settings = await getEngine().getFromStore<Settings>(SETTINGS_KEY);
  if (isNullOrWhiteSpace(settings.serverAddress)) {
    console.log('ServerAddress is not set yet');
    throw new Error('Server addres has not been set yet!');
  }
  if (isNullOrWhiteSpace(settings.jiraDomain)) {
    console.log('ServerAddress is not set yet');
    throw new Error('Jira domain has not been set yet!');
  }

  config.baseURL = settings.serverAddress;
  const cookies: Cookie[] = await getEngine().getCookies(settings.jiraDomain);
  config.headers['x-cookie'] = cookies.map((x) => `${x.name}=${x.value}`).join(';');
  return config;
};

axios.interceptors.request.use((config) => setInterceptor(config));

export const getProducts = async (): Promise<ProductDto[]> => {
  const response: AxiosResponse<ProductDto[]> = await axios.get(`/product`);
  return response.data;
};

export const getMachineStates = async (): Promise<MachineStateDto[]> => {
  const response: AxiosResponse<MachineStateDto[]> = await axios.get('machines/states');
  return response.data;
};

export const getUser = async (): Promise<UserDto> => {
  const response: AxiosResponse<UserDto> = await axios.get(`/users/self`);
  return response.data;
};

export const getUsers = async (userNames: string[]): Promise<UsersDto> => {
  const response: AxiosResponse<UsersDto> = await axios.get(
    `/users?${userNames.map((x) => `userName=${x}`).join('&')}`
  );
  return response.data;
};

export const lockMachine = async (machineId: string, userName: string): Promise<MachineStateDto> => {
  const response: AxiosResponse<MachineStateDto> = await axios.put(
    `/lock/machineName/${machineId}/userName/${userName}`
  );
  return response.data;
};

export const releaseMachine = async (machineId: string, userName: string): Promise<void> => {
  await axios.put(`/release/machineName/${machineId}/userName/${userName}`);
};
