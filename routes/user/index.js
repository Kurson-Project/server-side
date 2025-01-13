import express from "express"
import {authController} from "../../controller/authController.js"
import { userControler } from "../../controller/userControler.js"
const userControlers = new userControler()
const authControllers = new authController()

const userRouter = express.Router()

userRouter.post('/api/user',authControllers.middleware_auth,userControlers.store)

export default userRouter