
export const sendJson = ({message = "",data = {}} ) =>  ({message,data})
export function containsSpecialChars(str : String) {
    const pattern = /[\/=<>|,"'\[\]]/;
    return pattern.test(String(str));
}

export const userSecretDeselect = {
    username : true,
    user_email : true,
    profile_picture_url : true,
    role : true,
    createAt : true,
    updateAt : true
}