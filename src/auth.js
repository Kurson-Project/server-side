import { text } from "express";
import { get, insert, token_insert, token_remove } from "../utils/query.js";
import { hash, compare } from "bcrypt";

export async function register(request) {
    const username = request.body.username;
    const user_email = request.body.user_email;
    const user_password = await hash(request.body.user_password, 10);
    try {
        const available_email = await get("user_email", "user", { user_email })
        const available_username = await get("username", "user", { username })
        if (available_email.length == 0 && available_username.length == 0) {
            const action = await insert("user", { username, user_email, user_password })
            return 0;
        }
        return "username & password cant use"
    } catch (err) {
        return `server error`
    }
}

export async function login(request) {
    const user_email = request.body.user_email;
    const user_password = request.body.user_password;

    try { // tamabahan role
        const data = await get("user_email,user_password,username,role", "user", { user_email })
        if (data.length != 0) {
            if (await compare(user_password, data[0]?.user_password)) {
                const token = `${btoa(user_email)}:${await hash(user_password, 10)}`
                await token_insert(data[0].username, data[0].user_email, token)
                return { token, role: data[0].role }
            }
        }
        return "fail"
    } catch (err) {
        return "fail"
    }
}

export async function get_user(request) {
    let token = request.header("Authorization");
    console.log(token)
    try {
        token = token.split(" ")[1]
        const user_email = atob(token.split(":")[0])
        const user_data = await get("*", "user", { user_email })
        if (user_data.length != 0) {
            if (user_data[0].user_session.includes(token.split(":")[1])) return user_data[0]
            return "failed"
        }
    } catch (err) {
        console.error(err)
        return "failed"
    }
}
export async function logout(request) {
    try {
        let token = request.header("Authorization");
        token = token.split(" ")[1]
        let user = await get_user(request);
        if (user != "failed") {
            let new_session = user.user_session.replace(token, " ");
            console.log(new_session)
            return result = await token_remove(user.username, user.user_email, new_session)
        }
    } catch (err) {
        return "failed"
    }
}