import { userSecretDeselect } from "../utils/exepts"
import { prisma } from "../utils/prisma"
export const getUserdatabyID = async (user_id : string) => {
   return await prisma.users.findFirst({where:{id: user_id},select : userSecretDeselect})
}