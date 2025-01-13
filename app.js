import express from "express"
import routes from "./routes/index.js"
import cors from "cors"
import { config } from "dotenv"
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"
import { swagger_options } from "./utils/swagger_options.js"
config()




const APP_PORT = process.env.APP_PORT || 3000
const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs",swaggerUi.serve,swaggerUi.setup(swagger_options()))
app.use('/',routes)

app.listen(APP_PORT,()=>{
    console.log("Listen at",APP_PORT);
})