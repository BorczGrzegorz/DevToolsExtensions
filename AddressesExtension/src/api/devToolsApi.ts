import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Settings, SETTINGS_KEY } from '../models/Settings';
import { getEngine } from '../engine/engine';

const setInterceptor = async (config: AxiosRequestConfig) : Promise<AxiosRequestConfig> => {
    const settings = await getEngine().getFromStore<Settings>(SETTINGS_KEY);
    if(settings.serverAddress === undefined || settings.serverAddress === null || settings.serverAddress === ''){
        console.log('ServerAddress is not set yet');
        throw new Error('Server addres has not been set yet!')
    }
    
    config.baseURL = settings.serverAddress;
    return config;
}

axios.interceptors.request.use(config => setInterceptor(config));

export interface ProductDto {
    id: string,
    name: string,
    description: string | null,
    machines: MachineDto[],
    projects: ProjectDto[]
}

export interface MachineDto {
    id: string,
    name: string,
    description: string,
    address: string
}

export interface ProjectDto{
    id: string,
    name: string,
    addresses: AddressDto[]
}

export interface AddressDto{
    id: string,
    name: string,
    path: string,
    isSingleUrl: boolean
}

export const getProducts = async () : Promise<ProductDto[]> => {
    const response : AxiosResponse<ProductDto[]> = await axios.get(`/product`);
    return response.data;
}