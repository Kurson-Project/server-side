import bcrypt from "bcrypt"
import { getUserDataByEmail, updateUserToken, userCreate, userCreatebyGoogle } from "./auth.repository";
import jwt from "jsonwebtoken"
import { google } from "googleapis";

export interface registerRequest {
    username: string;
    user_email: string;
    user_password: string;
}

const APP_KEY = process.env.APP_KEY!

export const registerUser = async (data: registerRequest) => {
    data.user_password! = await bcrypt.hash(data.user_password, 4);
    await userCreate(data, "user");
    return;
}


export const userLogin = async (data: { user_email: string; user_password: string }) => {
    const userdata = await getUserDataByEmail(data.user_email);
    if (!userdata) {
        return "user not registered"
    } else {
        let check_password = await bcrypt.compare(data.user_password, userdata.user_password)
        if (!check_password) {
            return "login failed with username & password"
        } else {
            const payload = {
                username: userdata.username,
                user_email: userdata.user_email,
                user_picture: userdata.profile_picture_url,
                role: userdata.role,
                createAt: userdata.createAt,
                updateAt: userdata.updateAt,
                token_create: Date.now()
            }
            const token = jwt.sign(payload, APP_KEY);
            userdata.auth_token.push(token);
            await updateUserToken(userdata.user_email, userdata.auth_token);
            return {
                token: token,
                role: userdata.role
            }
        }
    }
}

export const userLogout = async (user_email: string, user_token: [], request_token: string) => {
    const new_user_token = user_token.filter((items) => { return items != request_token })
    await updateUserToken(user_email, new_user_token)
}


// google routes

const callback_url = process.env.APP_URL! + "/auth/google/callback"
const oauth2client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    callback_url
)

export const googleRoute = (redirect_url: string) => {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]
    return oauth2client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
        state: redirect_url
    })
}

export const googleCallback = async (code: string, state: string) => {
    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2client });
    const user_info = await oauth2.userinfo.get();
    if (typeof user_info.data.email == "string") {
        const emailData = await getUserDataByEmail(user_info.data.email);
        if (!emailData) {
            const userdata = {
                username: user_info.data.name!,
                user_email: user_info.data.email!,
                user_password: user_info.data.id!,
            }
            await userCreatebyGoogle(userdata, user_info.data.picture!);
        }
        const user_data = await getUserDataByEmail(user_info.data.email);
        const payload = {
            username: user_data!.username,
            user_email: user_data!.user_email,
            user_picture: user_data!.profile_picture_url,
            role: user_data!.role,
            createAt: user_data!.createAt,
            updateAt: user_data!.updateAt,
            token_create: Date.now()
        }

        const token = jwt.sign(payload, APP_KEY);
        user_data!.auth_token.push(token);
        await updateUserToken(user_data!.user_email, user_data!.auth_token);
        return {
            token: token,
            role: user_data!.role
        }
    }
}