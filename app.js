import express from "express"
import routes from "./routes/index.js"
import cors from "cors"
import { config } from "dotenv"
config()


const APP_PORT = process.env.APP_PORT || 3000
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',routes)

app.listen(APP_PORT,()=>{
    console.log("Listen at",APP_PORT);
})