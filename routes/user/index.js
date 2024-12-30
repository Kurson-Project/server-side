import express from "express"
import { userControler } from "../../controller/userControler.js"
const userControlers = new userControler()

const userRouter = express.Router()

userRouter.get('/',userControlers.home)

export default userRouter