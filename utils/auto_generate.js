export const sendjson = ({status = 200,message = "",data = {}}) =>  ({status,message,data})

export function containsSpecialChars(str) {
    const pattern = /[\/=<>|,"'\[\]]/;
    return pattern.test(str);
}