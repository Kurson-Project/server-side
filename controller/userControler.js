import jwt from "jsonwebtoken";
import { sendjson } from "../utils/autoGenerate.js";

export class userControler {
    async store(request , response) {
        delete request.userdata["user_password"];
        delete request.userdata['auth_token'];
       response.json(sendjson({data:request.userdata}))
    }
}