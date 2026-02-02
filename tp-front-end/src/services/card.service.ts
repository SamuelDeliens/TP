import api from "./api.ts";
import type {GetCardReturnType, GetCardsReturnType} from "../types/api/card.api.ts";

export const getCards = async (): Promise<GetCardsReturnType> => {
    return await api.get('cards') as GetCardsReturnType;
}

export const getCardDetail = async (id: string): Promise<GetCardReturnType> => {
    return await api.get(`cards/${id}`) as GetCardReturnType;
}
