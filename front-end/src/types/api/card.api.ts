import type CardModel from "../model/card.model.ts";
import type {GetReturnType} from "@/types/api/api.ts";

export interface GetCardsReturnType extends GetReturnType {
    data: CardModel[];
}

export interface GetCardReturnType extends GetReturnType {
    data: CardModel;
}

export interface GetCardByUserReturnType extends GetReturnType {
    data: CardModel[];
}
