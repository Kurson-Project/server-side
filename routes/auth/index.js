import { authController } from "../../controller/authController.js"
import express from "express"
const authRouter = express.Router()
const authControllers = new authController()


authRouter.post('/auth/signup',authControllers.signup)
authRouter.post('/auth/login',authControllers.login)

export default authRouter