import api from './api';
import type {AuthLoginType, AuthRegisterType, AuthReturnType} from "../types/api/auth.api.ts";

export const authorize = async (clientId: string, redirectUri: string) => {
    api.redirect(`oauth/authorize?clientId=${clientId}&redirectUri=${redirectUri}`)
}

export const login = async (clientId: string, clientSecret: string, code: string, userInfo: AuthLoginType): Promise<AuthReturnType> => {
    return await api.post(`oauth/token?clientId=${clientId}&clientSecret=${clientSecret}&code=${code}`, userInfo) as AuthReturnType;
}

export const register = async (userInfo: AuthRegisterType): Promise<AuthReturnType> => {
    return await api.post('register', userInfo) as AuthReturnType;
}
