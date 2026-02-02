import type {GetReturnType} from "@/types/api/api.ts";

export interface AuthLoginType {
    login: string;
    password: string;
}

export interface AuthRegisterType {
    login: string;
    password: string;
}

export interface AuthReturnType extends GetReturnType {
    data: {
        user_id: string,
        access_token: string,
        refresh_token: string,
        token_type: 'Bearer',
        access_expires_in: number,
        refresh_expires_in: number
    }
}