import express from "express"
import "dotenv/config"
import { Router as AuthController} from "./auth/auth.controller";
import { adminRouter } from "./admin/admin.controller";
import { middleware_admin } from "./middleware";


import jsonSwager from "../docs/swagger.json";
import { swagger_static } from "../docs/swagger.static";

const app  = express();
const app_port = process.env.APP_PORT || 3000
app.use(express.json())

app.get("/docs/api/option.json",(_,res)=> {res.send(jsonSwager)})
app.get("/docs",(_,res)=>{res.send(swagger_static("/docs/api/option.json"))})

app.use("/auth",AuthController)
app.use("/admin",middleware_admin,adminRouter)

app.listen(app_port,()=>{
    console.log("Apps run port :",app_port)
})