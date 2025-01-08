import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import { containsSpecialChars, sendjson } from "../utils/auto_generate.js"
import { request } from "express";

const prisma = new PrismaClient();
const secret = process.env.APP_KEY || "abc"

export class authController {
    
    // AUTH CONTROL USER REQUEST
    async signup(request,response) {
        if (process.env.APP_DEBUG) console.log("request : 'auth.signup'");
        const username = request.body.username
        const user_email = request.body.user_email
        const user_password = request.body.user_password
        if (containsSpecialChars(username)) {response.status(401).json(sendjson({status:401, message:"cant use special caracter"}))} 
        else if  (!user_email || !user_password || !username  ) {
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
                } else {
                    response.status(500).json(sendjson({status:500,message:"server cant handle"}))
                }
            }
        }
    }

    async login(request,response) {
        if (process.env.APP_DEBUG) console.log("request : 'auth.login'");

        const user_email = request.body.user_email;
        const user_password = request.body.user_password;

        if ( !user_email || !user_password ) {
            response.status(401).json(sendjson({status:401,message:"invalid request"}))
        }
        try {
            const data = await prisma.users.findFirst({ where : {user_email, user_password}, select:{id:true,user_email:true,username:true,auth_token:true} })
            const tokenData = {id : data.id,username : data.username, user_email : data.user_email}
            const token = jwt.sign(tokenData,secret,{expiresIn : "3 days"})
            data.auth_token.push(token)
            await prisma.users.update({where : {user_email,user_password},data:{
                auth_token : data.auth_token
            }})
            response.json(sendjson({data:{token}}))
        }catch(err){
            console.log(err)
            response.status(401).json(sendjson({status:401,message:"login fail"}))
        }
    }

    async logout (request,response) {
        const {authorization} = request.headers
        const token = authorization.split(" ")[1];
        try {
            const jwtDecode = jwt.verify(token,secret);
            const data = await prisma.users.findUnique({where:{id:jwtDecode.id},select:{auth_token:true}});
            const new_token = data.auth_token.filter((items)=> {return items != token})
            await prisma.users.update({where:{id:jwtDecode.id},data:{auth_token : new_token}})
            response.json(sendjson({message:"success to logout"}))
        }catch(err) {
            response.status(400).json(sendjson({status:400,message:"Logout fail"}))
        }
        
    }

    async middleware(request,response,next) {
        const {authorization} = request.headers
        if (!authorization) {
            response.status(400).json(sendjson({status:400,message:"invalid authorization"}))
        }else{
            const token = authorization.split(" ")[1];
            try{
                let availabe = false
                const jwtDecode = jwt.verify(token,secret);
                const data = await prisma.users.findUnique({where:{id:jwtDecode.id},select:{auth_token:true}});
                data.auth_token.forEach((e)=> {
                    if (e == token)  { availabe = true; next(); }
                })
                if (!availabe) response.status(401).json(sendjson({status:401,message:"Unauthorized"}))
            } catch (err) {
                response.status(401).json(sendjson({status:401,message:"Unauthorized"}))
            }
        }
    }
    // ! END
}