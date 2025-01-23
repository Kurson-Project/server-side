import { swagger } from "./routes/auth/swagger";
import { swagger_options } from './swagger';

function generateJson() {
    const fs = require('fs');
    const swagger = swagger_options()
    fs.writeFileSync('./docs/swagger.json', JSON.stringify(swagger, null, 4));
    console.info("swagger.json generated")
}

generateJson()