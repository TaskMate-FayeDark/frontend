import {api} from "./api.ts";
import {IUser} from "../types/user.ts";

export interface Credentials {
    name?: string;
    email: string;
    password: string;
}

export interface CredentialsLogin {
    email: string;
    password: string;
}

export interface LoginResponse {
    token?: string;
    user?: IUser;
    message: string;
    statusCode?: number;
}

export interface SignupResponse {
    message: string;
    user: IUser;
    statusCode?: number;
}

export interface ResetPassCredentials {
    email: string;
    code?: number;
    newPassword?: string;
}

export interface ResetPassResponse {
    message: string;
    statusCode: number;
    toMail?: string;
}

export const loginApi = async (credentials: CredentialsLogin): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
}

export const signupApi = async (credentials: Credentials): Promise<SignupResponse> => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
}

export const sendMail = async (mail: string): Promise<ResetPassResponse> => {
    const response = await api.post('/auth/send-reset-code', {mail});
    return response.data;
}

export const resetPassword = async (credentials: ResetPassCredentials): Promise<ResetPassResponse> => {
    const response = await api.post('/auth/reset-password', credentials);
    return response.data;
}