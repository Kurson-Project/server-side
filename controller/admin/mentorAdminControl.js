import { no_secret_user_take, sendjson, user_secret_remove } from "../../utils/autoGenerate.js";
import { PrismaClient } from "@prisma/client";
import bycript from "bcrypt"
const prisma = new PrismaClient();

export class mentorAdminControl {
    async deleteMentor(request,response){
        const {mentor_id} = request.body;
        if (!mentor_id) { return response.status(400).json(sendjson({status:400,message:"mentor_id cant blank"})) }
        try{
            await prisma.users.delete({where: {id : mentor_id , role : "mentor"}})
            return response.json(sendjson({status : 200 , message : `mentor delete success with id : ${mentor_id}`}))
        } catch (error) {
            if (error.message && error.message.includes("Record to delete does not exist")) {
                return response.status(400).json(sendjson({status : 400 , message : "user id does not exist"}))
            }
            response.status(500).json(sendjson({status : 500 , message : "internal server error"}))
        }
    }

    async updateMentor(request,response) {
        try {
            const data_update = {}
            const mentor_id = request.body.mentor_id
            if (!mentor_id) { return response.status(400).json(sendjson({status:400,message:"mentor_id cant blank"})) }
            if (request.body.username) { data_update.username = request.body.username }
            if (request.body.user_password) { data_update.user_password = await bycript.hash(request.body.user_password,4) }
            if (request.body.user_email) { data_update.user_email = request.body.user_email }
            if (request.body.user_picture) {data_update.user_picture = request.body.user_picture}
            
            if ( Object.keys(data_update).length == 0 ) {
                return response.status(400).json(sendjson({status:400,message:"read the documentation about field update!"}))
            }
            await prisma.users.update({where : {id : mentor_id}, data : data_update})
            
            response.json(sendjson({status:200,message : "update succsessfull",data:data_update}))
        } catch (error) {
            console.log(error)
            if (error.message && error.message.includes("Record to delete does not exist")) {
                return response.status(400).json(sendjson({status : 400 , message : "user id does not exist"}))
            }
            response.status(500).json(sendjson({status : 500 , message : "internal server error"}))
        }
        

    }

    async getMentorUser(request,response) {
        const mentor_id = request.query.mentor_id
        if (!mentor_id) { return response.status(400).json(sendjson({status:400,message:"mentor_id cant blank"})) }
        try {
            let data = await prisma.users.findFirst({where : {id : mentor_id, role : "mentor"}})
            data = user_secret_remove(data)
            if (!data) {return response.status(400).json(sendjson({status:400,message:"mentor with id does not exist"}))}
            response.json(sendjson({status:200,data : data}))
        } catch ( error ) {
            response.send("fail")
        }
    }
    async getMentorUsers (request,response) {
        const max = parseInt(request.query.max) || 10
        const pageof = request.query.pageof || 0
        const skip = max * pageof
        try{
            const data = await prisma.users.findMany({where : {role : "mentor"},take : max,skip , select : no_secret_user_take})
            return response.json(data)
        } catch ( error ) {
            console.log(error)
            response.status(500).json(sendjson({status : 500 , message : "internal server error"}))
        }
        
    }
}