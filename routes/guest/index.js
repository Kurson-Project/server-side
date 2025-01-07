import { guestController } from "../../controller/guestController.js"
import express from "express"
const guestRouter = express.Router()
const guestControllers = new guestController()


guestRouter.post('/auth/signup',guestControllers.signup)

export default guestRouter