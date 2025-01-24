import express, { response } from "express"  
import { getUserdatabyID } from "./user.repository";
import { sendJson } from "../utils/exepts";
export const Router = express.Router();

Router.get('/', async (request,response)=>{
    try{
        const user_id = request.user?.userdata.id!
        const userdata = await getUserdatabyID(user_id);
        response.json({message : "success" , data : userdata})
    } catch (error) {
        response.status(500).json(sendJson({message:"Internal Server Error"}))
    } 
})