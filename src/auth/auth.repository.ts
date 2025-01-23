import { registerRequest } from "./auth.service";
import { prisma } from "../utils/prisma";

export const userCreate = async (data : registerRequest, role : "user" | "admin" | "mentor") =>{
    await prisma.users.create({data : {username : data.username , user_email : data.user_email , user_password : data.user_password , role : role}})
}
export const userCreatebyGoogle = async (data : registerRequest , user_picture : string) => {
    await prisma.users.create({data : {username : data.username , user_email : data.user_email , user_password : data.user_password , role : "user" , user_picture : user_picture}})
}
export const getUserDataByEmail = async (Email : string) => {
    return await prisma.users.findFirst({where : {user_email : Email}});
}
export const updateUserToken = async (user_email : string , user_token : {}) => {
    await prisma.users.update({where : {user_email : user_email}, data : {auth_token : user_token}})
}