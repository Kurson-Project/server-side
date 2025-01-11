import express from "express"
import userRouter from "./user/index.js";
import authRouter from "./auth/index.js";
import { sendjson } from "../utils/auto_generate.js";
const routes = express.Router();

routes.get("/",(req,res)=>{
    res.json(sendjson({message:"server already started"}))
})
routes.use(userRouter)
routes.use(authRouter);

export default routes