import jwt from "jsonwebtoken";
import { sendjson } from "../utils/auto_generate.js";

export class userControler {
    async store(request , response) {
       response.json(sendjson({data:request.userdata}))
    }
}