import { config } from "dotenv"
import express from "express"
import routes from "./routes/index.js"

config()
const APP_PORT = process.env.APP_PORT || 3000
const app = express()

app.use('/',routes)

app.listen(APP_PORT,()=>{
    console.log("Listen at",APP_PORT);
})