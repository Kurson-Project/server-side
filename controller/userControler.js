import jwt from "jsonwebtoken";
import { sendjson } from "../utils/auto_generate.js";

export class userControler {
    async store(request , response) {
        delete request.userdata["user_password"];
        delete request.userdata['auth_token'];
       response.json(sendjson({data:request.userdata}))
    }
}