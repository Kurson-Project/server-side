import { authController } from "../../controller/authController.js"
import express from "express"
const authRouter = express.Router()
const authControllers = new authController()


authRouter.post('/auth/register',authControllers.signup)
authRouter.post('/auth/login',authControllers.login)
authRouter.get('/auth/google',authControllers.googleauth)
authRouter.get('/auth/google/callback',authControllers.googleCallback)
authRouter.post('/auth/logout',authControllers.middleware_auth,authControllers.logout)

export default authRouter