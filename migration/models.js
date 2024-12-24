import { connection } from "../utils/query.js"

const db = connection()

const schema = `CREATE TABLE user(
    id int AUTO_INCREMENT PRIMARY KEY,
    username  varchar(250),
    user_email varchar(250),
    user_password varchar(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_session TEXT DEFAULT "" ,

    role varchar(250) DEFAULT "",
    userdata_image varchar(250) DEFAULT "",
    userdata_kelas varchar(250) DEFAULT ""
    
    
)`

//////////////////////////////////////

db.query(schema,(err,result)=>{
    if (err) {
        console.error("Failed : ",err.message)
        process.exit(1)
    }
    console.log("migration success")
    process.exit(0)
})
