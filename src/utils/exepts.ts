
export const sendJson = ({message = "",data = {}} ) =>  ({message,data})
export function containsSpecialChars(str : String) {
    const pattern = /[\/=<>|,"'\[\]]/;
    return pattern.test(String(str));
}

export const userSecretDeselect = {
    username : true,
    user_email : true,
    user_picture : true,
    role : true,
    user_class_sertificate : true,
    createAt : true,
    updateAt : true
}