export const sendjson = ({status = 200,message = "",data = {}}) =>  ({status,message,data})

export function containsSpecialChars(str) {
    const pattern = /[\/=<>|,"'\[\]]/;
    return pattern.test(str);
}

export function user_secret_remove(user_data) {
    delete user_data.user_password
    delete user_data.auth_token
    return user_data
}

export const no_secret_user_take = {
    id : true,
    username : true,
    user_email : true,
    user_picture : true,
    role : true,
    admin : true,
    createAt : true,
    updateAt : true
}