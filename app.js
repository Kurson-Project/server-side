import express, { request } from "express";
import cors from "cors"
import dotenv from "dotenv"
import { json_format_send } from "./utils/excepts.js";
import { get_user, login, logout, register } from "./src/auth.js";
import {hash} from 'bcrypt';
dotenv.config()


const PORT = process.env.APP_PORT || 3001
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post('/register',async (request,res)=> {

    const result = await register(request)
    if (result == 0) {
        res.json(json_format_send({message:"register complete"}))
    }else{
        res.status(401).json(json_format_send({status:401,message:result}))
    }
 })

 app.post('/login',async (request,res)=>{
    const result = await login(request);
    if (result == "fail"){
        res.status(401).json(json_format_send({status:401,message:"kegagalan login"}));
    } else {
        const role = result.role                 // tambahan role
        res.json(json_format_send({message: "login succsess",data:result, role})); 
    }
 })

 app.put("/login",async (request,res)=> {
    const result = await get_user(request);
    if (result == "failed") {
        res.status(401).json(json_format_send({status:401,message:result}));
    } else {
        res.json(json_format_send({data : result}))
    }
 })

 app.post("/logout",async (request,res)=> {
    const result = await logout(request)
    if (result) {
        res.json(json_format_send({message : "logout success"}))
    } else {res.status(401).json(json_format_send({status : 401 , message : "unable to logout"}))}
 })

app.listen(PORT,()=> {console.log(`listen on http://127.0.0.1:${PORT}`)})