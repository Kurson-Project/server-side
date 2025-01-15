import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";
import { sendjson } from "../utils/autoGenerate.js";

const prisma = new PrismaClient();

export async function middleware_base(request, response, next) {
    const { authorization } = request.headers
    if (!authorization) {
        response.status(400).json(sendjson({ status: 400, message: "invalid authorization" }))
    } else {
        try {
            const token = authorization.split(" ")[1];
            let availabe = false
            const jwtDecode = jwt.verify(token,process.env.APP_KEY)
            const data = await prisma.users.findUnique({ where: { id: jwtDecode.id } });
            if (request.user_role) { if (data.role != request.user_role) {
               return response.status(401).json(sendjson({status:401, message : "only admin user can use"}))
            }}
            request.userdata = data
            request.user_author_token = token
            request.userdata.auth_token.forEach((e) => {
                if (e == token) { availabe = true; next(); }
            })
            if (!availabe) throw new Error('not availabe in usertoken')
        } catch (err) {
            if (process.env.APP_DEBUG) console.log(err)
            response.status(401).json(sendjson({ status: 401, message: "Unauthorized" }))
        }
    }
}
