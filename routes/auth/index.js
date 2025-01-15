import { authController } from "../../controller/authController.js"
import express from "express"
const authRouter = express.Router()
const authControllers = new authController()


authRouter.post('/api/auth/register',authControllers.signup)
authRouter.post('/api/auth/login',authControllers.login)
authRouter.get('/api/auth/google',authControllers.googleauth)
authRouter.get('/api/auth/google/callback',authControllers.googleCallback)
authRouter.post('/api/auth/logout',authControllers.middleware_user,authControllers.logout)

export default authRouter