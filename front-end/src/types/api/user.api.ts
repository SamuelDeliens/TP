import type UserModel from "../model/user.model.ts";
import type {GetReturnType} from "@/types/api/api.ts";

export interface GetUserDetailReturnType extends GetReturnType {
    data: UserModel
}
