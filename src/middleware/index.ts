import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { sendJson } from "../utils/exepts";
import { getUserDataByEmail } from "../auth/auth.repository";

declare global {
    namespace Express {
      interface Request {
        user?: {
          userdata: any;
          request_token : string;
        };
      }
    }
  }

export async function middleware(role : string,request: Request) {
    const header = request.headers
    const authorization = header.authorization
    if (!authorization) {
        return false
    } else {
        try {
            const token = String(authorization).split(" ")[1];
            let available = false
            const tokenDecoded = jwt.verify(token, process.env.APP_KEY!)
            if (typeof tokenDecoded == "object" && "user_email" in tokenDecoded && "role" in tokenDecoded) {
                const userdata = await getUserDataByEmail(tokenDecoded.user_email)
                if (role != "all") {
                    if (role != userdata!.role) {                        
                        throw Error("role cancel")
                    }
                }
                request.user = { userdata , request_token : token}
                userdata?.auth_token.forEach((e) => {
                    if (e == token) { 
                        available = true; 
                    }
                })
                return available
            } else { throw Error("email not found") }
        } catch (error) {
            return false
        }
    }
}

export async function middleware_admin (request:Request, response:Response, next : NextFunction) {
    (await middleware("admin",request)) ? next() : response.status(401).json(sendJson({ message: "Unauthorized" }))
}
export async function middleware_user (request:Request, response:Response, next : NextFunction) {
    (await middleware("user",request)) ? next() : response.status(401).json(sendJson({ message: "Unauthorized" }))
}
export async function middleware_mentor (request:Request, response:Response, next : NextFunction) {
    (await middleware("mentor",request)) ? next() : response.status(401).json(sendJson({ message: "Unauthorized" }))
}
export async function middleware_allrole (request:Request, response:Response, next : NextFunction) {
    (await middleware("all",request)) ? next() : response.status(401).json(sendJson({ message: "Unauthorized" }))
}
