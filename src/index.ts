import express, { NextFunction, response } from "express"
import "dotenv/config"
import { Router as AuthController} from "./auth/auth.controller";
import { adminRouter } from "./admin/admin.controller";
import { middleware_admin, middleware_allrole, middleware_mentor } from "./middleware";
import { Router as UserController } from "./user/user.controller";
import { Router as MentorController } from "./mentor/mentor.controller";
import cors from "cors"

import jsonSwager from "../docs/swagger.json";
import { swagger_static } from "../docs/swagger.static";
import { homepage } from "./utils/hompage.status";

const app  = express();
const app_port = process.env.APP_PORT || 3000
jsonSwager.servers[0].url = process.env.APP_URL!

app.use(cors({
    origin : "*",
    methods : ["GET","POST","PATCH","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

app.use(express.json())

console.log(jsonSwager.servers[0].url)
app.get("/",homepage)
app.get("/docs/api/option.json",(_,res)=> {res.send(jsonSwager)})
app.get("/docs",(_,res)=>{res.send(swagger_static("/docs/api/option.json"))})

app.use("/auth",AuthController)
app.use("/user",middleware_allrole,UserController)
app.use("/admin",middleware_admin,adminRouter)
app.use("/mentor",middleware_mentor,MentorController)


app.listen(app_port,()=>{
    console.log("Apps run port :",app_port)
})

export default app