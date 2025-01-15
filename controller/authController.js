import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import { containsSpecialChars, sendjson } from "../utils/autoGenerate.js"
import bycrypt from "bcrypt"
import { google } from "googleapis"
import { middleware_base } from "./authMiddleware.js"

const prisma = new PrismaClient();
const secret = process.env.APP_KEY || "abc"

const callback = process.env.APP_URL + "/api/auth/google/callback"
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    callback
)

const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
]




export class authController {

    // AUTH CONTROL USER REQUEST
    async signup(request, response) {
        if (process.env.APP_DEBUG) console.log("request : 'auth.signup'");
        const username = request.body.username
        const user_email = request.body.user_email
        let user_password = request.body.user_password
        if (containsSpecialChars(username)) { response.status(401).json(sendjson({ status: 401, message: "cant use special caracter" })) }
        else if (!user_email || !user_password || !username) {
            response.status(401).json(sendjson({ status: 401, message: "invalid request" }));
        } else {
            try {
                user_password = await bycrypt.hash(user_password, 4);
                await prisma.users.create({
                    data: { username, user_email, user_password , role : request.create_role || "user" }
                })
                response.json(sendjson({ message: "user signup success" }))
            } catch (err) {
                if (err.code == "P2002") {
                    response.status(401).json(sendjson({ status: 401, message: "email alredy token" }))
                } else {
                    response.status(500).json(sendjson({ status: 500, message: "server cant handle" }))
                }
            }
        }
    }

    async login(request, response) {
        if (process.env.APP_DEBUG) console.log("request : 'auth.login'");

        const user_email = request.body.user_email;
        const user_password = request.body.user_password;

        if (!user_email || !user_password) {
            response.status(401).json(sendjson({ status: 401, message: "username or password cant blank" }))
            return
        }
        try {
            const data = await prisma.users.findFirst({ where: { user_email } })
            const check_password = await bycrypt.compare(user_password, data.user_password)
            if (!check_password) throw new Error("invalid password")
            let auth_token_user = data.auth_token
            delete data.auth_token
            delete data.user_password
            data.token_id = Date.now()
        
            const token = jwt.sign(data, secret)
            auth_token_user.push(token)
            await prisma.users.update({
                where: { user_email }, data: {
                    auth_token: auth_token_user
                }
            })

            response.json(sendjson({ data: { token, role: data.role } }))
        } catch (err) {
            console.log(err)
            response.status(401).json(sendjson({ status: 401, message: "login failed | bad on your request" }))
        }
    }

    async logout(request, response) {

        try {
            const new_token = request.userdata.auth_token.filter((items) => { return items != request.user_author_token })
            await prisma.users.update({ where: { id: request.userdata.id }, data: { auth_token: new_token } })
            response.json(sendjson({ message: "success to logout" }))
        } catch (err) {
            if (process.env.APP_DEBUG) console.log(err)
            response.status(400).json(sendjson({ status: 400, message: "Logout fail" }))
        }

    }


    middleware_user(req, res, next) {
        middleware_base(req, res, next)
    }
    middleware_admin(req, res, next) {
        req.user_role = "admin"
        if (!req.create_role){
            req.create_role = "mentor"
        }
        middleware_base(req, res, next);
    }
    middleware_mentor(req, res, next) {
        req.user_role = "mentor"
        middleware_base(req, res, next)
    }

    googleauth(req, res) {
        const redirect_url = req.query["redirect"];
        if (!redirect_url) {
            return res.status(400).send(sendjson({ status: 400, message: "redirect params need" }))
        }
        const authorizationUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            include_granted_scopes: true,
            state: redirect_url
        })
        res.redirect(authorizationUrl)
    }

    async googleCallback(req, response) {

        try {
            const { code, state } = req.query

            async function generateAutoToken(user_email) {

                const data = await prisma.users.findFirst({ where: { user_email } })
                let auth_token_user = data.auth_token
                delete data.auth_token
                delete data.user_password
                data.token_id = Date.now()
                const token = jwt.sign(data, secret)
                auth_token_user.push(token)
                await prisma.users.update({
                    where: { user_email }, data: {
                        auth_token: auth_token_user
                    }
                })
                if (state == "disable") {
                    return response.json(sendjson({ status: 200, message: "disable redirect options", data: { token, role: data.role } }))
                } else {
                    response.redirect(state + "?token=" + token + "&role=" + data.role)
                }
            }

            const { tokens } = await oauth2Client.getToken(code)
            oauth2Client.setCredentials(tokens)

            const oauth2 = google.oauth2({
                auth: oauth2Client,
                version: "v2",
            })

            const { data } = await oauth2.userinfo.get();
            const emailData = await prisma.users.findUnique({ where: { user_email: data.email } });
            if (!emailData) {
                await prisma.users.create({
                    data: { username: data.name, user_email: data.email, user_password: "-", user_picture: data.picture }
                })
            }

            generateAutoToken(data.email);
        } catch (err) {
            return response.status(400).json(sendjson({ status: 400, message: "fail to login oauth2" }))
        }
    }
    // ! END
}