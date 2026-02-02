import type CardModel from "../model/card.model.ts";
import type UserModel from "@/types/model/user.model.ts";
import type {GetReturnType} from "@/types/api/api.ts";

export interface GachaPullReturnType extends GetReturnType {
    data: {
        obtainedCard: CardModel;
        user: UserModel;
    }
}
