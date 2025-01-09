import express from "express"
import {authController} from "../../controller/authController.js"
import { userControler } from "../../controller/userControler.js"
const userControlers = new userControler()
const authControllers = new authController()

const userRouter = express.Router()

userRouter.get('/user',authControllers.middleware_auth,userControlers.store)
userRouter.get('/user/logout',authControllers.middleware_auth,authControllers.logout)

export default userRouter