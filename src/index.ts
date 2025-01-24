import express, { response } from "express"
import "dotenv/config"
import { Router as AuthController} from "./auth/auth.controller";
import { adminRouter } from "./admin/admin.controller";
import { middleware_admin, middleware_allrole } from "./middleware";
import { Router as UserController } from "./user/user.controller";

import jsonSwager from "../docs/swagger.json";
import { swagger_static } from "../docs/swagger.static";
import { request } from "http";
import { homepage } from "./utils/hompage.status";

const app  = express();
const app_port = process.env.APP_PORT || 3000
app.use(express.json())
app.get("/",homepage)
app.get("/docs/api/option.json",(_,res)=> {res.send(jsonSwager)})
app.get("/docs",(_,res)=>{res.send(swagger_static("/docs/api/option.json"))})

app.use("/auth",AuthController)
app.use("/user",middleware_allrole,UserController)
app.use("/admin",middleware_admin,adminRouter)

app.listen(app_port,()=>{
    console.log("Apps run port :",app_port)
})

export default app