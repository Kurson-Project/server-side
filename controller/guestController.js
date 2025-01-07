import { PrismaClient } from "@prisma/client"
import { sendjson } from "../utils/auto_generate.js"

const prisma = new PrismaClient();

export class guestController {
    // GUEST CONTROL USER REQUEST

    async signup(request,response) {
        const username = request.body.username
        const user_email = request.body.user_email
        const user_password = request.body.user_password
        if  (!user_email || !user_password || !username) {
            response.status(401).json(sendjson({status : 401, message: "invalid request"}));
        } else {
            try{
                await prisma.users.create({
                    data:{username,user_email,user_password}
                })
                response.json(sendjson({message:"user signup success"}))
            } catch (err){
                if (err.code == "P2002") {
                    response.status(401).json(sendjson({status:401,message:"email alredy token"}))
                }
                response.status(500).json(sendjson({status:500,message:"server cant handle"}))
                console.log(err.code)
            }
        }
    }

    // ! END
}