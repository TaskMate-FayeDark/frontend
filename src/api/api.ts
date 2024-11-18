import axios, {InternalAxiosRequestConfig} from 'axios';
import {env} from "../config/env-config.ts";
import {LocalStorageKey} from "../types/localstorage.ts";

export const api = axios.create({
    baseURL: env.VITE_APP_API,
})

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    if(config.headers) {
        const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
        if(token) {
            config.headers.authorization = `Bearer ${token}`;
        }
    }
    return config;
}

api.interceptors.request.use(authRequestInterceptor);