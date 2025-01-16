import jwt from "jsonwebtoken";
import { sendjson, user_secret_remove } from "../utils/autoGenerate.js";

export class userControler {
    async store(request , response) {
       const data = user_secret_remove(request.userdata)
       response.json(sendjson({data}))
    }
}