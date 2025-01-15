import express from "express"
import routes from "./routes/index.js"
import cors from "cors"
import { config } from "dotenv"
import { swagger_options } from "./utils/swaggerOptions.js"
import { swagger_static } from "./utils/swaggerStatic.js"
config()

const APP_PORT = process.env.APP_PORT || 3000
const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',routes)

// Difition Swagger Documentation

app.get('/docs/kurson-api.apps',(req,res)=>{
    res.json(swagger_options())
})
app.get("/docs",(req,res)=> {
    res.send(swagger_static("/docs/kurson-api.apps"))
})


app.listen(APP_PORT,()=>{
    console.log("Listen at",APP_PORT);
})
