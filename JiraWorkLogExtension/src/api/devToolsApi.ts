import { getEngine, Cookie } from './../engine/index';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UsersDateWorklogDto, UsersDto, UserDto, IssueDto } from './devToolsDTO';
import qs from 'qs';
import { Settings } from '../models/Settings';
import { SETTINGS_KEY } from '../models/Consts';

const isNullOrWhiteSpace = (value: string) => {
  return value === undefined || value === null || value === '' || value === ' ';
};

const setInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  config.baseURL = await getServerAddress();
  const jiraDomain = await getJiraDomain();
  const boardId = await getBoardId();
  const cookies: Cookie[] = await getEngine().getCookies(jiraDomain);
  config.headers['x-cookie'] = cookies.map((x) => `${x.name}=${x.value}`).join(';');
  config.headers['x-board'] = boardId;
  return config;
};

const getServerAddress = async (): Promise<string> => {
  const settings = await getEngine().getFromStore<Settings>(SETTINGS_KEY);
  if (isNullOrWhiteSpace(settings.serverAddress)) {
    console.log('ServerAddress is not set yet');
    throw new Error('Server addres has not been set yet!');
  }

  return settings.serverAddress;
};

const getJiraDomain = async (): Promise<string> => {
  const settings = await getEngine().getFromStore<Settings>(SETTINGS_KEY);
  if (isNullOrWhiteSpace(settings.jiraDomain)) {
    console.log('ServerAddress is not set yet');
    throw new Error('Jira domain has not been set yet!');
  }

  return settings.jiraDomain;
};

const getBoardId = async (): Promise<string> => {
  const settings = await getEngine().getFromStore<Settings>(SETTINGS_KEY);
  if (settings.boardId === undefined || settings.boardId === null || settings.boardId === '') {
    console.log('ServerAddress is not set yet');
    throw new Error('Board Id has not been set yet!');
  }

  return settings.boardId;
};

axios.interceptors.request.use((config) => setInterceptor(config));

export enum IssueState {
  TO_DO = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  REJECTED = 4,
}

export enum SprintState {
  ACTIVE,
  CLOSED,
  FUTURE,
}

export interface SearchParams {
  userName?: string[];
  startFrom?: Date;
  sprintState?: SprintState;
  issueState?: IssueState;
  issueAssignee?: string;
}

export interface IssueSearchParams {
  startFrom?: Date;
  sprintState?: SprintState;
  issueState?: IssueState[];
  notIssueState?: IssueState[];
  issueAssignee?: string;
}

export const getIssues = async (searchParams: IssueSearchParams): Promise<IssueDto[]> => {
  let query = qs.stringify(searchParams);
  const response: AxiosResponse<IssueDto[]> = await axios.get(`/api/v2/issues?${query}`);
  return response.data;
};

export const getUsersDateWorklog = async (searchParams: SearchParams): Promise<UsersDateWorklogDto> => {
  let query = qs.stringify(searchParams);
  const boardId = await getBoardId();
  const response: AxiosResponse<UsersDateWorklogDto> = await axios.get(`/api/v2/users/dates/issues?${query}`);
  return response.data;
};

export const getUsers = async (userNames: string[]): Promise<UsersDto> => {
  const response: AxiosResponse<UsersDto> = await axios.get(
    `/users?${userNames.map((x) => `userName=${x}`).join('&')}`
  );
  return response.data;
};

export const getUserName = async (): Promise<string> => {
  const response: AxiosResponse<UserDto> = await axios.get(`/users/self`);
  return response.data.key;
};

export const logWork = (issueId: string, minutes: number) =>
  axios.post(`/api/v2/worklogs/issue/${issueId}/minutes/${minutes}`);
