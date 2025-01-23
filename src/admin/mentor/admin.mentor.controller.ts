
import express from "express";
import { sendJson , containsSpecialChars } from "../../utils/exepts";
import { mentorDelete, mentorRegister } from "../admin.service";
import { getManyMentors, getMentorbyId } from "../admin.repository";

export const adminMentorRouter = express.Router();
export const adminMentorGets = express.Router();

adminMentorRouter.post("/", async (request,response)=>{
    const username = request.body.username
    const user_email = request.body.user_email
    let user_password = request.body.user_password
    if (!username || !user_email || !user_password) {
        response.status(400).json(sendJson({ message: "all field cant be blank!" })); return;
    } else if (containsSpecialChars(username)) {
        response.status(400).json(sendJson({ message: "cant contains special char" })); return;
    } else {
        try{
            await mentorRegister({username,user_email,user_password})
            response.json(sendJson({message:"success"}))
        } catch (error) {
            if (error && typeof error == "object" && "code" in error) {
                if (error.code = "P2002") {
                    response.status(400).json(sendJson({ message: "Email is already registered" }))
                    return;
                }
            }
            response.status(500).json(sendJson({ message: "internal server error" }))
        }
    }
})

adminMentorRouter.delete("/",async(request,response)=>{
    const mentor_id = request.body.mentor_id
    if (!mentor_id) {
        response.status(400).json(sendJson({ message: "need mentor id!, cant be blank!" })); return;
    } else { 
        try {
            await mentorDelete(mentor_id);
            response.json(sendJson({message:"success"}))
        } catch (error) {
            if (error && typeof error == "object" && "code" in error) {
                if (error.code = "P2003") {
                    response.status(400).json(sendJson({ message: "Mentor not found" }))
                    return;
                }
            }
            response.status(500).json(sendJson({ message: "internal server error" }))
        }
    }
})

adminMentorRouter.put("/",async(request,response)=>{
    response.json(sendJson({message:"route ini dalam pengembangan"}))

})

adminMentorRouter.get("/",async(request,response)=>{
    const mentor_id = request.query.mentor_id
    if (!mentor_id) {
        response.status(400).json(sendJson({ message: "need mentor id!, cant be blank!" })); return;
    } else {
        try {
            const userdata = await getMentorbyId(String(mentor_id))
            response.json(sendJson({message:"success",data:userdata!}))
        } catch (error) {
            if (error && typeof error == "object" && "code" in error) {
                if (error.code = "P2003") {
                    response.status(400).json(sendJson({ message: "Mentor not found" }))
                    return;
                }
            }
            response.status(500).json(sendJson({ message: "internal server error" }))
        }
    }
})
adminMentorGets.get("/",async(request,response)=>{
    const skip  = request.query.skip
    const take = request.query.take
    if (!skip || !take) {
        response.status(400).json(sendJson({ message: "need skip and take!, cant be blank!" })); return;
    } else {
        try {
            const userdata = await getManyMentors(Number(skip),Number(take))
            response.json(sendJson({message:"success",data:{length : userdata.length,users:userdata}}))
        } catch (error) {
            response.status(500).json(sendJson({ message: "internal server error" }))
        }
    }
})