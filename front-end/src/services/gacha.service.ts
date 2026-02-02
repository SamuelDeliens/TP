import api from "./api.ts";
import type {GachaPullReturnType} from "../types/api/gacha.api.ts";
import type {GetUserDetailReturnType} from "@/types/api/user.api.ts";

export const performGachaPull = async (userId: string): Promise<GachaPullReturnType> => {
    return await api.post(`gacha`, {userId}) as GachaPullReturnType;
}

export const addGacha = async (userId: string): Promise<GetUserDetailReturnType> => {
    return await api.post(`gacha/add`, {userId}) as GetUserDetailReturnType;
}

export default {
    performGachaPull,
}