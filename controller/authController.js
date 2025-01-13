import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import { containsSpecialChars, sendjson } from "../utils/auto_generate.js"
import bycrypt from "bcrypt"
import { google } from "googleapis"



const prisma = new PrismaClient();
const secret = process.env.APP_KEY || "abc"

const callback = process.env.APP_URL + "/auth/google/callback"
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
                    data: { username, user_email, user_password }
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
            response.status(401).json(sendjson({ status: 401, message: "invalid request" }))
            return
        }
        try {
            const data = await prisma.users.findFirst({ where: { user_email }, select: { id: true, user_email: true, username: true, auth_token: true, user_password: true } })
            const check_password = await bycrypt.compare(user_password, data.user_password)
            if (!check_password) throw new Error("invalid password nya")
            const tokenData = {
                id: data.id,
                username: data.username,
                user_email: data.user_email,
                token_id: Date.now()
            }

            const token = jwt.sign(tokenData, secret, { expiresIn: "3 days" })
            data.auth_token.push(token)
            await prisma.users.update({
                where: { user_email }, data: {
                    auth_token: data.auth_token
                }
            })
            response.json(sendjson({ data: { token } }))
        } catch (err) {
            console.log(err)
            response.status(401).json(sendjson({ status: 401, message: "login fail" }))
        }
    }

    async logout(request, response) {

        try {
            const new_token = request.userdata.auth_token.filter((items) => { return items != token })
            await prisma.users.update({ where: { id: jwtDecode.id }, data: { auth_token: new_token } })
            response.json(sendjson({ message: "success to logout" }))
        } catch (err) {
            if (process.env.APP_DEBUG) console.log(err)
            response.status(400).json(sendjson({ status: 400, message: "Logout fail" }))
        }

    }

    async middleware_auth(request, response, next) {
        const { authorization } = request.headers
        if (!authorization) {
            response.status(400).json(sendjson({ status: 400, message: "invalid authorization" }))
        } else {
            try {
                const token = authorization.split(" ")[1];
                let availabe = false
                const jwtDecode = jwt.verify(token, secret);
                const data = await prisma.users.findUnique({ where: { id: jwtDecode.id } });
                request.userdata = data
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

    googleauth(req, res) {
        const redirect_url = req.query["redirect"];
        if (!redirect_url) {
            return res.status(400).send("redirect url not found")
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

                const data = await prisma.users.findFirst({ where: { user_email }, select: { id: true, user_email: true, username: true, auth_token: true, user_password: true } })
                const tokenData = {
                    id: data.id,
                    username: data.username,
                    user_email: data.user_email,
                    token_id: Date.now()
                }

                const token = jwt.sign(tokenData, secret, { expiresIn: "3 days" })
                data.auth_token.push(token)
                await prisma.users.update({
                    where: { user_email }, data: {
                        auth_token: data.auth_token
                    }
                })
                response.redirect(state + "?token=" + token)
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
                    data: { username: data.name, user_email: data.email, user_password: "loginbygoogle" }
                })
            }

            generateAutoToken(data.email);
        } catch (err) {
            return response.status(400).json(sendjson({ status: 400, message: "fail to login oauth2" }))
        }
    }
    // ! END
}