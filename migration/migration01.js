import { client } from "../config/mongodb.js";

async function  migrate() {
    try{
        await client.connect();
        const collection = client.db('onlineclass').collection("user");
        const result = await collection.insertOne({name : "yohanes",pw : "123123"})
        console.log("success")
    }catch(err){
        console.log(err)
    }

}


migrate()