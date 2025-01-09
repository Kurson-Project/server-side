import jwt from "jsonwebtoken";

export class userControler {
    async store(request , response) {
        const {authorization} = request.headers
        const token = authorization.split(" ")[1];
        const data = jwt.decode(token);
        response.json(data)
    }
}