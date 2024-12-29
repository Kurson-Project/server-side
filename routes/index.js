import express from "express"
import userRouter from "./user/index.js";
import guestRouter from "./guest/index.js";
const routes = express.Router();


routes.use(userRouter)
routes.use(guestRouter);

export default routes