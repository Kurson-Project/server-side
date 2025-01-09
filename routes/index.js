import express from "express"
import userRouter from "./user/index.js";
import authRouter from "./auth/index.js";
const routes = express.Router();


routes.use(userRouter)
routes.use(authRouter);

export default routes