import api from "./api.ts";
import type {GetUserDetailReturnType} from "../types/api/user.api.ts";
import type {GetCardByUserReturnType} from "../types/api/card.api.ts";

export const getUserDetail = async (id: string) => {
    return await api.get(`users/${id}`) as GetUserDetailReturnType;
}

export const getUserCards = async (id: string) => {
    return await api.get(`users/${id}/cards`) as GetCardByUserReturnType;
}
