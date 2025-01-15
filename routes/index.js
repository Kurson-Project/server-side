import express from "express"
import userRouter from "./user/index.js";
import authRouter from "./auth/index.js";
import { sendjson } from "../utils/autoGenerate.js";
import adminRouter from "./admin/index.js";
const routes = express.Router();

routes.get("/",(req,res)=>{
    res.json(sendjson({message:"server already started"}))
})
routes.use(userRouter)
routes.use(authRouter);
routes.use(adminRouter)

export default routes