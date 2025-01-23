import { userCreate } from "../auth/auth.repository";
import { registerRequest } from "../auth/auth.service";
import bycript from "bcrypt"
import { mentorUserDelete } from "./admin.repository";

export const mentorRegister = async (data : registerRequest) => {
    data.user_password = await bycript.hash(data.user_password, 4)
    await userCreate(data, "mentor");
    return;
}

export const mentorDelete  = async (mentor_id : string) => {
    await mentorUserDelete(mentor_id);
}