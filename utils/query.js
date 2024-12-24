import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

export function connection() {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE, 
    });
    return db;
}


function generate_where(where = false){
    if (where) { return "WHERE " + Object.entries(where).map(([key, value]) => {return typeof value === "string" ? `${key}='${value}'` : `${key}=${value}`;}).join(" AND ")} else { return ""}
} 

const db = connection();
export async function insert(table,data){ 

    // menerima nama<str> table dan data <object>
    // Jika selesai akan mengembalikan promise

    let result = true;
    const sql = `INSERT INTO ${table} (${Object.keys(data)}) VALUES (${Object.values(data).map((val) => {if (typeof(val) == "string") {return `'${val}'`} return val}).join(",")})`
    const action = await db.promise().query(sql);
    return action
}


export async function get(data,table,where = false){

    // data<str> "*" or "(data1,data2,data3)" dan where<object> itu opsional

    const on = generate_where(where)
    const sql = `SELECT ${data} FROM ${table} ${on}`
    if (process.env.APP_DEBUG) console.log("query : ",sql)
    const [rows] = await db.promise().query(sql)
    return rows
}

export async function token_insert(username,user_email,token) {
    try{
        const sql = `UPDATE user SET user_session = CONCAT(user_session , ${"\n'" + token + "'"}) ${generate_where({username,user_email})}`
        if (process.env.APP_DEBUG) console.log("query : ",sql)
        await db.promise().query(sql); return true
    }catch (err){
        console.log(err)
        return false
    } 
}

export async function token_remove(username,user_email,new_token) {
    try{
        const sql = `UPDATE user SET user_session = ${"'" + new_token + "'"} ${generate_where({username,user_email})}`
        if (process.env.APP_DEBUG) console.log(sql)
        await db.promise().query(sql); return true
    } catch(err) {
        console.error(err)
        return false
    }
    
}