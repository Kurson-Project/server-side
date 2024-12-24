import dotenv from 'dotenv';
dotenv.config()

export const  json_format_send = ({status = 200,message = "",data = {}}) =>  ({status,message,data})