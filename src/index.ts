import express from "express"
import "dotenv/config"
import {Router} from "./auth/auth.controller";
import { swagger_options } from "../docs/swagger";
import { swagger_static } from "../docs/swagger.static";

const app  = express();
const app_port = process.env.APP_PORT || 3000
app.use(express.json())

app.get("/docs/api/option.json",(_,res)=> {res.json(swagger_options())})
app.get("/docs",(_,res)=>{res.send(swagger_static("/docs/api/option.json"))})

app.use("/auth",Router)

app.listen(app_port,()=>{
    console.log("Apps run port :",app_port)
})