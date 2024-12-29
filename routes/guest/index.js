import express from "express"
const guestRouter = express.Router()

guestRouter.get('/login',(req,res)=>{
    res.json({message : "login"})
})

export default guestRouter